import { PARTIAL_HIDE, FULL_HIDE, COLOR_1, COLOR_2, COLOR_3, HIGHLIGHT } from '../constants';

export type DisplayStyle = HIGHLIGHT | PARTIAL_HIDE | FULL_HIDE;
export type Color = COLOR_1 | COLOR_2 | COLOR_3 | string;

export interface Domain {
  domainName: string;
  display: DisplayStyle;
  color?: Color;
}

export interface Options {
  showAll: boolean;
  forceColors: boolean;
  partialHideOpacity: number;
  showCounter: boolean;
  useLocalStorage?: boolean;
  highlightColors: string[];
}

export interface SearchEngineConfig {
  resultSelector: string;
  domainSelector: string;
  observerSelector: string;
  ajaxResults?: boolean;
  resultUrlSelector?: string;
  domainSelectorForceText?: boolean;
}

export interface StoreState {
  domainsList: Array<Domain>;
  option: boolean;
  addDomain: (domainName: string, display: DisplayStyle, color?: Color) => void;
  editDomain: (index: number, domainName: string, display: DisplayStyle, color?: Color) => void;
  removeDomain: () => void;
}

export interface DomainsCounters {
  fullHide: number;
}
