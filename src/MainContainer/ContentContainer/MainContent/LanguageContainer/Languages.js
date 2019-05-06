import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Button } from './Language.style'

export const Languages = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language

  const changeLanguage = (e, language) => {
    e.preventDefault()
    if (currentLanguage !== language) {
      switch (language) {
        case 'en':
          i18n.changeLanguage('en')
          break
        case 'dk':
          i18n.changeLanguage('dk')
          break
        case 'fo':
          i18n.changeLanguage('fo')
          break
        default:
          break
      }
    }
  }

  return (
    <Container>
      <Button onClick={e => changeLanguage(e, 'en')}>English</Button>
      <Button onClick={e => changeLanguage(e, 'dk')}>Danish</Button>
      <Button onClick={e => changeLanguage(e, 'fo')}>Faroese</Button>
    </Container>
  )
}
