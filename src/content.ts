import StorageManager from './content/storageManager';
import { SearchEngineConfig } from './types';

const storageManager = new StorageManager();

let searchEngineConfig: SearchEngineConfig;
let domain = 'duckduckgo.com';

switch (domain) {
  case 'duckduckgo.com':
    searchEngineConfig = {resultSelector: '.result', domainSelector: '.result__url__domain'};
    break;
  case 'google.com':
    searchEngineConfig = {resultSelector: '.g', domainSelector: '.TbwUpd'};
    break;
}

async function processResults (searchEngineConfig: SearchEngineConfig, resultsList: NodeList) {
  const domainsList = await storageManager.fetchDomainsList();
  resultsList.forEach((result) => {
    const domain = (result as Element).querySelector(searchEngineConfig.domainSelector);
    const domainTxt = (domain as HTMLElement).innerText;
    const matches = domainsList.filter(s => domainTxt.includes(s.domainName));
    if (matches.length > 0) {
      (result as HTMLElement).style.backgroundColor = '#f50057';
    }
  });
}

window.onload = function () {
  const resultsList = document.querySelectorAll(searchEngineConfig.resultSelector);
  processResults(searchEngineConfig, resultsList);
};



