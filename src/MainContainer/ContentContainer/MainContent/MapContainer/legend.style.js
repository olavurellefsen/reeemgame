import styled from 'styled-components'

export const LegendStyle = styled.div`
  display: flex;
  flex-direction: column;
  right: 20px;
  position: absolute;
  z-index: 1000;
  padding: 7px;
  top: 40px;
  border-radius: 4px;
  background: #ffffff99;
`
LegendStyle.displayName = 'LegendStyle'

export const LegendItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  margin: 1px;
  align-items: center;
  justify-content: space-between;
`
LegendStyle.displayName = 'LegendStyle'

export const LegendItemColor = styled.div`
  background: ${props => props.color};
  width: 40px;
  height: 20px;
  margin-left: 5px;
`

export const LegendRow = styled.div`
  display: flex;
`
export const LegendColumn = styled.div`
  display: flex;
  flex-direction: column;
`
export const LegendUnit = styled.div`
  padding-right: 7px;
  align-self: center;
  transform: rotate(-0.25turn);
`
