import React from "react";

import { Switch, Route } from "react-router-dom";
import { Score } from "./Score";
import { About } from "./About";
import { MainContent } from "./MainContent/MainContent";

export const ContentContainer = () => (
  <Switch>
    <Route path="/score" component={Score} />
    <Route path="/about" component={About} />
    <Route exact={true} path="/" component={MainContent} />
  </Switch>
);
