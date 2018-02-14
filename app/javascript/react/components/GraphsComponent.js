import React, { Component } from 'react';

class Graphs extends Component {
  constructor(props){
    super(props)
    this.state = {
      upperRightContent: '',
      upperLeftContent: '',
      lowerLeftContent: '',
      lowerRightContent: ''
    }
  }

  render(){
    return(
      <div>
        <div id='upperLeftOverlay'>
          {this.state.upperRightContent}
        </div>
        <div id='upperRightOverlay'>
          {this.state.upperLeftContent}
        </div>
        <div id='lowerLeftOverlay'>
          {this.state.lowerLeftContent}
        </div>
        <div id='lowerRightOverlay'>
          {this.state.lowerRightContent}
        </div>
      </div>
    )
  }
}

export default Graphs