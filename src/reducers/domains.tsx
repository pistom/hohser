import { DomainAction } from '../actions/domains';
import { Domain } from '../types/index';
import { 
  ADD_DOMAIN, 
  REMOVE_DOMAIN, 
  TEST, 
  FETCH_DOMAINS_PENDING, 
  FETCH_DOMAINS_FULFILLED, 
  FETCH_DOMAINS_REJECTED 
} from '../constants/index';
import { OptionAction } from 'src/actions';

export interface DomainsState {
  domainsList: Array<Domain>;
  domainsListLoading: boolean;
  domainsListError: boolean;
  option: boolean;
  dog: string;
}

export const defaultState = {
  domainsList: [],
  domainsListLoading: true,
  domainsListError: false,
  option: true,
  dog: ''
};

export const domains = (state: DomainsState = defaultState, action: DomainAction | OptionAction): DomainsState => {
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

    case TEST:
      {
        console.log('test option reducer');
        return { ...state };
      }

  }
  return state;
}
