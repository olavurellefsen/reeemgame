import React from 'react'
import { Container, Row, Cell, Table, TextContainer } from './Score.style'

export const Score = () => {
  var scoreList = JSON.parse(localStorage.getItem('score'))
  return (
    <Container>
      <Table data-testid="scoreTable">
        <Row index={0}>
          <Cell>
            <TextContainer>Date</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>Economic</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>Environmental</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>Social</TextContainer>
          </Cell>
          <Cell>
            <TextContainer>Sum</TextContainer>
          </Cell>
        </Row>
        <>
          {scoreList && scoreList.length > 0
            ? scoreList.map((s, i) => (
                <Row key={i} index={1 + i}>
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
