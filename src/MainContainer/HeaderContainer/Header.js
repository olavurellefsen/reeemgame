import React from "react";
import {
  Container,
  TitleContainer,
  LogoContainer,
  HeaderMenu,
  HeaderMenuItem,
  TextContainer
} from "./Header.style";
import logo from "./REEEMlogo.transparent.1.svg";

export const Header = () => (
  <Container>
    <TitleContainer>
      <LogoContainer>
        <img src={logo} alt="logo" width={200} height={40} />
      </LogoContainer>
      <TextContainer>Game</TextContainer>
    </TitleContainer>
    <HeaderMenu>
      <HeaderMenuItem>About</HeaderMenuItem>
      <HeaderMenuItem>Score</HeaderMenuItem>
      <HeaderMenuItem>Share</HeaderMenuItem>
    </HeaderMenu>
  </Container>
);
