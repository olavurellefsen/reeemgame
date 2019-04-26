import React, { useContext } from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Context from '../../../../Context/Context'

export const IndicatorContainer = () => {
  const [state, dispatch] = useContext(Context)
  const availableIndicators = ['Electricity demands', 'Emission Limit']
  return (
    <MenuList>
      {availableIndicators.map((indicator, i) => (
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
          <ListItemText primary={indicator} />
        </MenuItem>
      ))}
    </MenuList>
  )
}
