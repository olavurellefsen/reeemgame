import React from 'react'
import { PropTypes } from 'prop-types'
import { Container, Country } from './CountryPopup.style'

export const CountryPopup = props => {
  function close() {
    setTimeout(function() {
      props.onClose()
    }, 300)
  }
  return (
    <Container onMouseLeave={() => close()}>
      <Country>{props.country}</Country>
    </Container>
  )
}

CountryPopup.propTypes = {
  country: PropTypes.any,
  onClose: PropTypes.func,
}
