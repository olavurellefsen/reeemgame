import React from "react";
import { Container } from "./MainContent.style";
import { DecisionContainer } from "./DecisionContainer";
import { GoalContainer } from "./GoalContainer";
import { MapContainer } from "./MapContainer";

export const MainContent = () => (
  <Container>
    <DecisionContainer />
    <GoalContainer />
    <MapContainer />
  </Container>
);
