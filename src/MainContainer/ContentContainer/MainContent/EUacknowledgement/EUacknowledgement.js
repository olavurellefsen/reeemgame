import React from 'react'
import { Container, Flag, Text } from './EUacknowledgement.style'
import { useTranslation } from 'react-i18next'

export const EUacknowledgement = () => {
  const { t, i18n } = useTranslation()
  return (
    <Container>
      <Flag src={`euflag.png`} alt="EU flag" />
      <Text>{t('euAcknowledgement')}</Text>
    </Container>
  )
}
