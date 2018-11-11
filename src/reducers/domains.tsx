import { DomainAction } from '../actions/domains';
import { Domain } from '../types/index';
import {
  ADD_DOMAIN,
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

    case IMPORT_FROM_OLD_VERSION_FULFILLED:
      {
        const domainsList = [...state.domainsList];
        const oldDomainsList = action.payload.ddghurBlockedDomains || [];

        oldDomainsList:
        for(let i = 0; i<oldDomainsList.length; i++) {
          for(let j = 0; j<domainsList.length; j++) {
            if(oldDomainsList[i] === domainsList[j].domainName) {
              continue oldDomainsList;
            }
          }
          const domainEntry = ({domainName: oldDomainsList[i], hideStyle: PARTIAL_HIDE } as Domain)
          domainsList.push(domainEntry);
        }

        console.log(domainsList);

        return {
          ...state,
          domainsList
        };
      }

  }
  return state;
}
