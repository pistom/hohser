import { SearchEngineConfig } from '../types';

export const duckduckgo: SearchEngineConfig = {
  resultSelector: '.result',
  domainSelector: '.result__url',
  observerSelector: '#web_content_wrapper, #vertical_wrapper, #links_wrapper',
  ajaxResults: true
};
