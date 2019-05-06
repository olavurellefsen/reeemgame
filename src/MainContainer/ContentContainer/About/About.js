import React from 'react'
import { Container } from './About.style'
import { Page } from '../../PageRenderer'
import about from '../../../Markdown/about.en.md'

export const About = () => (
  <Container>
    <Page markdownFile={about} />
  </Container>
)
