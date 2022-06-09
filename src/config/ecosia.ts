import { SearchEngineConfig } from '../types';

export const ecosia: SearchEngineConfig = {
  resultSelector: '.result',
  domainSelector: '.result-url, .result__link',
  observerSelector: '.results, .mainline web__mainline'
};
