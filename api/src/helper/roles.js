const roles = Object.freeze({
	user: "user",
	admin: "admin",
});

const createUser = [roles.admin]; // Crear o agregar nuevos usuarios

module.exports = {
	Roles: roles,
	createUser,
};
