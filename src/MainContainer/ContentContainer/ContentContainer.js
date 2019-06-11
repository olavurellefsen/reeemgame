import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Score } from './Score/Score'
import { About } from './About/About'
import { MainContent } from './MainContent/MainContent'
import { SharedPage } from './MainContent/SharedPage'

const queryString = require('query-string')

export const ContentContainer = () => (
  <Switch>
    <Route
      exact={true}
      path={`/`}
      component={({ location }) => (
        <MainContent weights={queryString.parse(location.search)} />
      )}
    />
    <Route path={`/score`} component={Score} />
    <Route path={`/about`} component={About} />
    <Route
      path={`/shared`}
      component={({ location }) => (
        <SharedPage sharedValues={queryString.parse(location.search)} />
      )}
    />
  </Switch>
)
