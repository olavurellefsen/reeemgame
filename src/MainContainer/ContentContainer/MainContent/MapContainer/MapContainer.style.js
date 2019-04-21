import styled from 'styled-components'

export const Container = styled.div`
  max-width: 100%;
`
const sampleColors = [
  { code: 'se', color: 'lightblue' },
  { code: 'dk', color: 'lightblue' },
  { code: 'de', color: 'lightblue' },
  { code: 'at', color: 'lightblue' },
  { code: 'ie', color: 'lightblue' },
  { code: 'uk', color: 'lightblue' },
  { code: 'hr', color: 'lightblue' },
  { code: 'nl', color: 'lightblue' },
  { code: 'be', color: 'lightblue' },
  { code: 'lu', color: 'lightblue' },
  { code: 'fi', color: 'lightblue' },
  { code: 'ee', color: 'lightblue' },
  { code: 'lv', color: 'lightblue' },
  { code: 'lt', color: 'lightblue' },
  { code: 'fr', color: 'lightblue' },
  { code: 'es', color: 'lightblue' },
  { code: 'pt', color: 'lightblue' },
  { code: 'it', color: 'lightblue' },
  { code: 'mt', color: 'lightblue' },
  { code: 'gr', color: 'lightblue' },
  { code: 'si', color: 'lightblue' },
  { code: 'pl', color: 'lightblue' },
  { code: 'hu', color: 'lightblue' },
  { code: 'cz', color: 'lightblue' },
  { code: 'sk', color: 'lightblue' },
  { code: 'ro', color: 'lightblue' },
  { code: 'bg', color: 'lightblue' },
  { code: 'cy', color: 'lightblue' },
]
const countryColorsCSS = countryColors =>
  countryColors.map(
    country => `
    #${country.code} {
      fill ${country.color};
      :hover {fill: blue;}
    }
    `
  )

export const StyledEurope = styled.div`
  ${countryColorsCSS(sampleColors)}
  fill: #cccccc;
  stroke: gray;
  stroke-width: 10;
  stroke-miterlimit: 22.9256;
`
