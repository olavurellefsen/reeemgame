import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
export const LabelContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 5px;
  height: 15px;
`
export const Label = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400');
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  left: ${props => ((props.year - props.min) / (props.max - props.min)) * 96}%;
`
