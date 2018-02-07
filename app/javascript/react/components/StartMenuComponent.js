import React from 'react'
import Foundation from 'react-foundation';

const StartMenu = (props) => {
  let baselineButton, enduranceButton, challengeButton
  if (props.mode == 'Baseline'){
    baselineButton = 'button'
    challengeButton = 'button secondary'
    enduranceButton = 'button secondary'
  } else if (props.mode == 'Endurance') {
    baselineButton = 'button secondary'
    challengeButton = 'button secondary'
    enduranceButton = 'button'
  } else {
    baselineButton = 'button secondary'
    challengeButton = 'button'
    enduranceButton = 'button secondary'
  }
  return(
    <div id='startMenu'>
      <div className='row'>
        <div className='small-3 columns '>
          <a href="" onClick={props.chooseBaseline} className={baselineButton}>Baseline</a>
        </div>
        <div className='small-3 columns'>
          <a href="" onClick={props.chooseEndurance} className={enduranceButton}>Endurance</a>
        </div>
        <div className='small-3 columns'>
          <a href="" onClick={props.chooseChallenge} className={challengeButton}>Challenge</a>
        </div>
      </div>
      <div className='row'>
        <div className='small-8 columns'>
          {props.description}
        </div>
      </div>
      <div className='row'>
        <a href="#" onClick={props.startGame} className="button success">Start {props.mode}</a>
      </div>
    </div>
  )
}
export default StartMenu