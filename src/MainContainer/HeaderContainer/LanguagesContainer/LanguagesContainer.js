import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import { Container, Icon, Menu, TextContainer } from './Languages.style'
import Grow from '@mui/material/Grow'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { Public, ExpandLess, ExpandMore } from '@mui/icons-material'

export const Languages = () => {
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const changeLanguage = (e, language) => {
    e.preventDefault()
    if (currentLanguage !== language) {
      switch (language) {
        case 'en':
          i18n.changeLanguage('en')
          break
        case 'de':
          i18n.changeLanguage('de')
          break
        case 'dk':
          i18n.changeLanguage('dk')
          break
        case 'fo':
          i18n.changeLanguage('fo')
          break
        default:
          break
      }
    }
    closeMenu(e)
  }
  var lanugageTitle = ''
  switch (currentLanguage) {
    case 'en':
      lanugageTitle = 'English'
      break
    case 'de':
      lanugageTitle = 'Deutsch'
      break
    case 'dk':
      lanugageTitle = 'Dansk'
      break
    case 'fo':
      lanugageTitle = 'Føroyskt'
      break
    default:
      break
  }

  function toggleMenu() {
    setOpen(!open)
  }

  function closeMenu(event) {
    if (anchorEl.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }
  const anchorEl = React.useRef(null)
  const style = {
    textTransform: 'none',
    display: 'flex',
    color: 'white',
    backgroundColor: 'transparent',
    marginTop: '0',
  }
  return (
    <Container>
      <Button
        ref={anchorEl}
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        style={style}
      >
        <Icon>
          <Public />
        </Icon>
        {lanugageTitle}
        <Icon>
          {open && <ExpandLess />}
          {!open && <ExpandMore />}
        </Icon>
      </Button>
      <Popper open={open} anchorEl={anchorEl.current} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Menu>
              <ClickAwayListener onClickAway={closeMenu}>
                <MenuList>
                  {currentLanguage !== 'en' && (
                    <MenuItem
                      key={'enMenuItem'}
                      onClick={e => changeLanguage(e, 'en')}
                    >
                      <TextContainer>English</TextContainer>
                    </MenuItem>
                  )}
                  {currentLanguage !== 'de' && (
                    <MenuItem
                      key={'foMenuItem'}
                      onClick={e => changeLanguage(e, 'de')}
                    >
                      <TextContainer>Deutsch</TextContainer>
                    </MenuItem>
                  )}
                  {currentLanguage !== 'fo' && (
                    <MenuItem
                      key={'foMenuItem'}
                      onClick={e => changeLanguage(e, 'fo')}
                    >
                      <TextContainer>Føroyskt</TextContainer>
                    </MenuItem>
                  )}
                  {currentLanguage !== 'dk' && (
                    <MenuItem
                      key={'dkMenuItem'}
                      onClick={e => changeLanguage(e, 'dk')}
                    >
                      <TextContainer>Dansk</TextContainer>
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Menu>
          </Grow>
        )}
      </Popper>
    </Container>
  )
}
