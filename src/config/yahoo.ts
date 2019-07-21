import { SearchEngineConfig } from '../types';

export const yahoo: SearchEngineConfig = {
  resultSelector: '#web ol li',
  domainSelector: '.title + div > span',
  observerSelector: '#ysch'
};
