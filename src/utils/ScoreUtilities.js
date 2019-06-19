import eunochCountries from './../data/eunochcountries.json'
import scoreData from './../data/dummyScore.json'

function generateScenarioList() {
  let scenarios = []
  for (var c = 0; c <= 1; c++) {
    for (var t = 0; t <= 1; t++) {
      for (var e = 0; e <= 7; e++) {
        scenarios.push('C' + c + 'T' + t + 'E' + e)
      }
    }
  }
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
        elmt[e] = getRandomInt(1, 10)
      })
      score.push(elmt)
    })
  })
  //Print scores
  console.log(JSON.stringify(score))
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
