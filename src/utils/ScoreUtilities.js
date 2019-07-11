import React from 'react'
import eunochCountries from './../data/eunochcountries.json'
import scoreData from './../data/dummyScore.json'

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
export function generateScores() {
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
  scenarios.forEach(function(s) {
    countries.forEach(function(c) {
      let elmt = {}
      elmt['scenario'] = s
      elmt['country'] = c
      scoreElmts.forEach(function(e) {
        if (e === 'env') {
          elmt['env'] = 5
        } else elmt[e] = getRandomInt(1, 10)
      })
      score.push(elmt)
    })
  })
  //Print scores
  //console.log(JSON.stringify(score))
  alert(JSON.stringify(score))
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
        ) {
          category
          region
          year
          id
          value
          pathway
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      //if (loading) alert('data: ' + JSON.stringify(data))
      if (data) {
        generateScores()
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
