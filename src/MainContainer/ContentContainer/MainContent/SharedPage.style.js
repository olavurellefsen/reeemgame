import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`

export const TextContainer = styled.div`
  display: flex;
  padding: 5px 5px 20px 20px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
`

export const IntroText = styled.div`
  display: flex;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  padding-bottom: 20px;
  line-height: 1.6;
`

export const Header = styled.h1`
  padding-left: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 800;
`

export const StyledButton = styled(Button)`
  margin-left: 20px;
`

export const LinkButton = styled(Link)`
  font-family: 'Roboto', sans-serif;
  padding: 8px 8px 8px 20px;
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
