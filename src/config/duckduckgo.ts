import { SearchEngineConfig } from 'src/types';

export const duckduckgo: SearchEngineConfig = {
  resultSelector: '.result',
  domainSelector: '.result__url',
  observerSelector: '#links'
};
