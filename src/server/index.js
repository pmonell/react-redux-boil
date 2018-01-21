import express from 'express'
import React from 'react'
import { match, createMemoryHistory, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from '../shared/createStore'
import routes from '../shared/routes'
import { initHTML } from './initHTML'

const app = express()

app.use(express.static('dist'))

app.use((request, response) => {
  if (request.url == '/favicon.ico') {
    response.status('404')
  }

  const memoryHistory = createMemoryHistory()
  const store = createStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  function matchLocation(location) {
    match({ routes, location }, (err, redirectLocation, renderProps) => {
      if (redirectLocation) {
        return matchLocation(redirectLocation)
      }
      if (err) {
        // internal error
        response.status('500').send('Internal Server Error Occured')
        return
      }
      if (!renderProps) {
        // page not found error
        response.status('404').send('Page Not Found')
        return
      }

      // create component
      const initialComponent = (
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )

      const initialState = store.getState()
      const HTML = initHTML(initialState, renderToString(initialComponent))
      response.send(HTML)
    })
  }

  matchLocation(request.url)
})

export { app }
