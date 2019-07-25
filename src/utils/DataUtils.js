import oilData from './../data/oil.json'
import coalData from './../data/coal.json'
import naturalGas from './../data/naturalGas.json'
import nuclear from './../data/nuclear.json'
import waste from './../data/waste.json'
import biomass from './../data/biomass.json'
import bioFuel from './../data/bioFuel.json'
import hydro from './../data/hydro.json'
import wind from './../data/wind.json'
import solar from './../data/solar.json'
import geothermal from './../data/geothermal.json'
import ocean from './../data/ocean.json'

export function generateData() {
  var indicators = []
  var max = -Infinity
  var min = Infinity
  oilData.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })
  indicators.push({
    indicator: 'oil',
    min: min,
    max: max,
    unit: oilData[0].unit,
  })
  max = -Infinity
  min = Infinity
  coalData.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })
  indicators.push({
    indicator: 'coal',
    min: min,
    max: max,
    unit: coalData[0].unit,
  })
  max = -Infinity
  min = Infinity
  naturalGas.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'naturalGas',
    min: min,
    max: max,
    unit: naturalGas[0].unit,
  })
  max = -Infinity
  min = Infinity
  nuclear.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'nuclear',
    min: min,
    max: max,
    unit: nuclear[0].unit,
  })
  max = -Infinity
  min = Infinity
  waste.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'waste',
    min: min,
    max: max,
    unit: waste[0].unit,
  })
  max = -Infinity
  min = Infinity
  biomass.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'biomass',
    min: min,
    max: max,
    unit: biomass[0].unit,
  })
  max = -Infinity
  min = Infinity
  bioFuel.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'bioFuel',
    min: min,
    max: max,
    unit: bioFuel[0].unit,
  })
  max = -Infinity
  min = Infinity
  hydro.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'hydro',
    min: min,
    max: max,
    unit: hydro[0].unit,
  })
  max = -Infinity
  min = Infinity
  wind.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'wind',
    min: min,
    max: max,
    unit: wind[0].unit,
  })
  max = -Infinity
  min = Infinity
  solar.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'solar',
    min: min,
    max: max,
    unit: solar[0].unit,
  })
  max = -Infinity
  min = Infinity
  geothermal.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'geothermal',
    min: min,
    max: max,
    unit: geothermal[0].unit,
  })
  max = -Infinity
  min = Infinity
  ocean.forEach(function(e) {
    max = Math.max(max, e.value)
    min = Math.min(min, e.value)
  })

  indicators.push({
    indicator: 'ocean',
    min: min,
    max: max,
    unit: ocean[0].unit,
  })
  console.log(JSON.stringify(indicators))
}