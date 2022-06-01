import { Router } from "express";
import { check } from "express-validator";
import { fieldsValidator } from "../middlewares/fields-validator";
import { jwtValidator } from "../middlewares/jwt-validator";
import {
	getUsers,
	createUser,
	userLogin,
	revalidateToken,
} from "../controllers/auth";

export const userRouter = Router();
/*
    Rutas de Usuarios / Auth
    host + api/auth
*/

userRouter.get("/", [], getUsers);

userRouter.post(
	"/new",
	[
		//middleware
		check("name").exists().withMessage("es obligatorio"),

		check("email")
			.isEmail()
			.withMessage("no es válido")
			.exists()
			.withMessage("es Obligatorio"),

		check("password")
			// .matches('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$')
			// .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
			.isLength({ min: 6 })
			.withMessage("debe tener al menos 6 carácteres"),

		fieldsValidator,
	],
	createUser
);

userRouter.post(
	"/",
	[
		//middleware
		check("email")
			.exists()
			.withMessage("es Obligatorio")
			.isEmail()
			.withMessage("no es válido"),

		check("password")
			// .matches('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$')
			// .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
			.isLength({ min: 6 })
			.withMessage("debe tener al menos 6 carácteres"),

		fieldsValidator,
	],
	userLogin
);

userRouter.get("/renew", jwtValidator, revalidateToken);
