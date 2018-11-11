import { MENAGE_ANIMATIONS } from '../constants';

export interface Animations {
  type: MENAGE_ANIMATIONS;
}

export type OptionAction = Animations;

export function animations (): Animations {
  return {
        type: MENAGE_ANIMATIONS
    };
}
