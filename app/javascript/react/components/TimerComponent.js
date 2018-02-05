import React, { Component } from 'react';

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      mSec: 0
    }
    this.t = null
  }
  componentDidMount(){
    this.t = setInterval(()=>{
      this.setState({ mSec: this.state.mSec + 1 })
    }, 1)
  }
  componentWillUnmount(){
    clearInterval(this.t)
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.count !== this.props.count
  }
  componentWillUpdate(){
    clearInterval(this.t)
    this.props.onTimerStop(this.state.mSec)
  }
  componentDidUpdate(nextProps, nextState){
    this.setState({
      mSec: 0
    })
    this.t = setInterval(()=>{
      this.setState({ mSec: this.state.mSec + 1 })
    }, 1)
  }
  render(){
    return null
  }
}

export default Timer