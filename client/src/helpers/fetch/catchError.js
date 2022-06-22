export const catchError = (error) => {
	return {
		ok: false,
		msg: "La solicitud fue rechazada. Parece que no hay conección de Internet",
		result: error,
	};
};
