import React from "react";
import { Container, LeftMenuItem } from "./LeftContainer.style";

export const LeftContainer = () => (
  <Container>
    <LeftMenuItem>Electricity demands</LeftMenuItem>
    <LeftMenuItem>Demand Profile</LeftMenuItem>
    <LeftMenuItem>Technology Performance</LeftMenuItem>
    <LeftMenuItem>Technology Cost</LeftMenuItem>
    <LeftMenuItem>Generation constraints</LeftMenuItem>
    <LeftMenuItem>Emission constraints</LeftMenuItem>
  </Container>
);
