import { SearchEngineConfig } from 'src/types';

export const bing: SearchEngineConfig = {
  resultSelector: '.b_algo',
  domainSelector: '.b_attribution cite',
  observerSelector: '#b_results'
};
