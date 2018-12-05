/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from 'constants/ActionTypes';

export function dismissMessage() {
  return { type: types.DISMISS_MESSAGE };
}
