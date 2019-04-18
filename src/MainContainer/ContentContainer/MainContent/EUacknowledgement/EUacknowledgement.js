import React from 'react'
import { Container, Flag, Text } from './EUacknowledgement.style'

export const EUacknowledgement = () => {
  return (
    <Container>
      <Flag src="/eu-flag.png" alt="eu-flag" />
      <Text>
        This project has received funding from the European Union’s Horizon 2020
        research and innovation programme under grant agreement No 691739.
      </Text>
    </Container>
  )
}
