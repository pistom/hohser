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
        removeResultStyle(
          result as HTMLElement
        );
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
    COLOR_1: [245, 0, 87],
    COLOR_2: [139, 195, 74],
    COLOR_3: [3, 169, 244]
  };
  if (displayStyle === HIGHLIGHT) {
    result.classList.add("hohser_highlight");
    result.style.backgroundColor = `rgba(${domainColors[color].join(', ') || null}, .15)`;
  } else if (displayStyle === PARTIAL_HIDE) {
    result.classList.add("hohser_partial_hide");
  } else if (displayStyle === FULL_HIDE) {
    result.classList.add("hohser_full_hide");
  }
}

// Remove styles from result
function removeResultStyle(
  result: HTMLElement
) {
  result.classList.remove("hohser_highlight", "hohser_partial_hide", "hohser_full_hide");
  result.style.backgroundColor = null;
}

// Initial process results
processResults();

// Process results on page load
document.addEventListener('load', () => {
  processResults();
});

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
