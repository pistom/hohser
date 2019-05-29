import {
  FETCH_DOMAINS,
  FETCH_DOMAINS_PENDING,
  FETCH_DOMAINS_FULFILLED,
  FETCH_DOMAINS_REJECTED,
  ADD_DOMAIN,
  EDIT_DOMAIN,
  REMOVE_DOMAIN,
  CLEAR_DOMAIN_LIST,
  IMPORT_FROM_OLD_VERSION,
  IMPORT_FROM_OLD_VERSION_PENDING,
  IMPORT_FROM_OLD_VERSION_FULFILLED,
  IMPORT_FROM_OLD_VERSION_REJECTED,
  IMPORT_DOMAINS
} from '../constants';
import { DisplayStyle, Color, Domain } from 'src/types';
import { browserStorageSync } from 'src/popup';

export interface AddDomain {
  type: ADD_DOMAIN;
  domainName: string;
  display: DisplayStyle;
  color?: Color;
}

export interface EditDomain {
  type: EDIT_DOMAIN;
  domainName: string;
  display: DisplayStyle;
  color?: Color;
  index: number;
}

export interface RemoveDomain {
  type: REMOVE_DOMAIN;
  index: number;
}

export interface ClearDomainList {
  type: CLEAR_DOMAIN_LIST;
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

export interface ImportDomains {
  type: IMPORT_DOMAINS;
  domainsList: Domain[];
}

export type DomainAction =
  | AddDomain
  | EditDomain
  | RemoveDomain
  | ClearDomainList
  | FetchDomains
  | ImportFromOldVersion
  | ImportDomains;

export const fetchDomainsList = (): FetchDomains => {

  return {
    type: FETCH_DOMAINS,
    payload: browserStorageSync.get('domainsList')
      .then((res: any) => res)
      .catch((err: any) => {console.error(err);})
  };
};

export const addDomain = (domainName: string, display: DisplayStyle, color?: Color): AddDomain => {
  return {
    type: ADD_DOMAIN,
    domainName,
    display,
    color
  };
};

export const editDomain = (index: number, domainName: string, display: DisplayStyle, color?: Color): EditDomain => {
  return {
    type: EDIT_DOMAIN,
    domainName,
    display,
    color,
    index
  };
};

export function removeDomain (index: number): RemoveDomain {
  return {
    type: REMOVE_DOMAIN,
    index
  };
}

export function clearDomainList (): ClearDomainList {
  return {
    type: CLEAR_DOMAIN_LIST
  };
}

export function importFromOldVersion ():  ImportFromOldVersion {
  // Check if browser object is defined
  const payload = typeof browser !== 'undefined' ?
    browser.storage.local.get('ddghurBlockedDomains')
        .then((res: any) => res) : [];
  return {
    type: IMPORT_FROM_OLD_VERSION,
    payload
  };
}

export function importDomains (domainsList: Domain[]): ImportDomains {
  return {
    type: IMPORT_DOMAINS,
    domainsList
  };
}
