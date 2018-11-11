import { PARTIAL_HIDE, FULL_HIDE, COLOR_1, COLOR_2, COLOR_3 } from 'src/constants';

export type HideStyle = PARTIAL_HIDE | FULL_HIDE;
export type Color = COLOR_1 | COLOR_2 | COLOR_3;

export interface Domain {
  domainName: string;
  hideStyle: HideStyle;
  color?: Color;
}

export interface StoreState {
  domainsList: Array<Domain>;
  option: boolean;
  addDomain: (domainName: string, hideStyle: HideStyle, color?: Color) => void;
  removeDomain: () => void;
}
