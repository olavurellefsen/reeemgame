import sampleData from '../../../../data/sampledata.json'
import eunochCountries from '../../../../data/eunochcountries.json'
import { convertToColor } from './convertToColor'

const specifiedAnnualDemand = (scenario, currentYear) =>
  sampleData
    .filter(
      country =>
        country.Parameter === 'SpecifiedAnnual Demand' &&
        country.Scenario === scenario
    )
    .map(country => ({
      code: country.Country.toLowerCase(),
      color: convertToColor(country[currentYear], 90, 400),
    }))

const emissionLimit = (scenario, currentYear) => {
  const emissionLimitData = sampleData
    .filter(
      country =>
        country.Parameter === 'AnnualEmissionLimit' &&
        country.Scenario === scenario
    )
    .map(countryGroup =>
      eunochCountries.map(country => ({
        code: country.code.toLowerCase(),
        color: convertToColor(countryGroup[currentYear], 0, 1000000),
      }))
    )
  return emissionLimitData[0]
}

export const getMapColors = (selectedIndicator, scenario, currentYear) => {
  if (selectedIndicator === 'Electricity demands') {
    return specifiedAnnualDemand(scenario, currentYear)
  }
  if (selectedIndicator === 'Emission Limit') {
    return emissionLimit(scenario, currentYear)
  }
  return []
}
