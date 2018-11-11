import { DomainAction } from '../actions/domains';
import { Domain } from '../types/index';
import {
  ADD_DOMAIN,
  REMOVE_DOMAIN,
  IMPORT_FROM_OLD_VERSION,
  FETCH_DOMAINS_PENDING, 
  FETCH_DOMAINS_FULFILLED, 
  FETCH_DOMAINS_REJECTED
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
        domainsList.push({ domainName: action.domainName, hideStyle: action.hideStyle });
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
        console.error("I could not get the list from store")
        return {
          ...state,
          domainsListError: true
        };
      }

    case IMPORT_FROM_OLD_VERSION:
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
