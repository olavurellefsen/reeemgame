import { calculateScore } from './CalculateScore'

export function saveScore(scenario, weights, choices) {
  let oldScores = JSON.parse(localStorage.getItem('score3'))
  if (!oldScores) oldScores = []
  let d = new Date()
  let score = {
    date: d.toLocaleString('de-DE'),
    weightedScores: { sum: calculateScore(scenario, weights) },
    weights: weights,
    scenario: scenario,
    choices: choices
  }
  oldScores.push(score)
  localStorage.setItem('score3', JSON.stringify(oldScores))
}
