import React from 'react'
import { IndicatorInfoStyle } from './IndicatorInfo.style'

export const IndicatorInfo = ({ visible = true, unit = 'Info', value = 1 }) =>
  visible ? (
    <IndicatorInfoStyle>
      {value} {unit}
    </IndicatorInfoStyle>
  ) : null
