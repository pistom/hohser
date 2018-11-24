import { SearchEngineConfig } from 'src/types';

export const qwant: SearchEngineConfig = {
  resultSelector: '.result',
  domainSelector: '.result__url',
  observerSelector: '.results-page',
  ajaxResults: true
};
