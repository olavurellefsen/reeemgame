import React from "react";
import { Container, VerticalGroup } from "./MainContent.style";
import { DecisionContainer } from "./DecisionContainer";
import { GoalContainer } from "./GoalContainer";
import { MapContainer } from "./MapContainer";

export const MainContent = () => (
  <Container>
    <VerticalGroup>
      <DecisionContainer />
      <GoalContainer />
    </VerticalGroup>
    <MapContainer />
  </Container>
);
