import React from "react";
import { Container } from "./MainContainer.style";
import { Header } from "./HeaderContainer/Header";
import { ContentContainer } from "./ContentContainer/ContentContainer";

export const MainContainer = () => (
  <Container>
    <Header />
    <ContentContainer />
  </Container>
);
