import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Score } from "./Score";
import { About } from "./About";
import { MainContent } from "./MainContent/MainContent";

export const ContentContainer = () => (
  <Router>
    <Switch>
      <Route path="/score" component={Score} />
      <Route path="/about" component={About} />
      <Route path="/" component={MainContent} />
    </Switch>
  </Router>
);
