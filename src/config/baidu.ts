import { SearchEngineConfig } from '../types';

export const baidu: SearchEngineConfig = {
  resultSelector: '.result',
  domainSelector: '.c-showurl, [class^="siteLink"]',
  domainSelectorForceText: true,
  observerSelector: '#wrapper_wrapper, #content_left',
  ajaxResults: true,
};
