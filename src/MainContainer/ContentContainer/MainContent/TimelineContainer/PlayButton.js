import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Fab'
import { PlayButtonContainer, ButtonGroup } from './PlayButton.style'
import { FastForward, PlayArrow, Pause } from '@material-ui/icons'

export const PlayButton = ({ onStartPause, onFastForward, animationState }) => {
  const style = {
    boxShadow: 'none',
    margin: '2px',
  }
  return (
    <PlayButtonContainer>
      <Button style={style} onClick={onStartPause} size="small">
        {animationState === 'paused' ? <PlayArrow /> : <Pause />}
      </Button>

      {animationState === 'paused' ? null : (
        <Button style={style} onClick={onFastForward} size="small">
          <ButtonGroup>
            {animationState === 'fast' ? <PlayArrow /> : <FastForward />}
          </ButtonGroup>
        </Button>
      )}
    </PlayButtonContainer>
  )
}
PlayButton.propTypes = {
  onStartPause: PropTypes.func,
  onFastForward: PropTypes.func,
  animationState: PropTypes.string,
}
