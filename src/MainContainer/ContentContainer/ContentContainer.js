import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Score } from './Score/Score'
import { About } from './About/About'
import { MainContent } from './MainContent/MainContent'

export const ContentContainer = () => (
  <Switch>
    <Route exact={true} path={`/`} component={MainContent} />
    <Route path={`/score`} component={Score} />
    <Route path={`/about`} component={About} />
  </Switch>
)
