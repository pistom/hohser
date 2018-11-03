import * as constants from '../constants';

export interface Test {
  type: constants.TEST;
}

export type OptionAction = Test;

export function test(): Test {
  return {
        type: constants.TEST
    }
}
