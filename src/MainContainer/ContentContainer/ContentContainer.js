import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Score } from './Score/Score'
import { About } from './About/About'
import { MainContent } from './MainContent/MainContent'
import { SharedPage } from './MainContent/SharedPage'

export const ContentContainer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return(
    <Routes>
      <Route
        exact={true}
        path={`/`}
        element={<MainContent weights={Object.fromEntries(searchParams.entries())} />}
      />
      <Route path={`/score`} element={<Score />} />
      <Route path={`/about`} element={<About />} />
      <Route
        path={`/shared`}
        element={<SharedPage sharedValues={Object.fromEntries(searchParams.entries())} />}
      />
    </Routes>
  )
}