import { Request as Req, Response as Resp, NextFunction } from "express";
import mongoose from "mongoose";

export const dbConnectionSatus = (req: Req, res: Resp, next: NextFunction) => {
	const status = mongoose.connection.readyState;

	if (status === 0) {
		res.status(501).json({
			ok: false,
			msg: "No hay conexión con la base de datos",
			result: {},
		});
	}
	next();
};
