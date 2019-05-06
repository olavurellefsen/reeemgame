import React from 'react'
import ReactDOM from 'react-dom'
import ContextStore from './Context/ContextStore'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import './i18n'

ReactDOM.render(
  <ContextStore>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextStore>,
  document.getElementById('root')
)
