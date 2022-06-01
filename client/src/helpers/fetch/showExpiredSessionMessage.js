import { Modal } from "antd";
import history from "../history";

export const showExpiredSessionMessage = (url) => {
	Modal.info({
		title: "Sesión de usuario",
		content: ["Su sesión activa ha expirado. Por favor inicie una nueva"],
		okText: "Aceptar",
		okType: "primary",
		confirmLoading: true,
		autoFocusButton: null,
		onOk() {
			history.replace(url);
			history.push("/home");
			history.push("/login");
		},
	});
};
