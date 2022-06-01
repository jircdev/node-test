import {
	Home,
	Dashboard,
	Login,
	Playground,
	Register,
} from "../components/pages/index";
import { parseJwt } from "../helpers/parse-jwt";

export const routes = [
	{
		key: "/home",
		path: "/home",
		type: "public",
		name: "Inicio",
		scope: "menu",
		component: Home,
	},
	{
		key: "/login",
		path: "/login",
		type: "auth",
		mode: "public",
		name: "Ingresar",
		scope: "menu",
		component: Login,
	},
	{
		key: "/register",
		path: "/register",
		type: "auth",
		mode: "public",
		name: "Registrarse",
		scope: "menu",
		component: Register,
	},
	{
		key: "/playground",
		path: "/playground",
		type: "private",
		name: "Playground",
		scope: "menu",
		component: Playground,
	},
	{
		key: "/dashboard",
		path: "/dashboard",
		type: "private",
		name: "Dashboard",
		role: ["admin"],
		scope: "menu",
		component: Dashboard,
	},
	{
		key: "/logout",
		path: "/logout",
		type: "auth",
		mode: "private",
		name: "Salir",
		scope: "menu",
	},
	{
		key: "/",
		path: "/",
		type: "public",
		scope: "menu",
		pathTo: "/home",
	},
	/*{
    key: '/',
    path: '/',
    type: 'private',
    scope: 'menu',
    pathTo: '/home',
    redirect: true,
  }, */
];

export const routes2 = (isLoggedIn) => {
	const mode = isLoggedIn ? "private" : "public";
	const { role } = parseJwt();

	return routes.filter(
		(item) =>
			((item.type === "auth" && item.mode === mode) ||
				(item.type === mode && !item.redirect)) &&
			(!item.role || item.role.includes(role))
	);
};
