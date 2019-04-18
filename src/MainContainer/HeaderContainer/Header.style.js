import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderStyle = styled.div`
  background-image: linear-gradient(gray, black);
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0px 15px 0px;
  align-items: center;
`
export const TextContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200');
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 200;
  display: flex;
  padding: 0px;
  color: gray;
`

export const LogoContainer = styled.div`
  color: white;
`
export const HeaderMenuItem = styled.button`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400');
  font-family: 'Montserrat', sans-serif;
  display: flex;
  padding: 8px;
  margin-right: 10px;
  background-color: Transparent;
  border: none;
  color: white;
  :hover {
    cursor: pointer;
  }
`

export const HeaderMenu = styled.div`
  display: flex;
  margin: 20px;
  align-items: center;
`

export const HeaderMenuItemLink = styled(Link)`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400');
  font-family: 'Montserrat', sans-serif;
  display: flex;
  padding: 8px;
  margin-right: 10px;
  background-color: Transparent;
  border: none;
  color: white;
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`
