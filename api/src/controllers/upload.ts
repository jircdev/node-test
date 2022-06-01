import { Request as Req, Response as Resp } from "express";
import glob from "glob";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { emailer } from "../helper/emailer";
import { parseJwt } from "../helper/parseJwt";
import { User } from "../models/User";
const fs = require("fs").promises;

interface imgData {
	id: string;
	name: string;
	userId: string;
	image: string;
}

export const uploadImage = async (req: Req, res: Resp) => {
	res.status(200).json({
		ok: true,
		msg: "Successfully uploaded files",
	});
};

export const getImage = async (req: Req, res: Resp) => {
	const { img, userId } = req.params;
	console.log({ img, userId });
	const url = path.join(__dirname, `../../uploads/images/${userId}/${img}`);
	res.sendFile(url);
};

export const getImages = async (req: Req, res: Resp) => {
	const token = req.headers["x-token"];
	const { uid } = parseJwt(token);
	const data: string[][] = await searchImages(`uploads/images/${uid}/**/*`);

	imagesPopulate(data)
		.then((result) => {
			res.status(200).json({
				ok: true,
				msg: "Successfully catched files",
				result,
			});
		})
		.catch((error) => {
			console.log("an error occurred during the operation:", error);
		});
};

const imagesPopulate = (data: string[][]) => {
	return new Promise((resolve, reject) => {
		const result: imgData[] = [];
		try {
			data.map(async (item, i, array) => {
				if (item.length > 0) {
					const [userId, image] = item;
					const user = await User.findById(userId);
					const name = String(user?.name);

					result.push({ id: uuidv4(), name, userId, image });
					console.log({ i, len: array.length - 1 });
					if (i === array.length - 1) {
						resolve(result);
					}
				}
			});
		} catch (error) {
			reject(error);
		}
	});
};

const searchImages = (pattern: string): Promise<string[][]> => {
	return new Promise((resolve, reject) => {
		glob(pattern, (error, files) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(
				files.map((file) => {
					return file
						.substring(pattern.length - 4)
						.split("/")
						.filter((v, i, a) => a.length > 1);
				})
			);
		});
	});
};

export const deleteImage = async (req: Req, res: Resp) => {
	const { img, userId } = req.params;
	emailer({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: "bar@example.com, baz@example.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Enviado cuando se borra</b>", // html body
	}).catch(console.error);

	fs.unlink(path.join(__dirname, `../../uploads/images/${userId}/${img}`))
		.then(() => {
			console.log(`File deleted: ${img}`);
			res.status(200).json({
				ok: true,
				msg: "Successfully image delete",
				result: {},
			});
		})
		.catch((error: any) => {
			console.log(error);
		});
};
