import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import Context from './../../../Context/Context'
import {
  Container,
  ShareButton,
  ShareButtonsContainer,
  ShareLinkButton,
  DialogHeader,
  DialogText,
  DialogTextField,
  DialogButton,
  DialogContentContainer,
  SocialMediaBtn,
} from './Share.style'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

export const Share = () => {
  const [state] = useContext(Context)
  const [open, setOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { t } = useTranslation()

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
      'shared?eco=' +
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
          <SocialMediaBtn>
            <FacebookShareButton
              url={buildURL()}
              quote={'Can you beat my score?'}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </SocialMediaBtn>
          <SocialMediaBtn>
            <TwitterShareButton url={buildURL()} title={'ReeemGame'}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </SocialMediaBtn>
          <SocialMediaBtn>
            <LinkedinShareButton url={buildURL()}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
          </SocialMediaBtn>
          <SocialMediaBtn>
            <ShareLinkButton onClick={handleClickShareLink}>
              Link
            </ShareLinkButton>
          </SocialMediaBtn>
        </ShareButtonsContainer>
      )}
      <Dialog
        open={dialogOpen}
        keepMounted
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth={true}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogHeader id="alert-dialog-slide-title">
          {t('share.dialogTitle')}
        </DialogHeader>
        <DialogContentContainer>
          <DialogContent>
            <DialogText id="alert-dialog-slide-description">
              {t('share.shareDialogText')}
            </DialogText>
            <DialogTextField
              autoFocus={false}
              value={buildURL()}
              variant="outlined"
              readOnly={true}
            />
          </DialogContent>
          <DialogActions>
            <DialogButton onClick={handleClose} color="black">
              {t('share.closeDialog')}
            </DialogButton>
          </DialogActions>
        </DialogContentContainer>
      </Dialog>
    </Container>
  )
}
