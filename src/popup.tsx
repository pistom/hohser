import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware';
import BrowserStorageSyncMock from './mock/BrowserStorageSyncMock';
import { reducers } from './reducers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CHROME, FIREFOX } from './constants';
import 'chrome-storage-promise';

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
 * Detect browser name
 */
export const browserName = typeof browser === 'undefined' ? typeof chrome === 'undefined' ?
  null : CHROME : FIREFOX;

/*
 * This constant stores a reference to browser.storage.sync or chrome.storage.sync object.
 * In normal browser window browser/chrome objects are not accesible.
 * In this case the constant stores a reference to a browser storage mock object.
 */
export let browserStorageSync: any;
switch(browserName) {
  case FIREFOX:
    browserStorageSync = browser.storage.sync;
    break;
  case CHROME:
    browserStorageSync = (chrome.storage as any).promise.sync;
    break;
  default:
    browserStorageSync = new BrowserStorageSyncMock();
}

const store = createStore(reducers, applyMiddleware(promise()));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
