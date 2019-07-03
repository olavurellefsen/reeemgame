import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, TryAgainButton } from './TryAgain.style'
import Context from './../../../../Context/Context'

export const TryAgain = () => {
  const [state, dispatch] = useContext(Context)
  const { t } = useTranslation()

  const handleClick = e => {
    e.preventDefault()
    dispatch({
      type: 'forwardToNextDecision',
    })
    if (state.gameState === 'over') {
      //Reset weights when clicking "try again"
      dispatch({
        type: 'setWeights',
        weights: {},
      })
    }
  }

  return (
    <Container>
      <TryAgainButton onClick={handleClick}>
        {t('decisions.tryAgain')}
      </TryAgainButton>
    </Container>
  )
}
