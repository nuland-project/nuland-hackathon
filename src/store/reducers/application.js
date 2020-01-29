import createReducer from '../../utils/createReducer';
import * as ActionTypes from '../../actions/types';
import { Screens } from '../../constants';

// Initial state
const initialState = {  
  // This array represents stack of screens 
  navStack: [ Screens.SCREEN1 ]
}

export const application = createReducer(initialState, {
  // Add new screen name in appropriate array
  [ActionTypes.SCREEN_PUSH](state, action) {
    // Deep copy of state
    newState = JSON.parse(JSON.stringify(state));

    // Apply state changes
    newState.navStack.push(action.screen);

    // Update store
    return newState;
  },

  // Remove top screen from the stake
  [ActionTypes.SCREEN_POP](state) {
    // Deep copy of state
    newState = JSON.parse(JSON.stringify(state));

    // Apply state changes
    newState.navStack.pop();

    // Update store
    return newState;
  },

  // Replace last screen by new one
  [ActionTypes.SCREEN_POP_PUSH](state, action) {
    let length = state.navStack.length;
    
    // Deep copy of state
    newState = JSON.parse(JSON.stringify(state));
    
    // Apply state changes
    newState.navStack[length - 1] = action.screen;

    // Update store
    return newState;
  }
})