import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const middlewares = [
    thunkMiddleware,
    loggerMiddleware
  ];

  const enhancer = composeWithDevTools(
    applyMiddleware(...middlewares)    
  );  

  const store = createStore(reducer, initialState, enhancer);
  
  return store;
}

export const store = configureStore({});
