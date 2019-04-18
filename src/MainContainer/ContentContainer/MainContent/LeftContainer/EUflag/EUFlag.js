import React from 'react'
import { Container, Flag, Text } from './EUFlag.style'

export const EUflag = () => {
  return (
    <Container>
      <Flag src="/EU-flag.png" alt="eu-flag" />
      <Text>
        This project has received funding from the European Union’s Horizon 2020
        research and innovation programme under grant agreement No 691739.
      </Text>
    </Container>
  )
}
