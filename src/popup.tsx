import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware';
import BrowserStorageSyncMock from './mock/BrowserStorageSyncMock';
import { reducers } from './reducers';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455a64',
      light: '#718792',
      dark: '#1c313a',
      contrastText: '#ffffff'
    },
    secondary:  {
      main: '#dd2c00',
      light: '#ff6434',
      dark: '#a30000',
      contrastText: '#ffffff'
    },
  },
});

/*
 * This constant stores a reference to browser.storage.sync object.
 * In normal browser window browser object is not accesible.
 * In this case the constant stores a reference to a browser storage mock object.
 */
export const browserStorageSync: any = typeof browser === 'undefined' ? new BrowserStorageSyncMock() : browser.storage.sync;

const store = createStore(reducers, applyMiddleware(promise()));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
