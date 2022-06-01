import { fetchPrivate } from "../helpers/fetch/fetchPrivate";

export const getImages = () => {
	return async (dispatch) => {
		try {
			const { ok, msg, result } = await dispatch(
				fetchPrivate("/uploads/images")
			);

			if (ok) {
				return result;
			} else {
				console.log(msg);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteImage = (userId, image) => {
	return async (dispatch) => {
		try {
			const { ok, msg } = await dispatch(
				fetchPrivate(`/uploads/user/${userId}/img/${image}`, {}, "DELETE")
			);

			if (ok) {
				return { ok, msg };
			} else {
				console.log("msg delete:", msg);
			}
		} catch (error) {
			console.log(error);
		}
	};
};
