import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Fab'
import { PlayButtonContainer, Text, ButtonGroup } from './PlayButton.style'
import { FastForward, PlayArrow, Pause } from '@material-ui/icons'

export const PlayButton = ({ onStartPause, onFastForward, animationState }) => {
  return (
    <PlayButtonContainer>
      <Button onClick={onStartPause} size="small">
        {animationState === 'paused' ? <PlayArrow /> : <Pause />}
      </Button>

      {animationState === 'paused' ? null : (
        <Button onClick={onFastForward} size="small">
          <ButtonGroup>
            <FastForward />
          </ButtonGroup>
        </Button>
      )}
    </PlayButtonContainer>
  )
}
PlayButton.propTypes = {
  onStartPause: PropTypes.func,
  onFastForward: PropTypes.func,
  animationState: PropTypes.func,
}
