export const parseJwt = (token: any): any => {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace("-", "+").replace("_", "/");
	const buffer = Buffer.from(base64, "base64");
	return JSON.parse(buffer.toString("utf-8"));
};
