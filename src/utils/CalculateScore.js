import scenarioScore from '../data/scenarioScore.json'

export function calculateScore(selectedScenario, weights) {
  let normalizedScore = 0
  if (Object.entries(weights).length !== 0 && weights.constructor === Object) {
    let scenario = scenarioScore.filter(
      scenario => scenario.scenario === selectedScenario
    )[0]
    if (scenario) {
      let { env, eco, soc } = scenario
      let maxScore = findMaxScore(weights)
      let minScore = findMinScore(weights)
      let diffScore = maxScore === minScore ? 1 : maxScore - minScore
      normalizedScore = Math.round(
        (((env * weights.env + eco * weights.eco + soc * weights.soc)-findMinScore(weights)) /
        diffScore) * 100
      )
    } else {
      console.log(`No scenario found for ${selectedScenario}`)
    }
  }
  if (isNaN(normalizedScore)) normalizedScore = 0
  return normalizedScore
}

const findMaxScore = weights => {
  let maxScore = -1
  //let bestScenario = 'none'
  if (Object.entries(weights).length !== 0 && weights.constructor === Object) {
    //For each possible scenario
    for (var t = 0; t <= 1; t++) {
      for (var e = 0; e <= 26; e++) {
        for (var c = 0; c <= 7; c++) {
          for (var b = 0; b <= 3; b++) {
            const checkScenario = 'T' + t + 'E' + e + 'C' + c + 'B' + b
            let scenario = scenarioScore.filter(
              scenario => scenario.scenario === checkScenario
            )[0]
            if (scenario) {
              let { env, eco, soc } = scenario
              let score = env * weights.env + eco * weights.eco + soc * weights.soc
              if (score > maxScore) {
                maxScore = score
              }
            } else {
              console.log(`No scenario found for ${checkScenario}`)
            }
          }
        }
      }
    }
  }
  return maxScore
}

const findMinScore = weights => {
  let minScore = 100
  //let bestScenario = 'none'
  if (Object.entries(weights).length !== 0 && weights.constructor === Object) {
    //For each possible scenario
    for (var t = 0; t <= 1; t++) {
      for (var e = 0; e <= 26; e++) {
        for (var c = 0; c <= 7; c++) {
          for (var b = 0; b <= 3; b++) {
            const checkScenario = 'T' + t + 'E' + e + 'C' + c + 'B' + b
            let scenario = scenarioScore.filter(
              scenario => scenario.scenario === checkScenario
            )[0]
            if (scenario) {
              let { env, eco, soc } = scenario
              let score = env * weights.env + eco * weights.eco + soc * weights.soc
              if (score < minScore) {
                minScore = score
              }
            } else {
              console.log(`No scenario found for ${checkScenario}`)
            }
          }
        }
      }
    }
  }
  return minScore
}
