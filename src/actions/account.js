import * as ActionTypes from './types';

export const accountActions = {
  changeKarma: (delta) => ({
    type: ActionTypes.KARMA_CHANGE,
    payload: delta
  }),
  updateBalance: (newBalance) => ({
    type: ActionTypes.BALANCE_UPD,
    payload: newBalance
  })
}