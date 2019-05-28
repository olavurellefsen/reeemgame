import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0px 20px 20px 20px;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: column;
`

export const Page = p => {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch(p.markdownFile)
      .then(response => response.text())
      .then(text => {
        setContent(text)
      })
  }, [])

  return (
    <Container>
      <ReactMarkdown source={content} escapeHtml={false} />
    </Container>
  )
}
