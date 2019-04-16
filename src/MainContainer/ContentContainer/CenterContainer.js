import React from "react";

import { Switch, Route, Router } from "react-router-dom";
import { Score } from "./Score";
import { About } from "./About";
import { MainContent } from "./MainContent/MainContent";

export const CenterContainer = () => (
  <Router>
    <Switch>
      <Route path="/" component={MainContent} />
      <Route path="/score" component={Score} />
      <Route path="/about" component={About} />
    </Switch>
  </Router>
);
