import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-testing-library'
import ContextStore from '../Context/ContextStore'
import { BrowserRouter } from 'react-router-dom'
import '../i18n'

const AllTheProviders = ({ children }) => (
  <ContextStore>
    <BrowserRouter>{children}</BrowserRouter>
  </ContextStore>
)

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }

AllTheProviders.propTypes = {
  children: PropTypes.any,
}

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }
