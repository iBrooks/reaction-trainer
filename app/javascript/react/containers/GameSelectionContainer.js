import React, { Component } from 'react';
import BaselineGame from './GameModeContainers/BaselineGameContainer'
import EnduranceGame from './GameModeContainers/EnduranceGameContainer'
import ChallengeGame from './GameModeContainers/ChallengeGameContainer'
import StartMenu from '../components/StartMenuComponent'
import NavBar from '../components/NavBarComponent'
import { Link } from 'react-router';


class GameSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetCount: 10,
      mode: 'Baseline',
      description: '30 static targets. How quickly can you hit them all?',
      ready: false
    }
    this.chooseMode = this.chooseMode.bind(this)
    this.startGame = this.startGame.bind(this)
    this.exitGame = this.exitGame.bind(this)

  }

  chooseMode(mode){
    let description
    if (mode == 'Baseline') {
      description = '30 static targets. How quickly can you hit them all?'
    } else if (mode == 'Endurance') {
      description = 'Non-stop targets that expire. How long can you last?'
    } else {
      description = 'Non-stop targets that expire. How long can you last?'
    }
    this.setState({
      mode: mode,
      description: description
    })
  }
  startGame(event){
    event.preventDefault()
    // if (!(this.state.mode == 'Challenge')) {
    this.setState({ ready: true })
  // }
  }
  exitGame(){
    this.setState({ ready: false })
  }
  render(){
    let content
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
      this.chooseMode('Challenge')
    }
    if (this.state.ready) {
      if (this.state.mode == 'Baseline') {
        content = (
          <BaselineGame
            exitGame={this.exitGame}
          />
        )
      } else if (this.state.mode == 'Challenge') {
        content = (
          <EnduranceGame
            exitGame={this.exitGame}
          />
        )
      } else {
        content = (
          <ChallengeGame
            exitGame={this.exitGame}
          />
        )
      }
    } else {
      content = (
        <StartMenu
          chooseChallenge={chooseChallenge}
          chooseBaseline={chooseBaseline}
          chooseEndurance={chooseEndurance}
          mode={this.state.mode}
          description={this.state.description}
          startGame={this.startGame}
        />
      )
    }
    return(
      content
    )
  }
}

export default GameSelection