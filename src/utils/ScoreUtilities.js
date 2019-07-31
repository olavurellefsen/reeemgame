import React from 'react'
import eunochCountries from './../data/eunochcountries.json'
import scoreData from './../data/dummyScore.json'
import Edata from './../data/envData.json'
import CapitalCost from './../data/Capitalcost.json'
import newCapacity from './../data/newCap'
import pathwayconvert from './../data/pathwayConvert'
import IDMatch from './../data/CapitalCostNewCapacityIDMatch'
import OpLife from './../data/OpLife'
import AVOC_IDMatch from './../data/FixedCostInstalledCapMatchIDs'
import FixedCost from './../data/FixedCost'
import InstalledCap from './../data/InstallCapAnd'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const DiscountRate = 0.05

function generateScenarioList() {
  let scenarios = []
  for (var c = 0; c <= 1; c++) {
    for (var t = 0; t <= 1; t++) {
      for (var e = 0; e <= 7; e++) {
        scenarios.push('C' + c + 'T' + t + 'E' + e)
      }
    }
  }
  return scenarios
}
export function generateScores(envData) {
  let countries = []
  const scoreElmts = ['env', 'eco', 'soc']

  //Create country list
  eunochCountries.map(country => countries.push(country.code))

  //Create random int function for scores
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
  const scenarios = generateScenarioList()
  //Create data
  let score = []
  var envMax = 0
  var envMin = 1000000000
  var ecoMin = 1000000000
  var ecoMax = -1000000000
  envData.model_draft_reeem_osembe_output.forEach(e => {
    if (e && e.value < envMin) envMin = e.value
    if (e && e.value > envMax) envMax = e.value
  })

  //alert('min: ' + JSON.stringify(envMin) + '  max: ' + JSON.stringify(envMax))
  scenarios.forEach(function(s) {
    //countries.forEach(function(c) {
    let elmt = {}
    elmt['scenario'] = s
    //elmt['country'] = c
    //scenario":"C0T0E0","country
    scoreElmts.forEach(function(e) {
      if (e === 'env') {
        var v = envData.model_draft_reeem_osembe_output.find(elem => {
          return elem.pathway === s
        })
        elmt['env'] = Math.round(((v.value - envMin) / (envMax - envMin)) * 100)
      } else if (e === 'eco') {
        var sum = 0
        var outPar = 0
        var inPar = 0
        var pathw = pathwayconvert.find(path => {
          return path[0] === s
        })
        IDMatch.forEach(nid => {
          outPar = newCapacity.find(a => {
            return a.nid === nid[1] && a.pathway === pathw[1]
          })
          inPar = CapitalCost.find(a => {
            return a.nid === nid[0] && a.pathway === pathw[1]
          })
          if (outPar !== undefined && inPar !== undefined) {
            sum += outPar.value * inPar.value
          } else {
            //alert('s: ' + pathw[0] + '  p: ' + pathw[1] + '  not found')
          }
        })
        elmt['eco'] = sum
        if (sum > ecoMax) ecoMax = sum
        if (sum < ecoMin) ecoMin = sum
      } else {
        //var CRF = CapitalRecoveryFactorByTech()
        //var CI = CapitalInvestmentByTech('C0T0E0')
        //var AIC = AnnualizedInvestmentCost(OpLife, CI, CRF)
        //alert('tmp: ' + JSON.stringify(CI))
        elmt[e] = getRandomInt(1, 10)
      }
    })
    score.push(elmt)
  })
  var CRF = CapitalRecoveryFactorByTech()
  var CI = CapitalInvestmentByTech('C0T0E0')
  var AIC = AnnualizedInvestmentCost(OpLife, CI, CRF)
  var AVOC = AnnualFixedOperatingCost('C0T0E0')
  alert('AVOC: ' + AVOC)
  //alert('ecoMax: ' + ecoMax + '  ecoMin: ' + ecoMin)
  var normScore = score.map(score => {
    var normEco = Math.round(((score.eco - ecoMin) / (ecoMax - envMin)) * 100)
    return { env: score.env, eco: normEco, soc: score.soc }
  })
  //Print scores
  console.log(JSON.stringify(normScore))
  alert('scores: ' + JSON.stringify(normScore))
}

export function createListOfScenarios(weights) {
  const noOfCountries = 31
  let list = []
  //For each possible scenario
  for (var c = 0; c <= 1; c++) {
    for (var t = 0; t <= 1; t++) {
      for (var e = 0; e <= 7; e++) {
        const scenario = 'C' + c + 'T' + t + 'E' + e
        let listItem = { scenario: scenario }
        let score = 0
        scoreData
          //filter scores to only include this scenario
          .filter(elmt => elmt.scenario === scenario)
          //for each country add the score to combined score
          .forEach(function(e) {
            score +=
              (weights.env * e.env +
                weights.eco * e.eco +
                weights.soc * e.soc) /
              100 /
              noOfCountries
          })
        listItem['score'] = score
        list.push(listItem)
      }
    }
  }
  //Sort by score
  list.sort(function(a, b) {
    return b.score - a.score
  })
  return list
}

export const Qt = () => (
  <Query
    query={gql`
      {
        model_draft_reeem_osembe_output(
          where: { indicator: { _eq: "CO2" }, _and: { year: { _eq: 2050 } } }
          limit: 10300000
        ) {
          category
          region
          year
          id
          value
          pathway
          nid
          indicator
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      if (data) {
        generateScores(data)
      }
      return data.model_draft_reeem_osembe_output.map((movie, i) => (
        <div key={'emm' + i} className="movie">
          <h3>{movie.category}</h3>
          <p>{movie.value}</p>
          <p>{movie.year}</p>
          <p>{movie.region}</p>
          <p>{movie.pathway}</p>
        </div>
      ))
    }}
  </Query>
)

export const Qt2 = () => {
  //('Edara: ' + JSON.stringify(Edata))
  generateScores(Edata)

  return Edata.model_draft_reeem_osembe_output.map((movie, i) => (
    <div key={'emm' + i} className="movie">
      <h3>{movie.category}</h3>
      <p>{movie.value}</p>
      <p>{movie.year}</p>
      <p>{movie.region}</p>
      <p>{movie.pathway}</p>
    </div>
  ))
}

export const QtecoNewCap = () => (
  <Query
    query={gql`
      {
        model_draft_reeem_osembe_output(
          where: { indicator: { _eq: "CO2" }, _and: { year: { _eq: 2050 } } }
          limit: 10300000
        ) {
          category
          region
          year
          id
          value
          pathway
          nid
          indicator
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      if (data) {
        generateScores(data)
      }
      return data.model_draft_reeem_osembe_output.map((movie, i) => (
        <div key={'emm' + i} className="movie">
          <h3>{movie.category}</h3>
          <p>{movie.value}</p>
          <p>{movie.year}</p>
          <p>{movie.region}</p>
          <p>{movie.pathway}</p>
        </div>
      ))
    }}
  </Query>
)

export const EcoScoreGen = () => (
  <Query
    query={gql`
      {
        model_draft_reeem_osembe_output(
          where: { indicator: { _eq: "CO2" }, _and: { year: { _eq: 2050 } } }
          limit: 10300000
        ) {
          category
          region
          year
          id
          value
          pathway
          nid
          indicator
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      return <div>Helllo</div>
    }}
  </Query>
)

//CRF
const CapitalRecoveryFactorByTech = () => {
  var ret = {}
  OpLife.forEach(e => {
    var retElem = {}
    retElem.indicator = e.indicator
    retElem.CRF =
      (DiscountRate * Math.pow(1 + DiscountRate, e.value)) /
      (Math.pow(1 + DiscountRate, e.value) - 1)
    //ret.push(retElem)
    ret[e.indicator] = retElem.CRF
  })
  //alert('CRF: ' + JSON.stringify(ret))
  return ret
}

//CI
const CapitalInvestmentByTech = pathway => {
  var ret = {}
  var pathw = pathwayconvert.find(path => {
    return path[0] === pathway
  })
  OpLife.forEach(o => {
    ret[o.indicator] = {}
  })
  //alert('p: ' + JSON.stringify(pathw))
  IDMatch.forEach(nid => {
    for (let y = 2015; y <= 2050; y++) {
      var retElement = {}
      var outPar
      var inPar
      outPar = newCapacity.find(a => {
        return a.nid === nid[1] && a.pathway === pathw[1] && a.year === y
      })
      inPar = CapitalCost.find(a => {
        if (a.nid === nid[0] && a.pathway === pathw[1] && a.year === y) {
        }
        return a.nid === nid[0] && a.pathway === pathw[1] && a.year === y
      })
      if (outPar !== undefined && inPar !== undefined)
        retElement.indicator = inPar.indicator
      if (outPar !== undefined && inPar !== undefined) {
        retElement.CI = outPar.value * inPar.value
        ret[inPar.indicator][y] = retElement.CI
      }
      //alert('ret: ' + JSON.stringify(ret))
      //ret.push(retElement)
    }
  })
  //alert('CI: ' + JSON.stringify(ret))
  console.log('CI: ' + JSON.stringify(ret))
  return ret
}

//AIC
const AnnualizedInvestmentCost = (opLife, CI, CRF) => {
  var ret
  var startYear
  var sum = 0
  opLife.forEach(o => {
    //alert('o: ' + JSON.stringify(o))
    if (2050 - o.value < 2015) startYear = 2015
    else startYear = 2050 - o.value

    if (Object.keys(CI[o.indicator]).length) {
      for (let y = startYear; y < 2050; y++) {
        //alert('CI: ' + CI[o.indicator][y] + '  CRF: ' + CRF[o.indicator])
        sum += CI[o.indicator][y] * CRF[o.indicator]
        if (sum === undefined) alert('y: ' + y + '  Indicator: ' + o.indicator)
      }
    }
  })
  return sum
}

//AFOC
const AnnualFixedOperatingCost = pathway => {
  var sum = 1
  var outPar
  var inPar
  var pathw = pathwayconvert.find(path => {
    return path[0] === pathway
  })
  AVOC_IDMatch.forEach(nid => {
    outPar = InstalledCap.find(a => {
      return a.nid === nid[0] && a.pathway === pathw[1]
    })
    inPar = FixedCost.find(a => {
      /* alert(
        'a: ' +
          JSON.stringify(a) +
          '  nid[1]: ' +
          nid[1] +
          '  pathw: ' +
          pathw[1]
      ) */
      return a.nid === nid[1]
    })
    alert(
      'outPar: ' + JSON.stringify(outPar) + '   inPar: ' + JSON.stringify(inPar)
    )
    if (outPar !== undefined && inPar !== undefined) {
      sum += outPar.value * inPar.value
    } else {
      alert('missed nid: ' + JSON.stringify(nid))
    }
  })
  return sum
}

//AVOC
const AnnualVariableOperatingCost = () => {}

//DP
const DomesticProductionOFElectricity = () => {}

//LCoDE
const LevelizedCostOfDomesticElectrity = () => {}

const LevelizedCostOfElectricity = () => {}
