import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`

export const StyledButton = styled.button`
  display: flex;
  width: 100%;
  border: none;
  :hover {
    cursor: pointer;
  }
  background-color: transparent;
`
export const Icon = styled.div`
  display: flex;
  padding-right: 5px;
`
