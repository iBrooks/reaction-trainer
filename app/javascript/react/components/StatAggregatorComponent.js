import React, { Component } from 'react';

class StatAggregator extends Component {
  constructor(props){
    this.state = {}
    this.clickMisses = 0
    this.targetHits = 0
    this.targetMisses = 0
    this.targetTotal = 0
    this.targetTimes = []
    this.gameType = ''
    this.gameDifficulty = ''
    this.gameTime = ''

    this.clickTotal = this.targetHits + this.clickMisses
    this.clickAccuracy = this.percentage(this.targetHits/(this.clickTotal))
    this.targetAccuracy = this.percentage(this.targetHits/this.targetTotal)

    this.percentage = this.percentage.bind(this)
  }
  percentage(decimal){
    return Math.round(((decimal) * 100)*10)/10
  }
  saveGame() {
    let formPayload = {
      game: {
      target_hits: this.state.times
      }
    }
    fetch('/api/v1/games', {
     credentials: 'same-origin',
     method: 'post',
     body: JSON.stringify(formPayload),
     headers: {
       'Content-Type': 'application/json',
       // 'X-Requested-With': 'XMLHttpRequest',
       // 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content')
       }
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
  save(){

  }
  render(){
    return null
  }
}