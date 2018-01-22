import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../components/TargetComponent'

class Game extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: 'left',
      times: [],
      gameLength: 10,
      count: 0,
      gameState: 'ready'
    }
    this.onClick = this.onClick.bind(this)
    this.timer = this.timer.bind(this)
  }

  timer(action=nil){
    let mSec, t
    let times = []

    if(action == 'next') {
      clearTimeout(t)
      console.log(mSec)
      times.push(mSec)
      mSec = 0
      t = setTimeout(()=>{ mSec++ }, 1)
    } else if(action == 'stop') {
      clearTimeout(t)
      times.push(mSec)
      mSec = 0
      this.setState({
          times: times,
          gameState: 'ended'
        })
      times = []
    } else {
      this.setState({ gameState: 'running', times: [] })
      mSec = 0
      t = setTimeout((mSec)=>{ mSec++ }, 100)
    }
  }

  onClick(event){
    event.preventDefault()

    let newTargetLocation
    if (this.state.location == 'left') {
      newTargetLocation = 'right'
    } else {
      newTargetLocation = 'left'
    }

    if (this.state.count == this.state.gameLength) {
      this.timer('stop')
    } else {
      this.timer('next')
      this.setState({
        location: newTargetLocation,
        count: this.state.count + 1,
        gameState: 'running'
      })
    }

  }

  render(){
    if (this.state.gameState == 'ready'){
      let onClick = this.timer
      return(
        <div>
          <h1 onClick={onClick}>Start!</h1>
        </div>
      )
    } else if (this.state.gameState == 'running') {
      let onButtonClick = this.onClick
      return(
        <div className='container'>
          <Target
            location={this.state.location}
            onClick={onButtonClick}
          />
        </div>
      )
    } else {
      return(
        <div>
          <h1>Complete!</h1>
          <h4>Raw times:</h4>
          <p>{this.state.times.join}</p>
        </div>
      )
    }
  }
}

export default Game