import React from 'react'
import ReactDOM from 'react-dom'
import ContextStore from './Context/ContextStore'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from './theme'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  // Define a custom insertion for injecting the JSS styles in the DOM
  insertionPoint: document.getElementById('jss-insertion-point'),
})

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ContextStore>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextStore>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('root')
)
