/* eslint-disable */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';

let composeEnhancers;

switch (process.env.NODE_ENV) {
  case 'development':
    {
      composeEnhancers =
        (typeof window !== 'undefined' &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 5,
          })) ||
        compose;
    }
    break;
  case 'production': {
    composeEnhancers = compose;
    break;
  }
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
