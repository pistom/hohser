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

export type DomainAction = AddDomain | RemoveDomain;

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
