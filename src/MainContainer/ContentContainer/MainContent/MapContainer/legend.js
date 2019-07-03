import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  LegendStyle,
  LegendItemStyle,
  LegendItemColor,
  LegendRow,
  LegendColumn,
  LegendUnit,
  LegendUnitText,
} from './legend.style'
import { PropTypes } from 'prop-types'
import { convertToColor } from './convertToColor'

export const Legend = ({
  maxValue,
  minValue = 0,
  unit,
  title,
  size = 7,
  flipColors = false,
}) => {
  const { t } = useTranslation()

  var legendItemContent = []
  const createContent = size => {
    for (let i = 0; i < size; i++) {
      legendItemContent.push(
        ((maxValue - minValue) * (size - i - 1)) / (size - 1) + minValue
      )
    }
  }
  createContent(size)
  let unitText
  if (unit === 'MW per capita') unitText = t('map.mwPerCapita')
  else if (unit === 'Tons') unitText = t('map.tons')
  else if (unit === 'Score') unitText = t('general.score')
  return (
    <LegendStyle>
      <LegendRow>
        <LegendUnit>
          <LegendUnitText>{unitText}</LegendUnitText>
        </LegendUnit>
        <LegendColumn>
          {legendItemContent.map((e, i) => (
            <LegendItem
              key={i}
              color={
                flipColors
                  ? convertToColor(maxValue - e, minValue, maxValue)
                  : convertToColor(e, minValue, maxValue)
              }
              text={Math.round(e)}
            />
          ))}
        </LegendColumn>
      </LegendRow>
    </LegendStyle>
  )
}

Legend.propTypes = {
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  size: PropTypes.number,
  unit: PropTypes.string,
  title: PropTypes.string,
  precision: PropTypes.number,
  flipColors: PropTypes.bool,
}

const LegendItem = ({ text, color }) => {
  return (
    <LegendItemStyle>
      {text}
      <LegendItemColor color={color} />
    </LegendItemStyle>
  )
}
LegendItem.propTypes = {
  text: PropTypes.number,
  color: PropTypes.string,
}
