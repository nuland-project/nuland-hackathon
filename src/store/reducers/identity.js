import createReducer from '../../utils/createReducer';
import * as ActionTypes from '../../actions/types';

// Initial state
const initialState = {
  balance: 100,
  karma: 50
}

// Actions processed by identity store are listed below
export const identity = createReducer(initialState, { 
  // Update balance
  [ActionTypes.BALANCE_UPD](state, action) {
    return Object.assign({}, state, {
        balance: action.payload
      });
  },
  // Increment/decrement of karma
  [ActionTypes.KARMA_CHANGE](state, action) {
    // Compute new value of karma
    let newKarma = state.karma + action.payload;
    if (newKarma < 0) newKarma = 0;

    // Update store
    let newState = JSON.parse(JSON.stringify(state));
    newState.karma = newKarma;
    return newState;
  }
});
