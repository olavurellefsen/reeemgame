import React from 'react'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

export const CountryPopup = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorPosition, setAnchorPosition] = React.useState(null)

  //function handleClick(event) {
  //  setAnchorEl(event.currentTarget)
  //  setAnchorPosition({ left: event.clientX, top: event.clientY })
  //}

  function handleClose() {
    setAnchorEl(null)
    setAnchorPosition(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : null

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorPosition={anchorPosition}
      anchorReference={'anchorPosition'}
    >
      <Typography>The content of the Popover.</Typography>
    </Popover>
  )
}
