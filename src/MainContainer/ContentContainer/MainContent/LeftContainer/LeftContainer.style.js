import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
`;

export const LeftMenuItem = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400");
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  height: 40px;
  width: 200px;
  color: white;
  background: #2b2a2a;
  font-size: 16px;
  font-weight: light;
  text-align: left;
  border-width: 0;
  padding: 0px 0px 0px 16px;
  cursor: pointer;
  transition: color 300ms ease-in;
  margin: 2px 2px 2px 0px;
  display: flex;
  align-items: center;

  :hover {
    color: grey;
  }
`
