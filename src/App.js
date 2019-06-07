import React, { Component } from 'react'
import { MainContainer } from './MainContainer/MainContainer'
//import { generate } from './ScoreData'
import ReactGA from 'react-ga'
ReactGA.initialize('UA-86120823-4', {
  testMode: process.env.NODE_ENV === 'test',
})
ReactGA.pageview(window.location.pathname + window.location.search)
//generate()
class App extends Component {
  render() {
    return <MainContainer />
  }
}

export default App
