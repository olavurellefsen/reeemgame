import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`
export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 1%;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  flex-grow: 0;
  background-color: ${props => (props.index % 2 ? 'white' : '#EDEDED')};
`
export const Cell = styled.div`
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 20%;
`
export const TextContainer = styled.div`
  display: flex;
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
  font-family: 'Montserrat', sans-serif;
  margin: 10px;
`
