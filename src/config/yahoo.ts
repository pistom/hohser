import { SearchEngineConfig } from 'src/types';

export const yahoo: SearchEngineConfig = {
  resultSelector: '#web ol li',
  domainSelector: '.title + div > span',
  observerSelector: '#ysch'
};
