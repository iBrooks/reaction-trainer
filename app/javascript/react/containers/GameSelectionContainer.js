import React, { Component } from 'react';
import BaselineGame from './GameModeContainers/BaselineGameContainer'
import EnduranceGame from './GameModeContainers/EnduranceGameContainer'
import ChallengeGame from './GameModeContainers/ChallengeGameContainer'
import StartMenu from '../components/StartMenuComponent'
import NavBar from '../components/NavBarComponent'
import { Link } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/fontawesome-free-solid'

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
      description = 'Coming Soon!'
    }
    this.setState({
      mode: mode,
      description: description
    })
  }
  startGame(event){
    event.preventDefault()
    if (!(this.state.mode == 'Challenge')) {
    this.setState({ ready: true })
  }
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
      this.chooseMode('Endurance')
    }
    if (this.state.ready) {
      if (this.state.mode == 'Baseline') {
        content = (
          <BaselineGame
            exitGame={this.exitGame}
          />
        )
      } else if (this.state.mode == 'Endurance') {
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
      <div id='gameContainer'>
        <div id='siteTitle'>
          <Link to='/'><div id='homeLinkDiv'>Reactions<FontAwesomeIcon icon={faBullseye} id='logoTarget'/>js</div></Link>
        </div>
        <div id='upperNavPanel'>
          <NavBar />
        </div>
          {content}
      </div>
    )
  }
}

export default GameSelection