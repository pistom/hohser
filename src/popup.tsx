import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore } from 'redux';
import { domain } from './reducers/index';
import { StoreState } from './types/index';
import { DomainAction } from './actions';
import { Provider } from 'react-redux';

const store = createStore<StoreState, DomainAction, any, any>(domain, {
  domainsList: [],
  settings: true,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
