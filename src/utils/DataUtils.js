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
  var indicatorParams = []
  var max = -Infinity
  var min = Infinity
  var oilArray = {}
  var coalDataArray = {}
  var naturalGasArray = {}
  var nuclearArray = {}
  var wasteArray = {}
  var biomassArray = {}
  var bioFuelArray = {}
  var hydroArray = {}
  var windArray = {}
  var solarArray = {}
  var geothermalArray = {}
  var oceanArray = {}
  oilData.forEach(function(e) {
    if (!oilArray[e.pathway]) oilArray[e.pathway] = {}
    if (!oilArray[e.pathway][e.year]) oilArray[e.pathway][e.year] = {}
    oilArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })
  console.log('oil')
  console.log(JSON.stringify(oilArray))
  indicatorParams.push({
    indicator: 'oil',
    min: min,
    max: max,
    unit: oilData[0].unit,
  })
  max = -Infinity
  min = Infinity
  coalData.forEach(function(e) {
    if (!coalDataArray[e.pathway]) coalDataArray[e.pathway] = {}
    if (!coalDataArray[e.pathway][e.year]) coalDataArray[e.pathway][e.year] = {}
    coalDataArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })
  console.log('coal')
  console.log(JSON.stringify(coalDataArray))
  indicatorParams.push({
    indicator: 'coal',
    min: min,
    max: max,
    unit: coalData[0].unit,
  })
  max = -Infinity
  min = Infinity
  naturalGas.forEach(function(e) {
    if (!naturalGasArray[e.pathway]) naturalGasArray[e.pathway] = {}
    if (!naturalGasArray[e.pathway][e.year])
      naturalGasArray[e.pathway][e.year] = {}
    naturalGasArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })
  console.log('natural gas')
  console.log(JSON.stringify(naturalGasArray))
  indicatorParams.push({
    indicator: 'naturalGas',
    min: min,
    max: max,
    unit: naturalGas[0].unit,
  })
  max = -Infinity
  min = Infinity
  nuclear.forEach(function(e) {
    if (!nuclearArray[e.pathway]) nuclearArray[e.pathway] = {}
    if (!nuclearArray[e.pathway][e.year]) nuclearArray[e.pathway][e.year] = {}
    nuclearArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('nuclear')
  console.log(JSON.stringify(nuclearArray))
  indicatorParams.push({
    indicator: 'nuclear',
    min: min,
    max: max,
    unit: nuclear[0].unit,
  })
  max = -Infinity
  min = Infinity
  waste.forEach(function(e) {
    if (!wasteArray[e.pathway]) wasteArray[e.pathway] = {}
    if (!wasteArray[e.pathway][e.year]) wasteArray[e.pathway][e.year] = {}
    wasteArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('waste')
  console.log(JSON.stringify(wasteArray))
  indicatorParams.push({
    indicator: 'waste',
    min: min,
    max: max,
    unit: waste[0].unit,
  })
  max = -Infinity
  min = Infinity
  biomass.forEach(function(e) {
    if (!biomassArray[e.pathway]) biomassArray[e.pathway] = {}
    if (!biomassArray[e.pathway][e.year]) biomassArray[e.pathway][e.year] = {}
    biomassArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('biomass')
  console.log(JSON.stringify(biomassArray))
  indicatorParams.push({
    indicator: 'biomass',
    min: min,
    max: max,
    unit: biomass[0].unit,
  })
  max = -Infinity
  min = Infinity
  bioFuel.forEach(function(e) {
    if (!bioFuelArray[e.pathway]) bioFuelArray[e.pathway] = {}
    if (!bioFuelArray[e.pathway][e.year]) bioFuelArray[e.pathway][e.year] = {}
    bioFuelArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('biofuel')
  console.log(JSON.stringify(bioFuelArray))
  indicatorParams.push({
    indicator: 'bioFuel',
    min: min,
    max: max,
    unit: bioFuel[0].unit,
  })
  max = -Infinity
  min = Infinity
  hydro.forEach(function(e) {
    if (!hydroArray[e.pathway]) hydroArray[e.pathway] = {}
    if (!hydroArray[e.pathway][e.year]) hydroArray[e.pathway][e.year] = {}
    hydroArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('hydro')
  console.log(JSON.stringify(hydroArray))
  indicatorParams.push({
    indicator: 'hydro',
    min: min,
    max: max,
    unit: hydro[0].unit,
  })
  max = -Infinity
  min = Infinity
  wind.forEach(function(e) {
    if (!windArray[e.pathway]) windArray[e.pathway] = {}
    if (!windArray[e.pathway][e.year]) windArray[e.pathway][e.year] = {}
    windArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('wind')
  console.log(JSON.stringify(windArray))
  indicatorParams.push({
    indicator: 'wind',
    min: min,
    max: max,
    unit: wind[0].unit,
  })
  max = -Infinity
  min = Infinity
  solar.forEach(function(e) {
    if (!solarArray[e.pathway]) solarArray[e.pathway] = {}
    if (!solarArray[e.pathway][e.year]) solarArray[e.pathway][e.year] = {}
    solarArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('solar')
  console.log(JSON.stringify(solarArray))
  indicatorParams.push({
    indicator: 'solar',
    min: min,
    max: max,
    unit: solar[0].unit,
  })
  max = -Infinity
  min = Infinity
  geothermal.forEach(function(e) {
    if (!geothermalArray[e.pathway]) geothermalArray[e.pathway] = {}
    if (!geothermalArray[e.pathway][e.year])
      geothermalArray[e.pathway][e.year] = {}
    geothermalArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })

  console.log('geothermal')
  console.log(JSON.stringify(geothermalArray))
  indicatorParams.push({
    indicator: 'geothermal',
    min: min,
    max: max,
    unit: geothermal[0].unit,
  })
  max = -Infinity
  min = Infinity
  ocean.forEach(function(e) {
    if (!oceanArray[e.pathway]) oceanArray[e.pathway] = {}
    if (!oceanArray[e.pathway][e.year]) oceanArray[e.pathway][e.year] = {}
    oceanArray[e.pathway][e.year][e.region] = e.value
    if (e.region !== 'EU+CH+NO') {
      max = Math.max(max, e.value)
      min = Math.min(min, e.value)
    }
  })
  console.log('ocean')
  console.log(JSON.stringify(oceanArray))
  indicatorParams.push({
    indicator: 'ocean',
    min: min,
    max: max,
    unit: ocean[0].unit,
  })
  console.log(JSON.stringify(indicatorParams))
}
