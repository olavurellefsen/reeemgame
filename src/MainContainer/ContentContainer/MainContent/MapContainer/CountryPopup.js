import React from 'react'
import { PropTypes } from 'prop-types'
import {
  Container,
  Country,
  Header,
  Content,
  Icon,
  Button,
} from './CountryPopup.style'
import { Close } from '@material-ui/icons'

export const CountryPopup = props => {
  return (
    <Container>
      <Header>
        <Country>{props.country}</Country>
        <Button onClick={props.onClose}>
          <Icon>
            <Close />
          </Icon>
        </Button>
      </Header>
      <Content />
    </Container>
  )
}

CountryPopup.propTypes = {
  country: PropTypes.any,
  onClose: PropTypes.func,
}
