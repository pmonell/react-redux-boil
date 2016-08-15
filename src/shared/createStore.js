import { applyMiddleware, createStore as _createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { rootReducer } from './reducers'

export const createStore = (history, initialState={}) => {
  const reduxRouterMiddleware = routerMiddleware(history)
  const middlewares = [ thunk, reduxRouterMiddleware ]

  let configureStore = applyMiddleware(...middlewares)(_createStore)
  const reducer = rootReducer
  const store = configureStore(reducer, initialState)

  return store
}
