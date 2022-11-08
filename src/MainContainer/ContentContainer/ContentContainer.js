import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Score } from './Score/Score'
import { About } from './About/About'
import { MainContent } from './MainContent/MainContent'
import { SharedPage } from './MainContent/SharedPage'

const queryString = require('query-string')

export const ContentContainer = () => {
  const location = useLocation();

  return(
  <Routes>
    <Route
      exact={true}
      path={`/`}
      element={<MainContent weights={queryString.parse(location.search)} />}
    />
    <Route path={`/score`} element={<Score />} />
    <Route path={`/about`} element={<About />} />
    <Route
      path={`/shared`}
      element={<SharedPage sharedValues={queryString.parse(location.search)} />}
    />
  </Routes>
)
}