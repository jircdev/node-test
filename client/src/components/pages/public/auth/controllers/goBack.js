import history from '../.././../../../helpers/history';

export const goBack = () => {
  history.length >= 1 ? history.goBack() : history.push('/');
};
