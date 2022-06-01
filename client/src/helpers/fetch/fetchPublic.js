import { loadingFinish, loadingStart } from '../../actions/ui';
import { catchError } from './catchError';
import { checkStatus } from './checkStatus';

const baseUrl = process.env.REACT_APP_API_URL;
let response;
const headers = {
  'content-type': 'application/json',
  'x-role': 'basic',
};

export const fetchPublic = (endpoint, data, method = 'GET') => {
  return async (dispatch) => {
    const url = `${baseUrl}${endpoint}`;
    dispatch(loadingStart());

    if (method === 'GET') {
      response = fetch(url)
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
