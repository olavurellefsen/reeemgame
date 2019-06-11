import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Context from './../../../Context/Context'
import {
  Container,
  ShareButton,
  ShareButtonsContainer,
  ShareLinkButton,
} from './Share.style'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { FacebookIcon } from 'react-share'
import { FacebookShareButton } from 'react-share'

export const Share = () => {
  const [state] = useContext(Context)
  const [open, setOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  function handleClick() {
    setOpen(!open)
  }

  function handleClose() {
    setDialogOpen(false)
  }

  function handleClickShareLink() {
    setDialogOpen(!dialogOpen)
  }
  const buildURL = () => {
    return (
      window.location.href +
      'shared/?eco=' +
      state.weights.eco +
      '&soc=' +
      state.weights.soc +
      '&env=' +
      state.weights.env +
      '&score=' +
      state.weightedScores.sum
    )
  }
  return (
    <Container>
      <ShareButton onClick={handleClick}>SHARE</ShareButton>
      {open && (
        <ShareButtonsContainer>
          <FacebookShareButton
            url={buildURL()}
            quote={'Can you beat my score?'}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <ShareLinkButton onClick={handleClickShareLink}>Link</ShareLinkButton>
        </ShareButtonsContainer>
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Share Game</DialogTitle>
        <DialogContent>
          <DialogContentText>{buildURL()}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
