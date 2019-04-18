import React from 'react'
import { render, cleanup } from 'test-utils'
import { MainContainer } from './MainContainer'
afterEach(cleanup)

it('should render correctly', () => {
  const { container } = render(<MainContainer />)
  expect(container).toMatchSnapshot()
})
