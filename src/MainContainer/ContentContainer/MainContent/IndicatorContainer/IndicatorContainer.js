import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Context from '../../../../Context/Context'
import { Container, SubMenu } from './Indicator.style'

export const IndicatorContainer = () => {
  const [state, dispatch] = useContext(Context)
  const [electricityMenuOpen, setElectricityMenuOpen] = useState(true)
  const { t } = useTranslation()
  const keyPerformanceIndicators = [
    'co2Intensity',
    'discountedInvestment',
    'lcoe',
  ]
  const scoreIndicator = 'score'
  return (
    <Container>
      <MenuItem
        onClick={() => {
          setElectricityMenuOpen(!electricityMenuOpen)
        }}
        selected={electricityMenuOpen}
      >
        {t('indicator.keyPerformanceIndicators')}
      </MenuItem>
      {electricityMenuOpen && (
        <SubMenu>
          <MenuList>
            {keyPerformanceIndicators.map(function(indicator, i) {
              var indicatorTitle = t('indicator.' + indicator)
              return (
                <MenuItem
                  key={i}
                  onClick={() => {
                    let newIndicator = indicator
                    if (indicator === state.selectedIndicator) {
                      newIndicator = null
                    }
                    dispatch({
                      type: 'setSelectedIndicator',
                      name: newIndicator,
                    })
                  }}
                  selected={indicator === state.selectedIndicator}
                >
                  <ListItemText primary={indicatorTitle} />
                </MenuItem>
              )
            })}
          </MenuList>
        </SubMenu>
      )}
      <MenuList>
        {state.gameState === 'over' && (
          <MenuItem
            key={'score'}
            onClick={() => {
              let newIndicator = scoreIndicator
              if (scoreIndicator === state.selectedIndicator) {
                newIndicator = null
              }
              dispatch({
                type: 'setSelectedIndicator',
                name: newIndicator,
              })
            }}
            selected={scoreIndicator === state.selectedIndicator}
          >
            <ListItemText primary={t('general.score')} />
          </MenuItem>
        )}
      </MenuList>
    </Container>
  )
}
