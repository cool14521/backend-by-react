import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'MobX'
import { Provider } from 'mobx-react'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './components/App'

import appStore from './stores/appStore'

const stores = { appStore }

useStrict(true)


ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)