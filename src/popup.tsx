import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { domains, options } from './reducers';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware'

const reducers = combineReducers({
  domains,
  options
})

const store = createStore(reducers, applyMiddleware(promise()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
