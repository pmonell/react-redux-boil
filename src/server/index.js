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

app.use((req, res) => {
  const memoryHistory = createMemoryHistory()
  const store = createStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ routes: routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      // internal error
      res.status('500').send('Internal Server Error Occured')
    }
    if (!renderProps) {
      // page not found error
      res.status('404').send('Page Not Found')
    }
    
    const initialComponent = (
      <Provider store={store}>
        <RouterContext {...renderProps}/>
      </Provider>
    )

    const initialState = store.getState()
    const initialHtml = initHTML(initialState, renderToString(initialComponent))
    res.send(initialHtml)
  })
})

export { app }
