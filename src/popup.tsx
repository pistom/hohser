import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise-middleware';
import browserStorageMock from './mock/BrowserStorageMock';
import { reducers } from './reducers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, deepOrange } from '@mui/material/colors';
import { CacheProvider } from "@emotion/react";
import { TssCacheProvider } from "tss-react";
import createCache from "@emotion/cache";
import { CHROME, FIREFOX } from './constants';
import 'chrome-storage-promise';
import { Options } from './types';


const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blueGrey[700],
          light: '#718792',
          dark: '#1c313a',
          contrastText: '#ffffff',
        },
        secondary: {
          main: deepOrange['A700'],
          light: '#ff6434',
          dark: '#a30000',
          contrastText: '#ffffff'
        },
        text: {
          primary: '#444',
          secondary: '#888',
        }
      },
    },
    dark: false,
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
export let browserStorage: any;
export let browserStorageSync = browserName === FIREFOX ? browser.storage.sync : (chrome.storage as any).promise.sync;

browserStorageSync.get('options').then((o: any) => {
  const options = o && o.options as Options;
  const useLocalStorage = options && !!options.useLocalStorage;

  switch (browserName) {
    case FIREFOX:
      browserStorage = useLocalStorage ? browser.storage.local : browser.storage.sync;
      break;
    case CHROME:
      browserStorage = useLocalStorage ? (chrome.storage as any).promise.local : (chrome.storage as any).promise.sync;
      break;
    default:
      browserStorage = new browserStorageMock();
      browserStorageSync = new browserStorageMock();
  }

  const store = createStore(reducers, applyMiddleware(promise));
  const muiCache = createCache({
      "key": "mui",
      "prepend": true
  });

  const tssCache = createCache({
      "key": "tss"
  });

  ReactDOM.render(
    <Provider store={store}>
      <CacheProvider value={muiCache}>
          <TssCacheProvider value={tssCache}> 
            <ThemeProvider theme={theme} defaultMode="system">
              <App />
            </ThemeProvider>
          </TssCacheProvider>
      </CacheProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
});
