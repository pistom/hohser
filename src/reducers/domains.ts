import { DomainAction } from '../actions/domains';
import { Domain } from '../types/index';
import {
  ADD_DOMAIN,
  EDIT_DOMAIN,
  REMOVE_DOMAIN,
  FETCH_DOMAINS_PENDING,
  FETCH_DOMAINS_FULFILLED,
  FETCH_DOMAINS_REJECTED,
  IMPORT_FROM_OLD_VERSION_FULFILLED,
  PARTIAL_HIDE,
  CHROME,
  CLEAR_DOMAIN_LIST,
  IMPORT_DOMAINS
} from '../constants/index';
import { browserStorage, browserName } from '../popup';

export interface DomainsState {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  domainsListError: boolean;
}

const domainsState = {
  domainsList: [],
  domainsListLoading: true,
  domainsListError: false,
};

export const isDomainNameOnList = (domainName: string, domainsList: Array<Domain>): boolean => {
  return domainsList.some(domain => domain.domainName === domainName);
};

const showError = (e: Error): void => {
    if(e.message.includes("QUOTA_BYTES_PER_ITEM")) {
      alert('The sync storage is full. You can use the local storage instead.');
    } else {
      alert(e.message);
    }
};

export const domains = (state: DomainsState = domainsState, action: DomainAction): DomainsState => {
  switch (action.type) {
    case ADD_DOMAIN:
      {
        const domainsList = [...state.domainsList];
        if(action.domainName && !isDomainNameOnList(action.domainName, domainsList)){
          if(action.color) {
            domainsList.push({ domainName: action.domainName, display: action.display, color: action.color });
          } else {
            domainsList.push({ domainName: action.domainName, display: action.display });
          }
          if (browserName === CHROME) {
            browserStorage.set({domainsList}, () => {console.log('saved');}).catch((e: Error) => showError(e));
          } else {
            browserStorage.set({domainsList}).catch((e: Error) => showError(e));
          }
        }
        return { ...state, domainsList };
      }

    case EDIT_DOMAIN:
      {
        const domainsList = [...state.domainsList];
        if(action.color) {
          domainsList[action.index] = { domainName: action.domainName, display: action.display, color: action.color };
        } else {
          domainsList[action.index] = { domainName: action.domainName, display: action.display };
        }

        browserStorage.set({domainsList})
          .catch((e: Error) => showError(e));
        return { ...state, domainsList };
      }

    case REMOVE_DOMAIN:
      {
        const domainsList = [...state.domainsList].filter((domain: Domain) => domain.domainName !== action.domainName);
        browserStorage.set({domainsList}).catch((e: Error) => showError(e));
        return { ...state, domainsList };
      }

    case CLEAR_DOMAIN_LIST:
        {
          const domainsList: Domain[] = [];
          browserStorage.set({domainsList}).catch((e: Error) => showError(e));
          return { ...state, domainsList };
        }

    case FETCH_DOMAINS_PENDING:
      {
        return {
          ...state,
          domainsListLoading: true
        };
      }

    case FETCH_DOMAINS_FULFILLED:
      {
        return {
          ...state,
          domainsList: action.payload.domainsList || [],
          domainsListLoading: false
        };
      }

    case FETCH_DOMAINS_REJECTED:
      {
        console.error("I could not get the list from store");
        return {
          ...state,
          domainsListError: true
        };
      }

    case IMPORT_FROM_OLD_VERSION_FULFILLED:
      {
        const domainsList = [...state.domainsList];
        const oldDomainsList = action.payload.ddghurBlockedDomains;
        if (oldDomainsList) {

          // This loops verify if imported domain is already on the list and add it if it is not.
          oldDL:
          for(let i = 0; i<oldDomainsList.length; i++) {
            for(let j = 0; j<domainsList.length; j++) {
              if(oldDomainsList[i] === domainsList[j].domainName) {
                continue oldDL;
              }
            }
            const domainEntry = ({domainName: oldDomainsList[i], display: PARTIAL_HIDE } as Domain);
            domainsList.push(domainEntry);
          }

          // Store domainsList object in storageSync
          browserStorage.set({domainsList}).catch((e: Error) => showError(e));

          // Remove ddghurBlockedDomains from localStorage
          browser.storage.local.remove('ddghurBlockedDomains').catch((e: Error) => showError(e));
        }

        return {
          ...state,
          domainsList
        };
      }

    case IMPORT_DOMAINS:
      {
        const domainsList: Domain[] = action.domainsList;
        browserStorage.set({domainsList})
        .catch((e: Error) => showError(e));
        return {
          ...state,
          domainsList
        };
      }

  }
  return state;
};
