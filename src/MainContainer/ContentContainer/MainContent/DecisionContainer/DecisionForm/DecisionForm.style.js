import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const DecisionHeader = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 800;
`

export const IntroText = styled.div`
  font-family: 'Roboto', sans-serif;
  padding-bottom: 20px;
`

export const DecisionIntroText = styled.div`
  font-family: 'Roboto', sans-serif;
  padding-top: 20px;
`

export const StyledButton = withStyles({
  root: {
    background: 'green',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '30px',
    '&:hover': {
      background: '#00a86b',
    },
  },
})(Button)
