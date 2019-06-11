import eunochCountries from './data/eunochcountries.json'

export function generate() {
  let scenarios = []
  let countries = []
  const scoreElmts = ['env', 'eco', 'soc']

  //Create country list
  eunochCountries.map(country => countries.push(country.code))

  //Create scenarios list
  for (var c = 0; c <= 1; c++) {
    for (var t = 0; t <= 1; t++) {
      for (var e = 0; e <= 26; e++) {
        scenarios.push('C' + c + 'T' + t + 'E' + e)
      }
    }
  }

  //Create random int function for scores
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

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
  console.log(JSON.stringify(score))
}
