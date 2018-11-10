import { DomainsState, domains } from './domains';
import { OptionsState, options } from './options';
import { combineReducers } from 'redux';

export interface State {
  domains: DomainsState,
  options: OptionsState
}

export * from './domains';
export * from './options';

export const reducers = combineReducers({
  domains,
  options
})
