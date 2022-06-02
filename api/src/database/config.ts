import mongoose from "mongoose";

export const dbConnection = async () => {
	try {
		await mongoose.connect(`${process.env.DB_CNN}`, {});

		console.log("DB Online");
	} catch (error) {
		throw new Error("Error al inicializar DB");
	}
};
