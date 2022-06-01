import { loadingFinish, loadingStart } from "../../actions/ui";
import { catchError } from "./catchError";
import { checkStatus } from "./checkStatus";

const baseUrl = process.env.REACT_APP_API_URL;
let response;

export const fetchPrivate = (
	endpoint,
	data,
	method = "GET",
	header,
	contentType = "application/json"
) => {
	return async (dispatch) => {
		const url = `${baseUrl}${endpoint}`;
		dispatch(loadingStart());
		const token = sessionStorage.token;
		const headers =
			method === "GET"
				? { "x-token": token, ...header }
				: { "content-type": contentType, "x-token": token, ...header };

		if (method === "GET") {
			response = fetch(url, { method, headers })
				.then((resp) => {
					if (resp.ok) {
						return resp.json();
					}
					checkStatus(resp.status);
				})
				.then((data) => {
					return data;
				})
				.catch((e) => {
					return catchError(e);
				})
				.finally(() => {
					dispatch(loadingFinish());
				});
		} else {
			response = fetch(url, { method, headers, body: JSON.stringify(data) })
				.then((resp) => {
					if (resp.ok) {
						return resp.json();
					}
					checkStatus(resp.status);
				})
				.then((data) => {
					dispatch(loadingFinish());
					return data;
				})
				.catch((e) => {
					dispatch(loadingFinish());
					return catchError(e);
				});
		}

		return response;
	};
};
