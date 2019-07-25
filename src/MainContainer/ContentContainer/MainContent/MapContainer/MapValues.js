import oil from '../../../../data/indicators/oil.json'
import coal from '../../../../data/indicators/coal.json'
import naturalGas from '../../../../data/indicators/naturalGas.json'
import nuclear from '../../../../data/indicators/nuclear.json'
import waste from '../../../../data/indicators/waste.json'
import biomass from '../../../../data/indicators/biomass.json'
import bioFuel from '../../../../data/indicators/bioFuel.json'
import hydro from '../../../../data/indicators/hydro.json'
import wind from '../../../../data/indicators/wind.json'
import solar from '../../../../data/indicators/solar.json'
import geothermal from '../../../../data/indicators/geothermal.json'
import ocean from '../../../../data/indicators/ocean.json'
import scoreData from '../../../../data/dummyScore.json'
import { convertToColor } from './convertToColor'
import dataInfo from './../../../../data/dataInfo'

const minScoreValue = 0
const maxScoreValue = 10

const indicatorData = (indicator, pathway, currentYear) => {
  const params = getIndicatorParams(indicator)
  const file = getFile(indicator)
  if (!file) return []
  const data = file[pathway][currentYear]
  let colorList = []
  Object.keys(data).forEach(country =>
    colorList.push({
      code: country.toLowerCase(),
      color: convertToColor(data[country], params.min, params.max),
    })
  )
  return colorList
}

const score = scenario => {
  const score = scoreData
    .filter(elmt => elmt.scenario === scenario)
    .map(e => ({
      code: e.country,
      color: convertToColor(
        maxScoreValue - (e.env + e.eco + e.soc) / 3,
        minScoreValue,
        maxScoreValue
      ),
    }))
  return score
}
export const getMapColors = (valueToShow, scenario, currentYear) => {
  if (valueToShow === 'score') {
    return score(scenario)
  } else {
    return indicatorData(valueToShow, scenario, currentYear)
  }
}
const getFile = indicator => {
  var file
  switch (indicator) {
    case 'coal': {
      file = coal
      break
    }
    case 'oil': {
      file = oil
      break
    }
    case 'naturalGas': {
      file = naturalGas
      break
    }
    case 'nuclear': {
      file = nuclear
      break
    }
    case 'waste': {
      file = waste
      break
    }
    case 'biomass': {
      file = biomass
      break
    }
    case 'bioFuel': {
      file = bioFuel
      break
    }
    case 'hydro': {
      file = hydro
      break
    }
    case 'wind': {
      file = wind
      break
    }
    case 'solar': {
      file = solar
      break
    }
    case 'geothermal': {
      file = geothermal
      break
    }
    case 'ocean': {
      file = ocean
      break
    }
    default:
      console.log('not valid indicator: ' + indicator)
  }
  return file
}
export const getCountryDataForChart = (
  myCountry,
  currentYear,
  indicator,
  pathway
) => {
  const file = getFile(indicator)
  const params = getIndicatorParams(indicator)
  const dataForPathway = file[pathway]

  var dataList = [['Element', params.unit, { role: 'style' }]]
  if (!file) return dataList

  Object.keys(dataForPathway)
    .filter(
      year => year < currentYear && year % (currentYear < 2030 ? 1 : 5) === 0
    )
    .forEach(year => {
      let row = [
        year,
        Number(dataForPathway[year][myCountry.toUpperCase()]),
        convertToColor(
          dataForPathway[year][myCountry.toUpperCase()],
          params.min,
          params.max
        ),
      ]
      dataList.push(row)
    })
  return dataList
}
export const getUnit = indicator => {
  return getIndicatorParams(indicator).unit
}

export const getCountryScoreForChart = (myCountry, scenario, translation) => {
  const scoreElements = ['env', 'eco', 'soc']
  const countryData = scoreData.filter(
    country => country.country === myCountry && country.scenario === scenario
  )
  let data
  //prevent compile errors if clicked on country with no data
  if (countryData.length) {
    data = [['Element', 'Score', { role: 'style' }]]
    for (var i = 0; i < scoreElements.length; i++) {
      let elmt = [
        translation[scoreElements[i]],
        countryData[0][scoreElements[i]],
        convertToColor(
          maxScoreValue - countryData[0][scoreElements[i]],
          minScoreValue,
          maxScoreValue
        ),
      ]
      data.push(elmt)
    }
    let combined = 0
    for (i = 0; i < scoreElements.length; i++) {
      combined += countryData[0][scoreElements[i]]
    }
    combined /= 3
    let elmt = [
      translation['sum'],
      combined,
      convertToColor(maxScoreValue - combined, minScoreValue, maxScoreValue),
    ]
    data.push(elmt)
  }
  return data
}
export const getIndicatorParams = indicator => {
  if (indicator === 'score') {
    return {
      unit: 'score',
      max: 10,
      min: 0,
      steps: 5,
      flipColors: true,
    }
  } else {
    const data = dataInfo.filter(item => item.indicator === indicator)
    const info = data[0]
    if (data.length < 1) {
      console.log('cannot find info for indicator: ' + indicator)
      return null
    }
    return {
      unit: info.unit,
      max: info.max,
      min: info.min,
      steps: 10,
    }
  }
}
