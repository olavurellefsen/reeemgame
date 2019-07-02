import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import {
  Container,
  IntroText,
  ScoreText,
  CurrentScoreText,
} from './ScoreContainer.style'
import { useTranslation } from 'react-i18next'

export const ScoreContainer = ({ currentScore, currentDecision }) => {
  const [counterScore, setCounterScore] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (counterScore < currentScore) {
        setCounterScore(counter => counter + 1)
      }
      if (counterScore > currentScore) {
        setCounterScore(counter => counter - 1)
      }
    }, 10)
    return () => {
      clearInterval(interval)
    }
  }, [counterScore, currentScore])
  const { t } = useTranslation()
  return (
    <Container>
      {currentDecision === '2050' && (
        <>
          <IntroText>{t('score.intro-final')}</IntroText>
          <ScoreText>
            <CurrentScoreText>{counterScore}</CurrentScoreText> / 100
          </ScoreText>
          <IntroText>{t('score.intro-2')}</IntroText>
        </>
      )}
      {currentDecision !== '2050' && (
        <>
          <IntroText vagueColor={true}>{t('score.intro-1')}</IntroText>
          <ScoreText>
            <CurrentScoreText>{counterScore}</CurrentScoreText> / 100
          </ScoreText>
          <IntroText vagueColor={true}>{t('score.intro-2')}</IntroText>
        </>
      )}
    </Container>
  )
}

ScoreContainer.propTypes = {
  currentScore: PropTypes.number.isRequired,
  currentDecision: PropTypes.string.isRequired,
}
