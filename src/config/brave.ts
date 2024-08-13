import { SearchEngineConfig } from '../types';

export const brave: SearchEngineConfig = {
  resultSelector: '#results > .snippet',
  domainSelector: '#results .netloc',
  observerSelector: '#results',
  resultUrlSelector: '#results > .snippet > a',
  ajaxResults: true,
};
