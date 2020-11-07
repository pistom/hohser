import { SearchEngineConfig } from '../types';

export const onesearch: SearchEngineConfig = {
  resultSelector: '.relsrch',
  domainSelector: '.title + div > span:first-child',
  observerSelector: '#main',
};
