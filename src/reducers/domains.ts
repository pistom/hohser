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
  PARTIAL_HIDE
} from '../constants/index';
import { browserStorageSync } from 'src/popup';

export interface DomainsState {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  domainsListError: boolean;
}

let domainsState = {
  domainsList: [],
  domainsListLoading: true,
  domainsListError: false,
};

export const domains = (state: DomainsState = domainsState, action: DomainAction): DomainsState => {
  switch (action.type) {

    case ADD_DOMAIN:
      {
        const domainsList = [...state.domainsList];
        if(action.color) {
          domainsList.push({ domainName: action.domainName, display: action.display, color: action.color });
        } else {
          domainsList.push({ domainName: action.domainName, display: action.display });
        }

        browserStorageSync.set({domainsList});
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

        browserStorageSync.set({domainsList});
        return { ...state, domainsList };
      }

    case REMOVE_DOMAIN:
      {
        const domainsList = [...state.domainsList];
        domainsList.splice(action.index, 1);
        browserStorageSync.set({domainsList});
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
          oldDomainsList:
          for(let i = 0; i<oldDomainsList.length; i++) {
            for(let j = 0; j<domainsList.length; j++) {
              if(oldDomainsList[i] === domainsList[j].domainName) {
                continue oldDomainsList;
              }
            }
            const domainEntry = ({domainName: oldDomainsList[i], display: PARTIAL_HIDE } as Domain);
            domainsList.push(domainEntry);
          }

          // Store domainsList object in storageSync
          browserStorageSync.set({domainsList});

          // Remove ddghurBlockedDomains from localStorage
          browser.storage.local.remove('ddghurBlockedDomains');
        }

        return {
          ...state,
          domainsList
        };
      }

  }
  return state;
};
