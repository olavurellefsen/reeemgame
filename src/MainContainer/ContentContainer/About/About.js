import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from './About.style'
import { Page } from '../../PageRenderer'
import about_en from '../../../Markdown/about.en.md'
import about_de from '../../../Markdown/about.de.md'
import about_dk from '../../../Markdown/about.dk.md'
import about_fo from '../../../Markdown/about.fo.md'

export const About = () => {
  const { i18n } = useTranslation()
  const language = i18n.language
  var file
  switch (language) {
    case 'en':
      file = about_en
      break
    case 'de':
      file = about_de
      break
    case 'dk':
      file = about_dk
      break
    case 'fo':
      file = about_fo
      break
    default:
      file = about_en
  }
  return (
    <Container>
      <Page markdownFile={file} />
    </Container>
  )
}
