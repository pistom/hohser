import {
  FETCH_DOMAINS,
  FETCH_DOMAINS_PENDING,
  FETCH_DOMAINS_FULFILLED,
  FETCH_DOMAINS_REJECTED,
  ADD_DOMAIN,
  REMOVE_DOMAIN
} from '../constants';
import { HideStyle } from 'src/types';
import { browserStorageSync } from 'src/popup';

export interface AddDomain {
  type: ADD_DOMAIN;
  domainName: string;
  hideStyle: HideStyle
}

export interface RemoveDomain {
  type: REMOVE_DOMAIN;
}

export interface FetchDomains {
  type: 
    | FETCH_DOMAINS
    | FETCH_DOMAINS_PENDING
    | FETCH_DOMAINS_FULFILLED
    | FETCH_DOMAINS_REJECTED;
  payload: any;
}

export type DomainAction = AddDomain | RemoveDomain | FetchDomains;

export const fetchDomainsList = (): FetchDomains => ({
  type: FETCH_DOMAINS,
  payload: browserStorageSync.get('domainsList')
    .then((res: any) => res)
});


export const addDomain = (domainName: string, hideStyle: HideStyle): AddDomain => {
  return {
    type: ADD_DOMAIN,
    domainName,
    hideStyle
  }
}

export function removeDomain(): RemoveDomain {
  return {
    type: REMOVE_DOMAIN
  }
}
