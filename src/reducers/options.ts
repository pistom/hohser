import {
  MENAGE_ANIMATIONS
} from '../constants/index';
import { OptionAction } from 'src/actions';

export interface OptionsState {
  animations: boolean;
}

const optionsState = {
  animations: true
};

export const options = (state: OptionsState = optionsState, action: OptionAction): OptionsState => {
  switch (action.type) {

    case MENAGE_ANIMATIONS:
      {
        return { ...state, animations: !state.animations };
      }

  }
  return state;
};
