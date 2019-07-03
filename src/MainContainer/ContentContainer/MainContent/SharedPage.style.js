import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`

export const TextContainer = styled.div`
  display: flex;
  padding: 5px;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 20px;
  line-height: 1.6;
`

export const IntroText = styled.div`
  display: flex;
  padding: 5px;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 20px;
  line-height: 1.6;
`

export const Header = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 800;
`

export const StyledButton = styled.button`
  margin:10px
  display: flex;
  background-color: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }
  width: 25%;
`

export const LinkButton = styled(Link)`
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
export const StyledGrid = styled(Grid)``
