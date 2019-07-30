import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Context from '../../../../Context/Context'
import { Container, SubMenu } from './Indicator.style'

export const IndicatorContainer = () => {
  const [state, dispatch] = useContext(Context)
  const [electricityMenuOpen, setElectricityMenuOpen] = useState(false)
  const { t } = useTranslation()
  const electricityIndicators = [
    'coal',
    'oil',
    'naturalGas',
    'nuclear',
    'waste',
    'biomass',
    'bioFuel',
    'hydro',
    'wind',
    'solar',
    'geothermal',
    'ocean',
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
        {t('indicator.electricityGenerationBySource')}
      </MenuItem>
      {electricityMenuOpen && (
        <SubMenu>
          <MenuList>
            {electricityIndicators.map(function(indicator, i) {
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
