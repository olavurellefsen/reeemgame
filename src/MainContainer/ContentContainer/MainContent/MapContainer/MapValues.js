import oil from '../../../../data/oil.json'
import coal from '../../../../data/coal.json'
import naturalGas from '../../../../data/naturalGas.json'
import nuclear from '../../../../data/nuclear.json'
import waste from '../../../../data/waste.json'
import biomass from '../../../../data/biomass.json'
import bioFuel from '../../../../data/bioFuel.json'
import hydro from '../../../../data/hydro.json'
import wind from '../../../../data/wind.json'
import solar from '../../../../data/solar.json'
import geothermal from '../../../../data/geothermal.json'
import ocean from '../../../../data/ocean.json'
import eunochCountries from '../../../../data/eunochcountries.json'
import scoreData from '../../../../data/dummyScore.json'
import { convertToColor } from './convertToColor'

const minValueDemand = 90
const maxValueDemand = 400
const minValueEmissionLimit = 0
const maxValueEmissionLimit = 1000000
const minScoreValue = 0
const maxScoreValue = 10

const indicatorData = (indicator, pathway, currentYear) => {
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
      return []
  }
  const data = file
    .filter(item => item.year === currentYear && item.pathway === pathway)
    .map(item => ({
      code: item.region.toLowerCase(),
      color: convertToColor(item.value, 0, 30),
      value: item.value,
      unit: item.unit,
    }))
  return data
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

export const getCountryDataForChart = (
  myCountry,
  currentYear,
  indicator,
  scenario
) => {
  var minValue
  var maxValue
  if (indicator === 'electricityDemands') {
    indicator = 'SpecifiedAnnual Demand'
    myCountry = myCountry.toUpperCase()
    minValue = minValueDemand
    maxValue = maxValueDemand
  }
  if (indicator === 'emissionLimit') {
    indicator = 'AnnualEmissionLimit'
    myCountry = 'EU28+CH+NO' //Because there is not distinct data for every country
    minValue = minValueEmissionLimit
    maxValue = maxValueEmissionLimit
  }
  const countryData = oil.filter(
    country =>
      country.Country === myCountry &&
      country.Parameter === indicator &&
      country.Scenario === scenario
  )
  let data = []
  //prevent errors if clicked on country with no data
  if (countryData.length) {
    data = [['Element', countryData[0]['Unit'], { role: 'style' }]]
    for (var i = 2015; i <= currentYear; i = i + (currentYear < 2030 ? 1 : 5)) {
      let year = [
        JSON.stringify(i),
        countryData[0][i],
        convertToColor(countryData[0][i], minValue, maxValue),
      ]

      data.push(year)
    }
  }
  return data
}
export const getUnit = indicator => {
  if (indicator === 'electricityDemands') indicator = 'SpecifiedAnnual Demand'
  else if (indicator === 'emissionLimit') indicator = 'AnnualEmissionLimit'
  const elmt = oil.find(element => element.Parameter === indicator)
  return elmt ? elmt.Unit : 'undefined'
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
