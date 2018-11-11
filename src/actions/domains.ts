import {
  FETCH_DOMAINS,
  FETCH_DOMAINS_PENDING,
  FETCH_DOMAINS_FULFILLED,
  FETCH_DOMAINS_REJECTED,
  ADD_DOMAIN,
  REMOVE_DOMAIN,
  IMPORT_FROM_OLD_VERSION,
  IMPORT_FROM_OLD_VERSION_PENDING,
  IMPORT_FROM_OLD_VERSION_FULFILLED,
  IMPORT_FROM_OLD_VERSION_REJECTED
} from '../constants';
import { HideStyle, Color } from 'src/types';
import { browserStorageSync } from 'src/popup';

export interface AddDomain {
  type: ADD_DOMAIN;
  domainName: string;
  hideStyle: HideStyle;
  color?: Color;
}

export interface RemoveDomain {
  type: REMOVE_DOMAIN;
  index: number;
}

export interface ImportFromOldVersion {
  type:
    | IMPORT_FROM_OLD_VERSION
    | IMPORT_FROM_OLD_VERSION_PENDING
    | IMPORT_FROM_OLD_VERSION_FULFILLED
    | IMPORT_FROM_OLD_VERSION_REJECTED;
  payload: any;
}

export interface FetchDomains {
  type: FETCH_DOMAINS
    | FETCH_DOMAINS_PENDING
    | FETCH_DOMAINS_FULFILLED
    | FETCH_DOMAINS_REJECTED;
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
    .catch((err: any) => {console.error(err);})
});


export const addDomain = (domainName: string, hideStyle: HideStyle, color?: Color): AddDomain => {
  return {
    type: ADD_DOMAIN,
    domainName,
    hideStyle,
    color
  };
};

export function removeDomain (index: number): RemoveDomain {
  return {
    type: REMOVE_DOMAIN,
    index
  };
}

export function importFromOldVersion ():  ImportFromOldVersion {
  return {
    type: IMPORT_FROM_OLD_VERSION,
    payload: browser.storage.local.get('ddghurBlockedDomains')
      .then((res: any) => res)
  };
}
