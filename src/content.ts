import StorageManager from "./content/storageManager";
import { SearchEngineConfig, DisplayStyle, Color } from "./types";
import { duckduckgo, google, yahoo } from "./config";
import { PARTIAL_HIDE, FULL_HIDE, HIGHLIGHT } from "./constants";
import './content.css';

// Initialize storage manager
const storageManager = new StorageManager();

// Determine search engine and applay right config
let searchEngineConfig: SearchEngineConfig;
var searchEngine = (location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) ||
  [])[1];

switch (searchEngine) {
  case "duckduckgo":
    searchEngineConfig = duckduckgo;
    break;
  case "google":
    searchEngineConfig = google;
    break;
  case "yahoo":
    searchEngineConfig = yahoo;
    break;
  default:
    searchEngineConfig = duckduckgo;
}

// Process results function
async function processResults () {
  const resultsList = document.querySelectorAll(
    searchEngineConfig.resultSelector
  );
  const domainsList = await storageManager.fetchDomainsList();
  resultsList.forEach(result => {
    try {
      const domain = (result as Element).querySelector(
        searchEngineConfig.domainSelector
      );
      const domainTxt = (domain as HTMLElement).innerText;
      const matches = domainsList.filter(s => domainTxt.includes(s.domainName));
      if (matches.length > 0) {
        applyResultStyle(
          result as HTMLElement,
          matches[0].color,
          matches[0].display
        );
      } else {
        (result as HTMLElement).style.backgroundColor = null;
      }
    } catch (e) {}
  });
}

// Apply styles to matches results
function applyResultStyle (
  result: HTMLElement,
  color: Color,
  displayStyle: DisplayStyle
) {
  const domainColors = {
    COLOR_1: "#f50057",
    COLOR_2: "#8BC34A",
    COLOR_3: "#03A9F4"
  };
  if (displayStyle === HIGHLIGHT) {
    result.style.backgroundColor = `${domainColors[color] || null}`;
  } else if (displayStyle === PARTIAL_HIDE) {
    result.style.opacity = "0.5";
  } else if (displayStyle === FULL_HIDE) {
    result.style.display = "none";
  }
}

// Process results on page load
window.onload = function () {
  processResults();
};

// Process results on DOM change
const target = document.querySelector(searchEngineConfig.observerSelector);
const observer = new MutationObserver(function (mutations) {
  processResults();
});
if (target) observer.observe(target, { childList: true });

// Process results on storage change event
storageManager.browserStorage.onChanged.addListener(() => {
  processResults();
});
