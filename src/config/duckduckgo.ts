import { SearchEngineConfig } from '../types';

export const duckduckgo: SearchEngineConfig = {
  resultSelector: '.result, [data-nrn="result"], [data-testid="result"]',
  domainSelector: '.result__url, [data-testid="result-extras-url-link"]',
  observerSelector: '#web_content_wrapper, #vertical_wrapper, #links_wrapper',
  ajaxResults: true
};
