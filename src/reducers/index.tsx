import { DomainAction } from '../actions';
import { StoreState } from '../types/index';
import { ADD_DOMAIN, REMOVE_DOMAIN } from '../constants/index';

export function domain(state: StoreState, action: DomainAction): StoreState {
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

  }
  return state;
}
