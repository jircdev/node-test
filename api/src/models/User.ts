import { Schema, model } from "mongoose";

interface IUser {
	name: string;
	email: string;
	password: string;
	role: string;
}

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, "El Nombre es obligatorio"],
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
		required: true,
	},
});

export const User = model<IUser>("User", userSchema);
