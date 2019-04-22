import colorScale from '../../../../data/colorScale.json'

export const convertToColor = (value, min, max) => {
  const selectedColor = Math.round(
    ((value - min) / (max - min)) * colorScale.length
  )
  return colorScale[selectedColor]
}
