import { DomainsState } from './domains';
import { OptionsState } from './options';

export interface State {
  domains: DomainsState,
  options: OptionsState
}

export * from './domains';
export * from './options';
