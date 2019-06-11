import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`

export const TextContainer = styled.div`
  display: flex;
  padding: 5px;
`
export const StyledButton = styled.button`
  margin:10px
  display: flex;
  background-color: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }
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
