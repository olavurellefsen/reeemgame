import styled from 'styled-components'

export const Container = styled.div`
  padding: 30px 100px 0px 100px;
  text-align: center;
`

export const IntroText = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 0px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: ${props => (props.vagueColor ? '#7e7e82' : 'black')};
`

export const ScoreText = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 36pt;
  padding: 10px 0px;
  color: #7e7e82;
`

export const CurrentScoreText = styled.span`
  color: black;
`
