import { SearchEngineConfig } from '../types';

export const yahoo: SearchEngineConfig = {
  resultSelector: '#web ol li, .w',
  domainSelector: '.title span, .u',
  observerSelector: '#main'
};
