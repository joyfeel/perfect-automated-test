import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import '../css/main.scss'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
