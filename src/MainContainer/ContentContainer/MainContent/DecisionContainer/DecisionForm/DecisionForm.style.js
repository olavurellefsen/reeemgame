import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'

export const DecisionHeader = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 800;
`

export const IntroText = styled.div`
  font-family: 'Roboto', sans-serif;
  padding-bottom: 20px;
  line-height: 1.6;
  white-space: pre-wrap;
`

export const StyledButton = styled(({ ...props }) => (
  <Button {...props} classes={{ disabled: 'disabled' }} />
))`
  padding: 0px 30px;
  &.disabled {
    color: #999955;
  }
`

export const StyledRadio = styled(Radio)`
  padding: 8px 12px;
`

export const StyledFormControlLabel = styled(FormControlLabel)``

export const StyledFormLabel = styled(FormLabel)`
  color: black;
  font-weight: 700;
  padding-top: 20px;
  line-height: 24px;
`

export const StyledGrid = styled(Grid)``
