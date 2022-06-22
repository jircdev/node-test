import { startLogout } from '../../actions/auth';
import { store } from '../../store/store';
import { showExpiredSessionMessage } from './showExpiredSessionMessage';

export const checkStatus = (status) => {
  if (status === 401) {
    const previousUrl = window.location.pathname;
    sessionStorage.clear();
    store.dispatch(startLogout());
    showExpiredSessionMessage(previousUrl);
  }
  return {
    ok: false,
    msg: messages(status),
    result: {},
  };
  
};

const messages = {
  401: 'unauthorized',
  404: 'Recurso No encontrado',
  500: 'No hay coneccion con la Base de Datos',
  501: 'No hay coneccion con la Base de Datos',
};
