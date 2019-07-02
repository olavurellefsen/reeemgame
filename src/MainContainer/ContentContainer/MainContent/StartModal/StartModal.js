import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Chart from 'react-google-charts'
import { PropTypes } from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function StartModal({ open, onClose, weights }) {
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
        {'Your point of view'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Each time you start REEEMgame, you will be assigned a point of view.
          The components of your point of view this time around are detailed
          below.
          <br />
          <br />
          You impact each of these three components with your decisions in 2020,
          2030, and 2040.
        </DialogContentText>
        <Chart
          chartType="PieChart"
          data={[
            ['Group', 'Percent'],
            ['Economic', weights.eco],
            ['Social', weights.soc],
            ['Enviromental', weights.env],
          ]}
          width={'280px'}
          height={'250px'}
          options={{
            chartArea: { left: '5%', top: '5%', width: '90%', height: '90%' },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

StartModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  weights: PropTypes.object,
}
