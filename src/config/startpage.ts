import { SearchEngineConfig } from '../types';

export const startpage: SearchEngineConfig = {
  resultSelector: '.search-result, .w-gl__result',
  domainSelector: '.search-item__url, .w-gl__result-url',
  observerSelector: '.column--main__content > ol',
};
