import { FETCH_OPTIONS_PENDING, FETCH_OPTIONS_FULFILLED, FETCH_OPTIONS_REJECTED, FETCH_OPTIONS, TOGGLE_SHOW_ALL, TOGGLE_SHOW_COUNTER, CHROME, TOGGLE_LOCAL_STORAGE, GET_CURRENT_URL_FULFILLED, GET_CURRENT_URL, UPDATE_HIGHLIGHT_CUSTOM_COLORS, TOGGLE_FORCE_COLORS } from '../constants';
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

export interface ToggleForceColors {
  type: TOGGLE_FORCE_COLORS;
}

export interface ToggleShowCounter {
  type: TOGGLE_SHOW_COUNTER;
}

export interface ToggleLocalStorage {
  type: TOGGLE_LOCAL_STORAGE;
}

export interface UpdateHighlightCustomColors {
  type: UPDATE_HIGHLIGHT_CUSTOM_COLORS;
  payload: string[];
}

export interface GetCurrentUrl {
  type:
  | GET_CURRENT_URL
  | GET_CURRENT_URL_FULFILLED;
  payload: any;
}

export type OptionAction = FetchOptions | ToggleShowAll | ToggleShowCounter | ToggleLocalStorage | GetCurrentUrl | UpdateHighlightCustomColors | ToggleForceColors;

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

export const toggleForceColors = (): ToggleForceColors => {
  return {
    type: TOGGLE_FORCE_COLORS
  };
};

export const toggleShowCounter = (): ToggleShowCounter => {
  return {
    type: TOGGLE_SHOW_COUNTER
  };
};

export const toggleLocalStorage = (): ToggleLocalStorage => {
  return {
    type: TOGGLE_LOCAL_STORAGE
  };
};

export const updateHighlightCustomColors = (colors: string[]): UpdateHighlightCustomColors => {
  return {
    type: UPDATE_HIGHLIGHT_CUSTOM_COLORS,
    payload: colors
  };
};

export const getCurrentUrl = (): GetCurrentUrl => {

  let payload: any;

  if (browserName === CHROME) {

    payload = new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const err = chrome.runtime.lastError;
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
