import StorageManager from './content/storageManager';
import { SearchEngineConfig } from './types';
import { duckduckgo, google, yahoo } from './config';

// Initialize storage manager
const storageManager = new StorageManager();

// Determine search engine and applay right config
let searchEngineConfig: SearchEngineConfig;
var searchEngine = (location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[1];

switch (searchEngine) {
  case 'duckduckgo':
    searchEngineConfig = duckduckgo;
    break;
  case 'google':
    searchEngineConfig = google;
    break;
  case 'yahoo':
    searchEngineConfig = yahoo;
    break;
  default:
    searchEngineConfig = duckduckgo;
}

// Process results function
async function processResults (searchEngineConfig: SearchEngineConfig, resultsList: NodeList) {
  const domainsList = await storageManager.fetchDomainsList();
  resultsList.forEach((result) => {
    try {
      const domain = (result as Element).querySelector(searchEngineConfig.domainSelector);
      const domainTxt = (domain as HTMLElement).innerText;
      const matches = domainsList.filter(s => domainTxt.includes(s.domainName));
      if (matches.length > 0) {
        (result as HTMLElement).style.backgroundColor = '#f50057';
      }
    } catch (e) {}
  });
}

// Process results on page load
window.onload = function () {
  const resultsList = document.querySelectorAll(searchEngineConfig.resultSelector);
  processResults(searchEngineConfig, resultsList);
};

// Process results on DOM change
const target = document.querySelector(searchEngineConfig.observerSelector);
const observer = new MutationObserver(function (mutations) {
  const resultsList = document.querySelectorAll(searchEngineConfig.resultSelector);
  processResults(searchEngineConfig, resultsList);
});
if (target) observer.observe(target, {childList: true});

// Process results on storage change event
storageManager.browserStorage.onChanged.addListener(() => {
  const resultsList = document.querySelectorAll(searchEngineConfig.resultSelector);
  processResults(searchEngineConfig, resultsList);
});
