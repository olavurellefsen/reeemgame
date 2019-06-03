import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const Country = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 800;
  align-self: center;
`
export const Icon = styled.div`
  display: flex;
  padding: 3px;
`
export const Button = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }
`
export const Header = styled.div`
  display: flex;
  background-color: #d0d0d0;
  padding: 5px;
  justify-content: space-between;
`
export const Content = styled.div`
  display: flex;
  justify-content: center;
`
