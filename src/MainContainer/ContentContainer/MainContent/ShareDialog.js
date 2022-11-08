import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Context from '../../../Context/Context'
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
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share'
import { Link } from '@mui/icons-material'
import { PropTypes } from 'prop-types'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'

export const ShareDialog = props => {
  const [state] = useContext(Context)
  const [dialogOpen, setDialogOpen] = React.useState(props.open)
  const { t } = useTranslation()

  function handleClose() {
    setDialogOpen(false)
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
          <CopyToClipboard
            text={buildURL()}
            onCopy={() => this.setState({ copied: true })}
          >
            <DialogButton color="black">Copy to clipboard</DialogButton>
          </CopyToClipboard>
          <DialogButton onClick={handleClose} color="black">
            {t('share.closeDialog')}
          </DialogButton>
        </DialogActions>
      </DialogContentContainer>
    </Dialog>
  )
}
ShareDialog.propTypes = {
  open: PropTypes.bool,
}
