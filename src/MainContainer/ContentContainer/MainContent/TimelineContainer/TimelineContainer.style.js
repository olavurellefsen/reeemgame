import styled from 'styled-components'
import Slider from '@material-ui/lab/Slider'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const RowContainer = styled.div`
  display: flex;
  margin-right: 20px;
  width: 98%;
  overflow: hidden; // Needed because of https://github.com/mui-org/material-ui/issues/13455
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
`
export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0px 0px 0px;
  height: 15px;
`
export const Label = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  color: ${props => (props.future ? 'lightgray' : 'inherited')};
`

export const SliderContainer = styled.div`
  padding: 20px 13px 5px 15px;
`

export const StyledSlider = styled(Slider)``
