import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { AppLayout } from './layouts/AppLayout';
import { store } from './store/store';
//import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AppLayout />
      </CookiesProvider>
    </Provider>
  );
}

export default App;
