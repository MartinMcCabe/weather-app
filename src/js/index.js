import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import WeatherApp from './containers/weatherApp'

render(
  <Provider store={ store }>
    <WeatherApp />
  </Provider>,
  document.getElementById( 'weather-app' )
)
