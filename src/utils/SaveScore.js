import { calculateScore } from './CalculateScore'

export function saveScore(scenario, weights) {
  let oldScores = JSON.parse(localStorage.getItem('score3'))
  if (!oldScores) oldScores = []
  let d = new Date()
  let score = {
    date: d.toLocaleString('de-DE'),
    weightedScores: { sum: calculateScore(scenario, weights) },
    weights: weights,
    scenario: scenario,
  }
  oldScores.push(score)
  localStorage.setItem('score3', JSON.stringify(oldScores))
}
