import { FETCH_OPTIONS_PENDING, FETCH_OPTIONS_FULFILLED, FETCH_OPTIONS_REJECTED, TOGGLE_SHOW_ALL, TOGGLE_SHOW_COUNTER, TOGGLE_LOCAL_STORAGE, GET_CURRENT_URL_FULFILLED, UPDATE_HIGHLIGHT_CUSTOM_COLORS, TOGGLE_FORCE_COLORS, SET_PARTIAL_HIDE_OPACITY } from '../constants/index';
import { OptionAction } from '../actions';
import { Options } from '../types';
import { browserStorageSync } from '../popup';
import { getShortUrl } from '../components/Content/ResultManagement';

export interface OptionsState {
  options: Options;
  optionsLoading: boolean;
  optionsError: boolean;
  currentTabUrl: string | null;
}

const optionsState = {
  options: {
    showAll: false,
    showCounter: false,
    useLocalStorage: false,
    highlightColors: [],
    forceColors: true,
    partialHideOpacity: 25,
  },
  optionsLoading: true,
  optionsError: false,
  currentTabUrl: null
};

export const options = (state: OptionsState = optionsState, action: OptionAction): OptionsState => {
  switch (action.type) {

    case FETCH_OPTIONS_PENDING:
      {
        return {
          ...state,
          optionsLoading: true
        };
      }

    case FETCH_OPTIONS_FULFILLED:
      {
        if (action.payload.options) {
        return {
          ...state,
          options: action.payload.options,
          optionsLoading: false
        };
      } else {
        return {
          ...state,
          optionsLoading: false
        };
      }
    }

    case FETCH_OPTIONS_REJECTED:
      {
        console.error("I could not get any options from store");
        return {
          ...state,
          optionsError: true
        };
      }

    case TOGGLE_SHOW_ALL:
      {
        const options = {...state.options};
        options.showAll = !state.options.showAll;
        browserStorageSync.set({options});
        return { ...state, options };
      }

    case TOGGLE_SHOW_COUNTER:
      {
        const options = {...state.options};
        options.showCounter = !state.options.showCounter;
        browserStorageSync.set({options});
        return { ...state, options };
      }

    case TOGGLE_LOCAL_STORAGE:
      {
        const options = {...state.options};
        options.useLocalStorage = !state.options.useLocalStorage;
        browserStorageSync.set({options});
        return { ...state, options };
      }

    case GET_CURRENT_URL_FULFILLED:
      {
        const url = (action.payload && action.payload[0] && action.payload[0].url);
        let currentTabUrl = null;
        if (url) {
          currentTabUrl = getShortUrl(url);
        }
        return {
          ...state,
          currentTabUrl
        };
      }

    case UPDATE_HIGHLIGHT_CUSTOM_COLORS:
      {
        const options = {...state.options};
        options.highlightColors = action.payload;
        browserStorageSync.set({options});
        return { ...state, options };
      }

    case TOGGLE_FORCE_COLORS:
      {
        const options = {...state.options};
        options.forceColors = !state.options.forceColors;
        browserStorageSync.set({options});
        return { ...state, options };
      }

    case SET_PARTIAL_HIDE_OPACITY:
      {
        const options = {...state.options};
        options.partialHideOpacity = action.payload;
        browserStorageSync.set({options});
        return { ...state, options };
      }
  }
  return state;
};
