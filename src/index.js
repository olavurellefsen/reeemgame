import React from 'react'
import ReactDOM from 'react-dom/client'
import ContextStore from './Context/ContextStore'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import './i18n'
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContextStore>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextStore>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
