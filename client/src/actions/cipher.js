import { fetchPublic } from '../helpers/fetch/fetchPublic';

export const encrypt = (value) => {
  return async (dispatch) => {
    const cipher = await dispatch(fetchPublic('/cipher/encrypt', { value }, 'POST'));
    const { ok } = cipher;

    if (ok) {
      const { result } = await cipher;
      return result;
    }
    return value;
  };
};

export const decrypt = (value) => {
  return async (dispatch) => {
    const cipher = await dispatch(fetchPublic('/cipher/decrypt', { value }, 'POST'));
    const { ok } = cipher;

    if (ok) {
      const { result } = await cipher;
      return result;
    }
    return value;
  };
};
