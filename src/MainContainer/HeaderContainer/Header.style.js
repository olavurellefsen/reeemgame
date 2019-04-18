import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  background-image: linear-gradient(gray, black);
  justify-content: space-between;
  min-height: 80px;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
`
export const TextContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400');
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  display: flex;
  padding: 10px;
  color: white;
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
  margin-right: 20px;
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
