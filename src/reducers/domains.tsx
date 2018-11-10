import { DomainAction } from '../actions/domains';
import { Domain } from '../types/index';
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

export const domains = (state: DomainsState = domainsState, action: DomainAction): DomainsState => {
  switch (action.type) {

    case ADD_DOMAIN:
      {
        const domainsList = [...state.domainsList]
        domainsList.push({ domainName: action.domainName, hideStyle: action.hideStyle })
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
