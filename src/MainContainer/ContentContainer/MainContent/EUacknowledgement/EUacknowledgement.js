import React from 'react'
import { Container, Flag, Text } from './EUacknowledgement.style'
import { useTranslation } from 'react-i18next'

export const EUacknowledgement = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Flag src={window.location.origin + '/euflag.png'} alt="EU flag" />
      <Text>{t('euAcknowledgement')}</Text>
    </Container>
  )
}
