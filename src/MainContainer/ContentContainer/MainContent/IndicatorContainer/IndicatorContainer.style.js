import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
`

export const LeftMenuItem = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400');
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  height: 60px;
  width: 250px;
  color: ${props => (props.selected ? 'black' : 'white')}
  background: ${props => (props.selected ? '#888888' : '#2b2a2a')}
  text-align: left;
  padding: 0px 0px 0px 16px;
  cursor: pointer;
  transition: color 300ms ease-in;
  margin: 2px 2px 2px 0px;
  display: flex;
  align-items: center;
  :hover {
    color: #aaaaaa;
  }
`

export const EUflagContainer = styled.div`
  width: 250px;
`
