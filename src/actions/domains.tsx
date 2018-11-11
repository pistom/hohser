import {
  FETCH_DOMAINS,
  FETCH_DOMAINS_PENDING,
  FETCH_DOMAINS_FULFILLED,
  FETCH_DOMAINS_REJECTED,
  ADD_DOMAIN,
  REMOVE_DOMAIN,
  IMPORT_FROM_OLD_VERSION
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
  index: number;
}

export interface ImportFromOldVersion {
  type: IMPORT_FROM_OLD_VERSION;
}

export interface FetchDomains {
  type: 
    | FETCH_DOMAINS
    | FETCH_DOMAINS_PENDING
    | FETCH_DOMAINS_FULFILLED
    | FETCH_DOMAINS_REJECTED
    | IMPORT_FROM_OLD_VERSION;
  payload: any;
}

export type DomainAction = 
  | AddDomain
  | RemoveDomain
  | FetchDomains
  | ImportFromOldVersion;

export const fetchDomainsList = (): FetchDomains => ({
  type: FETCH_DOMAINS,
  payload: browserStorageSync.get('domainsList')
    .then((res: any) => res)
    .catch((err: any) => {console.error(err)})
});


export const addDomain = (domainName: string, hideStyle: HideStyle): AddDomain => {
  return {
    type: ADD_DOMAIN,
    domainName,
    hideStyle
  }
}

export function removeDomain(index: number): RemoveDomain {
  return {
    type: REMOVE_DOMAIN,
    index
  }
}

export function importFromOldVersion(): ImportFromOldVersion {
  return {
    type: IMPORT_FROM_OLD_VERSION
  }
}
