import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'
import { Router, browserHistory } from 'react-router'
import { createStore } from '../shared/createStore'
import routes from '../shared/routes'

let initialState = window.__INITIAL_STATE__
Object.keys(initialState).forEach(key => {
  initialState[key] = fromJS(initialState[key])
})

const store = createStore(initialState)

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
)
