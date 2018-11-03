import { DomainAction } from '../actions/domains';
import { Domain } from '../types/index';
import { ADD_DOMAIN, REMOVE_DOMAIN, TEST, FETCH_DOMAINS_PENDING, FETCH_DOMAINS_FULFILLED } from '../constants/index';
import { OptionAction } from 'src/actions';

export interface DomainsState {
  domainsList: Array<Domain>;
  option: boolean;
  dog: string;
}

export const defaultState = {
  domainsList:[],
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
      console.log('PENDING');
      return { ...state };
    }

    case FETCH_DOMAINS_FULFILLED:
    {
      console.log('FULFILLED');
      return { ...state, dog: action.payload.message };
    }
    
    case TEST:
      {
        console.log('test option reducer');
        return { ...state };
      }

  }
  return state;
}
