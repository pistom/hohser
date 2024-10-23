import { CHROME, FIREFOX } from "./constants";

// Detect if the browser is Firefox or Chrome
const isFirefox = typeof browser !== 'undefined';
const isChrome = typeof chrome !== 'undefined' && !isFirefox;

export const browserName = typeof browser === 'undefined' ? typeof chrome === 'undefined' ?
  null : CHROME : FIREFOX;
const root = browserName === FIREFOX ? browser : chrome;

function createContextMenu() {
  const contextMenuId = "show-hidden-results";

  if (isFirefox) {
    root.contextMenus.create({
      id: contextMenuId,
      title: "Show all results",
      checked: false,
      type: "checkbox",
      contexts: ["browser_action"]
    });
  } else if (isChrome) {
    root.contextMenus.create({
      id: contextMenuId,
      title: "Show all results",
      type: "checkbox",
      checked: false,
      contexts: ["action"]
    });
  }
}

if (isFirefox) {
  browser.runtime.onInstalled.addListener(createContextMenu);
  browser.contextMenus.onClicked.addListener(contextMenuClicked);
} else if (isChrome) {
  chrome.runtime.onInstalled.addListener(createContextMenu);
  chrome.contextMenus.onClicked.addListener(contextMenuClicked);
}

function contextMenuClicked(info, tab) {
  if (info.menuItemId === "show-hidden-results") {
      root.storage.sync.get("options").then((data) => {
        let options = data.options || {
          showAll: false,
          showCounter: false,
          useLocalStorage: false,
          highlightColors: [],
          forceColors: true,
          partialHideOpacity: 25,
        };
        if (options.showAll) {
          options.showAll = false;
        } else {
          options.showAll = true;
        }
        root.contextMenus.update("show-hidden-results", { checked: !!options.showAll });
        root.storage.sync.set({ options });
      }
    );
  }
}

const setBadge = (state) => {
  if (isChrome)
    chrome.action.setBadgeText({ text: state ? "X" : "" });
  if (isFirefox)
    browser.browserAction.setBadgeText({ text: state ? "X" : "" });
}

root.storage.sync.get("options").then((data) => {
  let options = data.options;
  if (options && options.showAll) {
    root.contextMenus.update("show-hidden-results", { checked: !!options.showAll });
    setBadge(options.showAll);
  }
});

root.storage.sync.onChanged.addListener((changes) => {
  if (changes.options) {
    let options = changes.options.newValue;
    if (options) {
      root.contextMenus.update("show-hidden-results", { checked: !!options.showAll });
      setBadge(options.showAll);
    }
  }
});