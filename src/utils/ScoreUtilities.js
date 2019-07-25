import React from 'react'
import eunochCountries from './../data/eunochcountries.json'
import scoreData from './../data/dummyScore.json'
import Edata from './../data/envData.json'
import CapitalCost from './../data/Capitalcost.json'
import newCapacity from './../data/newCap'
import pathwayconvert from './../data/pathwayConvert'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
  var envMin = 10000000000
  alert(JSON.stringify(envData))
  envData.model_draft_reeem_osembe_output.forEach(e => {
    //alert("minMax: " + JSON.stringify(e))
    if (e && e.value < envMin) envMin = e.value
    if (e && e.value > envMax) envMax = e.value
  })

  alert('min: ' + JSON.stringify(envMin) + '  max: ' + JSON.stringify(envMax))
  scenarios.forEach(function(s) {
    //countries.forEach(function(c) {
    let elmt = {}
    elmt['scenario'] = s
    //elmt['country'] = c
    //scenario":"C0T0E0","country
    scoreElmts.forEach(function(e) {
      if (e === 'env') {
        var v = envData.model_draft_reeem_osembe_output.find(elem => {
          //alert("s: " + JSON.stringify(s) + "   p: " + elem.pathway)
          return elem.pathway === s
        })
        //alert("ubd: " + s + " v: " + JSON.stringify(v))
        elmt['env'] = Math.round(((v.value - envMin) / (envMax - envMin)) * 100)
      } else if (e === 'eco') {
        var tr = [[71, 277], [74, 273], [75, 274], [76, 275]]
        var sum = 0
        var outPar = 0
        var inPar = 0
        var pathw = pathwayconvert.find(path => {
          return path[0] === s
        })
        tr.forEach(e => {
          //alert('s: ' + s)
          outPar = newCapacity.find(a => {
            //return a.nid === e[1] && s === a.pathway
            return a.nid === e[1] && s === pathw[1]
          })
          inPar = CapitalCost.find(a => {
            //return a.nid === e[0] && s === a.pathway
            return a.nid === e[0] && s === pathw[1]
          })
          if (outPar !== undefined && inPar !== undefined) {
            sum += outPar.value * inPar.value
          } else {
            alert('s: ' + pathw[0] + '  p: ' + pathw[1])
          }
          alert(
            'Sum: ' +
              sum +
              ' in: ' +
              JSON.stringify(inPar) +
              ' out: ' +
              JSON.stringify(outPar) +
              's: ' +
              pathw[0] +
              '  p: ' +
              pathw[1]
          )
        })
        elmt['eco'] = sum
        alert('s: ' + pathw[0] + '  p: ' + pathw[1] + '  sum: ' + sum)
      } else elmt[e] = getRandomInt(1, 10)
    })
    //alert(JSON.stringify(elmt))
    score.push(elmt)
  })
  //}
  //)
  //Print scores
  console.log(JSON.stringify(score))
  alert('scores: ' + JSON.stringify(score))
  //alert(JSON.stringify(t))
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
      //if (loading) alert('data: ' + JSON.stringify(data))
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
  alert('Edara: ' + JSON.stringify(Edata))
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
      //if (loading) alert('data: ' + JSON.stringify(data))
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
      //alert('newCap: ' + JSON.stringify(newCapacity))

      return <div>Helllo</div>
    }}
  </Query>
)
