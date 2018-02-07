import React, { Component } from 'react';
import BaselineGameContainer from './BaselineGameContainer'
import StartMenu from '../components/StartMenuComponent'

class GameSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetCount: 10,
      gameMode: 'Baseline',
      description: '30 static targets. How fast can you click through them all?',
      ready: false
    }
    this.chooseMode = this.chooseMode.bind(this)
    this.startGame = this.startGame.bind(this)

  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('re-rendering')
    return true
  }

  chooseMode(mode){
    let description
    if (mode == 'Baseline') {
      description = '30 static targets. How fast can you click through them all?'
    } else if (mode == 'Endurance') {
      description = 'Non-stop targets that expire. How long can you last, and how accurate can you be?'
    } else {
      description = '5 levels of increasing difficulty. Can you beat them all?'
    }
    this.setState({
      gameMode: mode,
      description: description
    })
  }
  startGame(){
    this.setState({ ready: true })
  }

  prepGameContainer(){
    return(
      <GameContainer
      targetCount={this.state.targetCount}
    />
  )
  }
  render(){
    let chooseChallenge = (event) => {
      event.preventDefault()
      this.chooseMode('Challenge')
    }
    let chooseBaseline = (event) => {
      event.preventDefault()
      this.chooseMode('Baseline')
    }
    let chooseEndurance = (event) => {
      event.preventDefault()
      this.chooseMode('Endurance')
    }
    if (this.state.ready) {
      if (this.state.mode == 'Baseline') {
        return(
          null
        )
      } else if (this.state.mode == 'Endurance') {
        return(
          null
        )
      } else {
        return(
          null
        )
      }
    } else {
    return(
    <StartMenu
      chooseChallenge={chooseChallenge}
      chooseBaseline={chooseBaseline}
      chooseEndurance={chooseEndurance}
      mode={this.state.gameMode}
      description={this.state.description}
      startGame={this.startGame}
    />
  )}
  }
}

export default GameSelection