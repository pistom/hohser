import { DomainAction } from '../actions/domains';
import { Domain } from '../types/index';
import BrowserStorageSyncMock from 'src/mock/browserStorageSyncMock';
import {
  ADD_DOMAIN,
  REMOVE_DOMAIN,
  FETCH_DOMAINS_PENDING, 
  FETCH_DOMAINS_FULFILLED, 
  FETCH_DOMAINS_REJECTED
} from '../constants/index';

export interface DomainsState {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  domainsListError: boolean;
  dog: string;
}

let domainsState = {
  domainsList: [],
  domainsListLoading: true,
  domainsListError: false,
  dog: ''
};

/*
 * This constant stores a reference to browser.storage.sync object.
 * In normal browser window browser object is not accesible.
 * In this case the constant stores a reference to a browser storage mock object.
 */
const browserStorageSync: any = typeof browser === 'undefined' ? new BrowserStorageSyncMock() : browser.storage.sync;

export const domains = (state: DomainsState = domainsState, action: DomainAction): DomainsState => {
  switch (action.type) {
    
    case ADD_DOMAIN:
      {
        const domainsList = [...state.domainsList];
        domainsList.push({ domainName: action.domainName, hideStyle: action.hideStyle });
        browserStorageSync.set({domainsList});        
        return { ...state, domainsList };
      }

    case REMOVE_DOMAIN:
      {
        return { ...state };
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
          dog: action.payload.message,
          domainsListLoading: false
        };
      }

    case FETCH_DOMAINS_REJECTED:
      {
        console.error("I could not get the list from store")
        return {
          ...state,
          domainsListError: true
        };
      }

  }
  return state;
}
