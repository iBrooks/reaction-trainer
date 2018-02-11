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
    this.userName = ''

    this.clickTotal = this.targetHits + this.clickMisses
    this.clickAccuracy = this.percentage(this.targetHits/(this.clickTotal))
    this.targetAccuracy = this.percentage(this.targetHits/this.targetTotal)

    this.percentage = this.percentage.bind(this)
    this.save = this.save.bind(this)
  }
  percentage(decimal){
    return Math.round(((decimal) * 100)*10)/10
  }
  componentWillReceiveProps(nextProps){
    this.clickMisses = nextProps.clickMisses
    this.targetHits = nextProps.targetHits
    this.targetMisses = nextProps.targetMisses
    this.targetTotal = nextProps.targetTotal
    this.targetTimes = nextProps.targetTimes
    this.gameType = nextProps.gameType
    this.gameDifficulty = nextProps.gameDifficulty
    this.gameTime = nextProps.gameTime
    if (nextProps.userName != null){
      this.userName = nextProps.userName
    }
    if (nextProps.gameState == 'ended' && nextProps.userName != null) {
      this.save()
    }
  }
  save() {
    let formPayload = {
      game: {
        clickMisses: this.clickMisses,
        targetHits: this.targetHits,
        targetMisses: this.targetMisses,
        targetTotal: this.targetTotal,
        targetTimes: this.targetTimes,
        gameType: this.gameType,
        gameDifficulty: this.gameDifficulty,
        gameTime: this.gameTime,
        clickTotal: this.clickTotal,
        clickAccuracy: this.clickAccuracy,
        targetAccuracy: this.targetAccuracy,
      },
      userName: this.userName
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
  render(){
    return null
  }
}