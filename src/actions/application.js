import * as ActionTypes from './types';

export const applicationActions = {
  screenPush: (screen) => ({
    type: ActionTypes.SCREEN_PUSH,
    screen
  }),
  screenPop: () => ({
    type: ActionTypes.SCREEN_POP
  }),
  screenPopPush: (screen) => ({
    type: ActionTypes.SCREEN_POP_PUSH,
    screen
  })
}
