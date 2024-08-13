import StorageManager from "./content/storageManager";
import { SearchEngineConfig, DisplayStyle, Color, Domain, DomainsCounters } from "./types";
import * as config from "./config";
import { PARTIAL_HIDE, FULL_HIDE, HIGHLIGHT, LOCAL_STORAGE, SYNC_STORAGE } from "./constants";
import './content.scss';
import { Options } from './types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ResultManagement } from './components/Content/ResultManagement';
import { ResizeObserver } from './mock/ResizeObserver';
import { DomainsCounter } from './components/Content/DomainsCounter';

// Initialize storage manager
const storageManager = new StorageManager();
let options: Options;

// Determine search engine and apply right config
const searchEngine = (location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[1];
const searchEngineConfig: SearchEngineConfig = config[searchEngine];

// Array of management component anchors
const managementComponentAnchors: Array<Element> = [];

// Turn array of RGBA values into CSS `rgba` function call
function getRgbCss (color: Array<number>, alpha = 1): string {
  return `rgba(${color.map(Math.floor).join(', ') || null}, ${alpha})`;
}

function hexToRgb (h: any): Array<number> {
  const r = "0x" + h[0] + h[1];
  const g = "0x" + h[2] + h[3];
  const b = "0x" + h[4] + h[5];
  return [+r, +g, +b];
}

// Apply styles to matches results
function applyResultStyle (
  result: HTMLElement,
  color: Color,
  displayStyle: DisplayStyle,
  options: Options,
): void {
  const domainColors = {
    COLOR_1: [245, 0, 87],
    COLOR_2: [139, 195, 74],
    COLOR_3: [3, 169, 244]
  };
  // Add custom highlight colors to the domainColors list
  options?.highlightColors?.forEach((color: string, i: number) => {
    domainColors[`COLOR_${i+4}`] = color.includes('super') ? color : hexToRgb(color);
  });
  const alpha = 0.12;
  if (displayStyle === HIGHLIGHT && Array.isArray(domainColors[color])) {
    result.classList.add("hohser_highlight");
    result.setAttribute('style', `background-color: ${getRgbCss(domainColors[color], alpha)}${!options || options?.forceColors ? '!important' : ''}`);
    result.style.transition = `.5s`;
    result.style.boxShadow = `0 0 0 5px ${getRgbCss(domainColors[color], alpha)}`;
  } else if (displayStyle === PARTIAL_HIDE) {
    result.classList.add("hohser_partial_hide");
    if (options?.partialHideOpacity) {
      result.setAttribute('style', `opacity: ${options?.partialHideOpacity / 100}`);
    }
  } else if (displayStyle === FULL_HIDE && (!options || !options?.showAll)) {
    result.classList.add("hohser_full_hide");
  } else if (displayStyle === FULL_HIDE && options && options?.showAll) {
    result.classList.add("hohser_partial_hide");
  } else if (!Array.isArray(domainColors[color])) {
    result.classList.add(domainColors[color]);
  }
}

// Remove styles from result
function removeResultStyle (
  result: HTMLElement
): void {
  result.classList.remove("hohser_highlight");
  result.classList.remove("hohser_partial_hide");
  result.classList.remove("hohser_full_hide");
  result.style.backgroundColor = '';
  result.style.boxShadow = '';
}

// Process one result
function processResult (r: Element, domainList: any, options: any, processResultsAttempt: number): DisplayStyle | null {
  let displayStyle: DisplayStyle | null = null;
  try {
    const result = r as HTMLElement;
    result.classList.add('hohser_result', 'hohser_result-' + searchEngine);
    const domain = searchEngineConfig.resultUrlSelector &&
      result.querySelector(
        searchEngineConfig.resultUrlSelector
      ) as HTMLAnchorElement ||
      result.querySelector(
        searchEngineConfig.domainSelector
      ) as HTMLElement;
    // Skip result if no domain selector
    if (!domain) return displayStyle;

    const url = searchEngineConfig.domainSelectorForceText ?
      (domain as HTMLElement).innerText :
      (domain as HTMLAnchorElement).href || (domain as HTMLElement).innerText;
    if (!url) {
      throw new Error("No domain info");
    }

    let matchedString: string | null = null;

    // Add or remove classes to matches results
    const matches = domainList.filter((s: Domain) => url.includes(s.domainName));
    if (matches.length > 0) {
      const domain = matches.reduce(function (a: Domain, b: Domain) { return a.domainName.length > b.domainName.length ? a : b; });
      removeResultStyle(result);
      applyResultStyle(result, domain.color, domain.display, options);
      matchedString = domain.domainName;
      displayStyle = domain.display;
    } else {
      removeResultStyle(result);
    }

    // Add management component to the result
    const managementComponentAnchor = result.appendChild(document.createElement("span"));
    managementComponentAnchor.classList.add("hohser_result_management");
    managementComponentAnchors.push(managementComponentAnchor);

    // Listen to management component buttons click and stop event propagation
    function handleManagementComponentClick(e: React.MouseEvent<HTMLButtonElement>, action: string, color: string | null, domain: string): void {
      e.preventDefault();
      e.stopPropagation();
      if (action === "REMOVE_DOMAIN") {
        storageManager.removeEntry(matchedString);
      } else if (action === "FULL_HIDE" || action === "PARTIAL_HIDE" || action === "HIGHLIGHT") {
        storageManager.save(domain, action, color);
      }
    }

    ReactDOM.render(
      <ResultManagement url={url} showDeleteButton={!!matchedString} handleClick={handleManagementComponentClick} />,
      managementComponentAnchor as HTMLElement
    );
  } catch (e) {
    console.warn(e);
    // Try to process result again
    if (++processResultsAttempt <= 3) {
      setTimeout(() => {
        processResult(r, domainList, options, processResultsAttempt);
      }, 100 * Math.pow(processResultsAttempt, 3));
    }
  }
  return displayStyle;
}

// Process results function
async function processResults (domainList: Domain[], options: Options): Promise<void> {
  const domainsCounters: DomainsCounters = {fullHide: 0};

  const resultsList = document.querySelectorAll(
    searchEngineConfig.resultSelector
  );

  // Clear managementComponent anchors
  managementComponentAnchors.forEach(a => {
    try{
      if (a.parentNode) a.parentNode.removeChild(a);
    } catch (e) {
      console.log(e);
    }
  });

  resultsList.forEach(r => {
    // Number of attempts to process results
    const processResultsAttempt: number = 0;
    const displayStyle = processResult(r, domainList, options, processResultsAttempt);
    if (displayStyle === FULL_HIDE) {
      domainsCounters.fullHide++;
    }
  });

  // Show hidden results counter
  if (options?.showCounter && domainsCounters.fullHide > 0){
    if (!document.getElementById('hohser_domains_counter')) {
      const counterElement = document.body.appendChild(document.createElement("span"));
      counterElement.id ='hohser_domains_counter';
    }
    ReactDOM.render(
      <DomainsCounter domainsCounters={domainsCounters} />,
      document.getElementById('hohser_domains_counter') as HTMLElement
    );
  } else if(document.getElementById('hohser_domains_counter')) {
    const element = document.getElementById('hohser_domains_counter');
    if (element && element.parentNode) element.parentNode.removeChild(element);
  }
}

// Check if Firefox or Chrome and assign the right storage object
const browserStorageSync = ((typeof browser !== 'undefined') && browser.storage.sync) ||
                         ((typeof chrome !== 'undefined') && (chrome.storage as any).promise.sync);

browserStorageSync.get('options')
  .then((o: any) => {
    options = o && o.options as Options;
    const useLocalStorage = options && !!options.useLocalStorage;
    storageManager.storageType = useLocalStorage ? LOCAL_STORAGE : SYNC_STORAGE;
    return storageManager.fetchDomainsList();
  })
  .then((d: Domain[]) => {
    let domainList = d;
    // Initial process results
    processResults(domainList, options);

    // Re-process results on page load if it wasn't done initially
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => {
        processResults(domainList, options);
      });
    }

    // Process results on DOM change
    const targets = document.querySelectorAll(searchEngineConfig.observerSelector);
    targets.forEach(target => {
      const observer = new MutationObserver(function () {
        processResults(domainList, options);
      });
      if (target) observer.observe(target, { childList: true });
    });

    // Process results on storage change event
    storageManager.oryginalBrowserStorage.onChanged.addListener((storage: any) => {
      domainList = (storage.domainsList && storage.domainsList.newValue) || domainList;
      options = (storage.options && storage.options.newValue) || options;
      processResults(domainList, options);
    });

    // Process results on add new page by AutoPagerize extension
    document.addEventListener("AutoPagerize_DOMNodeInserted", function () {
      processResults(domainList, options);
    }, false);

    if (searchEngineConfig.ajaxResults) {

      // Observe resize event on result wrapper
      let isResized: any;
      const resizeObserver = new ResizeObserver(() => {
        window.clearTimeout( isResized );
        isResized = setTimeout(() => {
          processResults(domainList, options);
        }, 500);
      });

      const resultsWrappers = document.querySelectorAll(searchEngineConfig.observerSelector);
      resultsWrappers.forEach(resultsWrapper => {
        resizeObserver.observe(resultsWrapper);
      });

    }
  });
