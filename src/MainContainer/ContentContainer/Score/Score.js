import React from 'react'
import { Container, Row, Cell, Table, TextContainer } from './Score.style'
import { useTranslation } from 'react-i18next'

export const Score = () => {
  const { t, i18n } = useTranslation()
  var scoreList = JSON.parse(localStorage.getItem('score'))
  return (
    <Container>
      <Table data-testid="scoreTable">
        <Row index={0}>
          <Cell>
            <TextContainer>{t('score.date')}</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>{t('goal.economic')}</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>{t('goal.environmental')}</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>{t('goal.social')}</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>{t('score.sum')}</TextContainer>
          </Cell>
        </Row>
        <>
          {scoreList.length > 0
            ? scoreList.map((s, i) => (
                <Row index={1 + i}>
                  <Cell>
                    <TextContainer>{s.date}</TextContainer>
                  </Cell>
                  <Cell>
                    <TextContainer>{s.weightedScores.eco}</TextContainer>
                  </Cell>
                  <Cell>
                    <TextContainer>{s.weightedScores.env}</TextContainer>
                  </Cell>
                  <Cell>
                    <TextContainer>{s.weightedScores.soc}</TextContainer>
                  </Cell>
                  <Cell>
                    <TextContainer>{s.weightedScores.sum}</TextContainer>
                  </Cell>
                </Row>
              ))
            : null}
        </>
      </Table>
    </Container>
  )
}
