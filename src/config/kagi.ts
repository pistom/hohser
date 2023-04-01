import { SearchEngineConfig } from '../types';

export const kagi: SearchEngineConfig = {
  resultSelector: '._0_provider-content > :is(.search-result, .sri-group)',
  domainSelector: '.search-result ._0_URL',
  observerSelector: '._0_main-search-results'
};
