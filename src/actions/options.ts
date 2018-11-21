import { FETCH_OPTIONS_PENDING, FETCH_OPTIONS_FULFILLED, FETCH_OPTIONS_REJECTED, FETCH_OPTIONS, TOGGLE_SHOW_ALL } from '../constants';
import { browserStorageSync } from 'src/popup';

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

export type OptionAction = FetchOptions | ToggleShowAll;

export const fetchOptions = (): FetchOptions => ({
  type: FETCH_OPTIONS,
  payload: browserStorageSync.get('options')
    .then((res: any) => res)
    .catch((err: any) => {console.error(err);})
});

export const toggleShowAll = (): ToggleShowAll => {
  return {
    type: TOGGLE_SHOW_ALL
  };
};
