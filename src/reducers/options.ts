import { FETCH_OPTIONS_PENDING, FETCH_OPTIONS_FULFILLED, FETCH_OPTIONS_REJECTED, TOGGLE_SHOW_ALL } from '../constants/index';
import { OptionAction } from 'src/actions';
import { Options } from 'src/types';
import { browserStorageSync } from 'src/popup';

export interface OptionsState {
  options: Options;
  optionsLoading: boolean;
  optionsError: boolean;
}

const optionsState = {
  options: {
    showAll: false
  },
  optionsLoading: true,
  optionsError: false,
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

  }
  return state;
};
