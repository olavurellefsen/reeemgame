import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, ShareButton, ShareButtonsContainer } from './Share.style'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { FacebookIcon } from 'react-share'
import { FacebookShareButton } from 'react-share'

export const Share = () => {
  const [open, setOpen] = React.useState(false)

  function handleClick() {
    setOpen(!open)
  }

  function handleClose() {
    setOpen(false)
  }
  return (
    <Container>
      <ShareButton onClick={handleClick}>SHARE</ShareButton>
      {open && (
        <ShareButtonsContainer>
          <FacebookShareButton
            url={
              'http://reeem-pathways-staging.s3-website-eu-west-1.amazonaws.com/'
            }
            quote={'Can you beat my score?'}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </ShareButtonsContainer>
      )}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Share Game</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  )
}

//https://www.npmjs.com/package/react-share
