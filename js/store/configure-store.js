import { createStore, applyMiddleware, combineReducers } from 'redux'
import store from '../reducers'
import thunkMiddleware from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'

function configureStore(history, initialState) {
  return createStore(
    combineReducers({
      store,
      routing: routerReducer
    }),
    initialState,
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    )
  )
}

export default configureStore