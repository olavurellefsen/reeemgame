import eunochCountries from './data/eunochcountries.json'

const score = {}
let scenarios = []
let countries = []
const scoreElmts = ['env', 'eco', 'soc']

//Create country list
eunochCountries.map(country => countries.push(country.code))

//Create scenarios list
for (var c = 0; c <= 1; c++) {
  for (var t = 0; t <= 1; t++) {
    for (var e = 0; e <= 26; e++) {
      scenarios.push('C' + c + 'T' + t + 'e' + e)
    }
  }
}

//Create data
scenarios.forEach(function(s) {
  score[s] = {}
  countries.forEach(function(c) {
    score[s][c] = {}
    scoreElmts.forEach(function(e) {
      score[s][c][e] = 10
    })
  })
})

//Print data
export function generate() {
  console.log(JSON.stringify(score))
}
