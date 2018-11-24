import StorageManager from "./content/storageManager";
import { SearchEngineConfig, DisplayStyle, Color } from "./types";
import * as config from "./config";
import { PARTIAL_HIDE, FULL_HIDE, HIGHLIGHT } from "./constants";
import './content.css';
import { Options } from './types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ResultManagement } from './components/Content/ResultManagement';

// Initialize storage manager
const storageManager = new StorageManager();

// Determine search engine and apply right config
const searchEngine = (location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[1];
let searchEngineConfig: SearchEngineConfig = config[searchEngine];

// Array of management component anchors
const managementComponentAnchors: Array<Element> = [];

// Process results function
async function processResults () {
  const resultsList = document.querySelectorAll(
    searchEngineConfig.resultSelector
  );

  // Fetching domains list and options
  const domainsList = await storageManager.fetchDomainsList();
  const options = await storageManager.fetchOptions();

  // Clear managementComponent anchors
  managementComponentAnchors.forEach(a => {
    try{
      if (a.parentNode) a.parentNode.removeChild(a);
    } catch (e) {
      console.log(e);
    }
  });

  resultsList.forEach(r => {
    const result = r as HTMLElement;
    result.classList.add('hohser_result');
    try {
      const domain = result.querySelector(
        searchEngineConfig.domainSelector
      );
      const url = (domain as HTMLElement).innerText;

      // Add management component to the result
      const managementComponentAnchor = result.appendChild(document.createElement("span"));
      managementComponentAnchor.classList.add("hohser_result_management");
      managementComponentAnchors.push(managementComponentAnchor);
      ReactDOM.render(
        <ResultManagement result={result} url={url} storageManager={storageManager} />,
        managementComponentAnchor as HTMLElement
      );

      // Listen to management results icon click and event stop propagation
      managementComponentAnchor.addEventListener('click', (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.nodeName === 'BUTTON') {
          const action = e.target.dataset.action;
          const color = e.target.dataset.color;
          const domain = e.target.dataset.domain;
          storageManager.save(domain, action, color);
        }
      });

      // Applay or remove classes to the matches results
      const matches = domainsList.filter(s => url.includes(s.domainName));
      if (matches.length > 0) {
        removeResultStyle(result);
        applyResultStyle(result, matches[0].color, matches[0].display, options);
      } else {
        removeResultStyle(result);
      }
    } catch (e) {}
  });
}

// Apply styles to matches results
function applyResultStyle (
  result: HTMLElement,
  color: Color,
  displayStyle: DisplayStyle,
  options: Options
) {
  const domainColors = {
    COLOR_1: [245, 0, 87],
    COLOR_2: [139, 195, 74],
    COLOR_3: [3, 169, 244]
  };
  if (displayStyle === HIGHLIGHT) {
    result.classList.add("hohser_highlight");
    result.style.backgroundColor = `rgba(${domainColors[color].join(', ') || null}, .20)`;
  } else if (displayStyle === PARTIAL_HIDE) {
    result.classList.add("hohser_partial_hide");
  } else if (displayStyle === FULL_HIDE && !options.showAll) {
    result.classList.add("hohser_full_hide");
  } else if (displayStyle === FULL_HIDE && options.showAll) {
    result.classList.add("hohser_partial_hide");
  }
}

// Remove styles from result
function removeResultStyle (
  result: HTMLElement
) {
  result.classList.remove("hohser_highlight");
  result.classList.remove("hohser_partial_hide");
  result.classList.remove("hohser_full_hide");
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
