import React from 'react'
import { PropTypes } from 'prop-types'
import { PlayButtonContainer, PlayPauseButton } from './PlayButton.style'
import { FastForward, PlayArrow, Pause } from '@material-ui/icons'

export const PlayButton = ({ onStartPause, onFastForward, animationState }) => {
  return (
    <PlayButtonContainer>
      {animationState === 'paused' ? null : (
        <PlayPauseButton onClick={onFastForward} size="small">
          <FastForward />
        </PlayPauseButton>
      )}
      <PlayPauseButton onClick={onStartPause} size="small">
        {animationState === 'paused' ? <PlayArrow /> : <Pause />}
      </PlayPauseButton>
    </PlayButtonContainer>
  )
}

PlayButton.propTypes = {
  onStartPause: PropTypes.func.isRequired,
  onFastForward: PropTypes.func.isRequired,
  animationState: PropTypes.string.isRequired,
}
