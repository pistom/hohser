import { SearchEngineConfig } from '../types';

export const baidu: SearchEngineConfig = {
  resultSelector: '.result',
  domainSelector: '.c-showurl',
  domainSelectorForceText: true,
  observerSelector: '#wrapper_wrapper',
  ajaxResults: true,
};
