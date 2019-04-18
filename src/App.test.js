import React from 'react'
import { render, cleanup } from 'test-utils'
import App from './App'
afterEach(cleanup)

it('should render correctly', () => {
  const { container } = render(<App />)
  expect(container).toMatchSnapshot()
})
