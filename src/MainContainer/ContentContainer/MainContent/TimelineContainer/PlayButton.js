import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Fab'
import { PlayButtonContainer } from './PlayButton.style'
import { FastForward, PlayArrow, Pause } from '@material-ui/icons'

export const PlayButton = ({ onStartPause, onFastForward, animationState }) => {
  return (
    <PlayButtonContainer>
      <Button onClick={onStartPause} size="small">
        {animationState === 'paused' ? <PlayArrow /> : <Pause />}
      </Button>

      {animationState === 'paused' ? null : (
        <Button onClick={onFastForward} size="small">
          <FastForward />
        </Button>
      )}
    </PlayButtonContainer>
  )
}
