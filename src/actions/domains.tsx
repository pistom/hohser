import * as constants from '../constants';
import { HideStyle } from 'src/types';

export interface AddDomain {
  type: constants.ADD_DOMAIN;
  domainName: string;
  hideStyle: HideStyle
}

export interface RemoveDomain {
  type: constants.REMOVE_DOMAIN;
}

export interface FetchDomains {
  type: constants.FETCH_DOMAINS | constants.FETCH_DOMAINS_PENDING | constants.FETCH_DOMAINS_FULFILLED;
  payload: any;
}

export type DomainAction = AddDomain | RemoveDomain | FetchDomains;

export const fetchDomainsList = (): FetchDomains => ({
  type: constants.FETCH_DOMAINS,
  payload: fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json()),
});


export function addDomain(domainName: string, hideStyle: HideStyle): AddDomain {
  return {
    type: constants.ADD_DOMAIN,
    domainName,
    hideStyle
  }
}

export function removeDomain(): RemoveDomain {
  return {
    type: constants.REMOVE_DOMAIN
  }
}
