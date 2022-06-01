import React from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { createPassword } from "../../../helpers/passwordGenerate";
import { fetchPublic } from "../../../helpers/fetch/fetchPublic";
import { fetchPrivate } from "../../../helpers/fetch/fetchPrivate";

export const Dashboard = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const onFinish = async (values) => {
		const password = createPassword(8, true, true);
		const { name, email } = values;

		let { ok, msg } = await dispatch(
			fetchPublic("/auth/new", { name, email, password }, "POST")
		);

		if (ok) {
			const emaiInfo = {
				from: '"Fred Foo 👻" <foo@example.com>', // sender address
				to: "bar@example.com, baz@example.com", // list of receivers
				subject: "Credenciales para el ingreso a Whatever App", // Subject line
				text: "Proteja esta información", // plain text body
				html: `<p>su usuario: <strong>${email} </strong>y su contraseña <strong>${password}</strong></p>`, // html body)
			};

			({ ok, msg } = await dispatch(fetchPrivate("/email", emaiInfo, "POST")));

			if (ok) {
				message.success({
					content: (
						<p style={{ padding: "12px", width: "350px" }}>
							Se registró correctamente al usuario <strong>{name}</strong> y se
							le envio una notificacion al correo <strong>{email}</strong>, con
							sus datos para ingresar
						</p>
					),
					duration: 3,
					style: {
						marginTop: "20vh",
					},
				});
			}

			form.resetFields();
		} else {
			message.error({
				content: msg,
				duration: 2,
				style: {
					marginTop: "20vh",
				},
			});
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				hight: "100%",
				width: "100%",
			}}
		>
			<div style={{ textAlign: "center", width: "33%" }}>
				<h2>Agregar usuario</h2>
			</div>
			<div style={{ width: "33%" }}>
				<Form
					name='basic'
					labelCol={{
						span: 5,
					}}
					wrapperCol={{
						span: 16,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						label='Nombre'
						name='name'
						rules={[
							{
								required: true,
								message: "Ingrese un Nombre!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='Email'
						name='email'
						rules={[
							{
								required: true,
								message: "Ingrese una dirección de correo!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
