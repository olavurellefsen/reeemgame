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
  LinkContainer,
  CopyToClipboardBtn,
} from './Share.style'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share'
import { Link } from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

export const Share = () => {
  const [state] = useContext(Context)
  const [open, setOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [tooltipOpen, setTooltipOpen] = React.useState(false)
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
  function handleTooltipClose() {
    setTooltipOpen(false)
  }

  const buildURL = () => {
    return (
      window.location.origin +
      '/shared?' +
      'scenario=' +
      state.selectedScenario +
      '&eco=' +
      state.weights.eco +
      '&soc=' +
      state.weights.soc +
      '&env=' +
      state.weights.env
    )
  }
  return (
    <Container>
      <ShareButton onClick={handleClick}>{t('share.share')}</ShareButton>
      {open && (
        <ShareButtonsContainer>
          <SocialMediaBtn>
            <FacebookShareButton
              url={buildURL()}
              quote={t('share.facebookQuote')}
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </SocialMediaBtn>
          <SocialMediaBtn>
            <TwitterShareButton
              url={buildURL()}
              title={t('share.twitterTitle')}
            >
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
              <Link />
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
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <React.Fragment>
            <DialogHeader id="alert-dialog-slide-title">
              {t('share.dialogTitle')}
            </DialogHeader>
            <DialogContentContainer>
              <DialogContent>
                <DialogText id="alert-dialog-slide-description">
                  {t('share.shareDialogText')}
                </DialogText>
                <LinkContainer>
                  <DialogTextField
                    autoFocus={false}
                    value={buildURL()}
                    variant="outlined"
                    readOnly={true}
                  />
                  <Tooltip
                    title={t('share.tooltipCopyText')}
                    placement="top"
                    open={tooltipOpen}
                  >
                    {/* <CopyToClipboard
                      text={buildURL()}
                      onCopy={() => showTooltip()}
                      onClose={handleTooltipClose}
                    > */}
                      <CopyToClipboardBtn color="black">
                        {t('share.copyToClipboard')}
                      </CopyToClipboardBtn>
                    {/* </CopyToClipboard> */}
                  </Tooltip>
                </LinkContainer>
              </DialogContent>
              <DialogActions>
                <DialogButton onClick={handleClose} color="black">
                  {t('share.closeDialog')}
                </DialogButton>
              </DialogActions>
            </DialogContentContainer>
          </React.Fragment>
        </ClickAwayListener>
      </Dialog>
    </Container>
  )
}
