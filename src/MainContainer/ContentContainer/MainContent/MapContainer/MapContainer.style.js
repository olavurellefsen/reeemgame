import styled from 'styled-components'

export const Container = styled.div`
  max-width: 100%;
`
const sampleColors = [
  { code: 'se', color: 'green' },
  { code: 'dk', color: 'blue' },
  { code: 'de', color: 'salmon' },
  { code: 'fo', color: 'red' },
  { code: 'uk', color: 'lightblue' },
  { code: 'hr', color: 'orange' },
  { code: 'be', color: 'yellow' },
  { code: 'fi', color: 'lightgreen' },
  { code: 'lt', color: 'lime' },
]
const countryColorsCSS = countryColors =>
  countryColors.map(country => `#${country.code} {fill ${country.color}}`)

export const StyledEurope = styled.div`
  ${countryColorsCSS(sampleColors)}
  fill: #cccccc;
  stroke: gray;
  stroke-width: 10;
  stroke-miterlimit: 22.9256;
`
