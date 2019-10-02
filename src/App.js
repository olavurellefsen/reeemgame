import React, { Component } from 'react'
import { MainContainer } from './MainContainer/MainContainer'
//import { generateData } from './utils/DataUtils'
import ReactGA from 'react-ga'
ReactGA.initialize('UA-86120823-4', {
  testMode: process.env.NODE_ENV === 'test',
})
ReactGA.pageview(window.location.pathname + window.location.search)

class App extends Component {
  render() {
    //generateData()
    return <MainContainer />
  }
}

export default App
