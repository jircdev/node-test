import { Request as Req, Response as Resp, NextFunction } from "express";
import { validationResult } from "express-validator";

export const fieldsValidator = (req: Req, res: Resp, next: NextFunction) => {
	const valResult = validationResult.withDefaults({
		formatter: (error) => {
			return {
				params: error.param,
				msg: error.msg,
			};
		},
	});

	const errors = valResult(req).array();

	if (!(Object.entries(errors).length === 0)) {
		let preMsg = "";
		if (Object.entries(errors).length > 1) {
			preMsg = "Ocurrieron los siguientes errores: ";
		}

		const msgErrors = errors.map((error) => {
			return `${error.params} ${error.msg}`;
		});
		const msg = `${preMsg}${msgErrors.join(" y ")}`;

		return res.json({
			ok: false,
			msg,
		});
	}

	next();
};
