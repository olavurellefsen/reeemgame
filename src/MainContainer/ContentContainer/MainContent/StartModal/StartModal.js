import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Chart from 'react-google-charts'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ModalDetails } from './StartModal.style'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function StartModal({ open, onClose, weights }) {
  const { t } = useTranslation()

  function handleClose() {
    onClose()
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {t('startmodal.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {t('startmodal.intro')}
        </DialogContentText>
        <Chart
          chartType="PieChart"
          data={[
            [t('startmodal.group'), t('startmodal.percentage')],
            [t('score.economic.long'), weights.eco],
            [t('score.social.long'), weights.soc],
            [t('score.environmental.long'), weights.env],
          ]}
          width={'280px'}
          height={'250px'}
          options={{
            chartArea: { left: '5%', top: '5%', width: '90%', height: '90%' },
            backgroundColor: { fill: 'transparent' },
            legend: { position: 'right', alignment: 'center' },
          }}
        />
        <DialogContentText id="alert-dialog-slide-description">
          <ModalDetails>{t('startmodal.details')}</ModalDetails>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button onClick={handleClose} color="default" size="large">
          CLOSE
        </button>
      </DialogActions>
    </Dialog>
  )
}

StartModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  weights: PropTypes.object,
}
