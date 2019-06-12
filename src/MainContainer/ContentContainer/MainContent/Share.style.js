import styled from 'styled-components'

export const DialogHeader = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
  font-family: 'Montserrat', sans-serif;
  background-color: black;
  color: white;
  padding: 15px;
`

export const DialogText = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
  font-family: 'Montserrat', sans-serif;
  padding-bottom: 10px;
`

export const DialogTextField = styled.input`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
  font-family: 'Montserrat', sans-serif;
  border: solid #9dc3e6;
  border-width: 2px;
  padding: 10px;
  padding-right: 0px;
  width: 100%;
`

export const DialogButton = styled.button`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
  font-family: 'Montserrat', sans-serif;
  background-color: #9dc3e6;
  padding: 5px;
  width: 10%;
  border: none;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`
export const DialogContentContainer = styled.div`
  padding: 10px;
`

export const Container = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: center;
`

export const ShareButtonsContainer = styled.div`
  display: flex;
  padding-left: 10px;
`

export const ShareButton = styled.div`
  display: flex;
  background-color: #5683ce;
  color: white;
  padding: 15px 30px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 800;
  border-radius: 3px;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`

export const ShareLinkButton = styled.div`
  display: flex;
  background-color: #5683ce;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 800;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`
export const SocialMediaBtn = styled.div`
  display: flex;
  padding: 3px;
  :hover {
    cursor: pointer;
  }
`
