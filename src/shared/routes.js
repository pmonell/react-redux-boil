import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Dash from './containers/Dash'

export default (
  <Route component={App}>
    <Route path="/" component={Dash} />
  </Route>
)
