import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore, applyMiddleware } from 'redux';
import { domains, defaultState } from './reducers/domains';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware'

const store = createStore(domains, defaultState, applyMiddleware(promise()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
