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
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: 200;
  display: flex;
  padding: 0px;
  color: gray;
`

export const HeaderMenuItemLink = styled(Link)`
  font-family: 'Roboto', sans-serif;
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

export const Divider = styled.div`
  border-right: thin solid white;
  height: 100%;
`
