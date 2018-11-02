import { PARTIAL_HIDE, FULL_HIDE } from 'src/constants';

export type HideStyle = PARTIAL_HIDE | FULL_HIDE

export interface Domain {
  domainName: string;
  hideStyle: HideStyle;
}

export interface StoreState {
  domainsList: Array<Domain>;
  settings: boolean;
  addDomain: (domainName: string, hideStyle: HideStyle) => void;
  removeDomain: () => void;
}
