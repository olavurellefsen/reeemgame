import styled from 'styled-components'
import Button from '@material-ui/core/Fab'

export const PlayButtonContainer = styled.div`
  min-width: 110px;
  max-width: 110px;
  padding: 25px 25px 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
export const PlayPauseButton = styled(Button)`
  width: 40px;
`
