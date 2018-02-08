import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.t = null
    this.mSec = null
  }
  componentDidMount(){
    this.t = setInterval(()=>{
    this.mSec = this.mSec + 1
    }, 1)
  }
  componentWillUnmount(){
    clearInterval(this.t)
  }
  shouldComponentUpdate(nextProps, nextState){
    return !nextProps.pause
  }
  componentWillUpdate(nextProps, nextState){

    clearInterval(this.t)
    if (!this.props.pause ) {
      this.props.onTimerStop(this.mSec)
    }
  }
  componentDidUpdate(prevProps, prevState){
    this.mSec = 0
    this.t = setInterval(()=>{
       this.mSec = this.mSec + 1
    }, 1)
  }
  render(){
    return null
  }
}

export default Timer