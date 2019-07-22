import { FETCH_OPTIONS_PENDING, FETCH_OPTIONS_FULFILLED, FETCH_OPTIONS_REJECTED, FETCH_OPTIONS, TOGGLE_SHOW_ALL, CHROME, TOGGLE_LOCAL_STORAGE, GET_CURRENT_URL_FULFILLED, GET_CURRENT_URL } from '../constants';
import { browserStorageSync, browserName } from '../popup';

export interface FetchOptions {
  type:
  | FETCH_OPTIONS
  | FETCH_OPTIONS_PENDING
  | FETCH_OPTIONS_FULFILLED
  | FETCH_OPTIONS_REJECTED;
  payload: any;
}

export interface ToggleShowAll {
  type: TOGGLE_SHOW_ALL;
}

export interface ToggleLocalStorage {
  type: TOGGLE_LOCAL_STORAGE;
}

export interface GetCurrentUrl {
  type:
  | GET_CURRENT_URL
  | GET_CURRENT_URL_FULFILLED;
  payload: any;
}

export type OptionAction = FetchOptions | ToggleShowAll | ToggleLocalStorage | GetCurrentUrl;

export const fetchOptions = (): FetchOptions => {

  let payload: any;
  if (browserName === CHROME) {
    payload = browserStorageSync.get('options', (res: any) => res);
  } else {
    payload = browserStorageSync.get('options')
      .then((res: any) => res)
      .catch((err: any) => { console.error(err); });
  }

  return {
    type: FETCH_OPTIONS,
    payload
  };
};

export const toggleShowAll = (): ToggleShowAll => {
  return {
    type: TOGGLE_SHOW_ALL
  };
};

export const toggleLocalStorage = (): ToggleLocalStorage => {
  return {
    type: TOGGLE_LOCAL_STORAGE
  };
};

export const getCurrentUrl = (): GetCurrentUrl => {

  let payload: any;

  if (browserName === CHROME) {
    
    payload = new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          let err = chrome.runtime.lastError;
          if (err) {
              reject(err);
          } else {
              resolve(tabs);
          }
      });
    });

  } else {
    payload = browser.tabs.query({ active: true, currentWindow: true });
  }

  return {
    type: GET_CURRENT_URL,
    payload
  };
};
