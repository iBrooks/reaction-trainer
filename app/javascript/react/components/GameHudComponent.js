import React from 'react'

const GameHud = (props) => {
  return(
    <div className='row' id='gameHud'>
      <div className='small-1 columns'>
        <i className="fa fa-expand-arrows-alt"></i>
        {props.hits}
      </div>
      <div className='small-1 columns'>
        <i className="fa fa-expand"></i>
        {props.misses}
      </div>
      <div className='small-2 columns'>
        <i className="fa fa-bullseye"></i>
        {props.currentCount}/ {props.totalTargets}
      </div>
      <div className='small-1 columns'>
        <i className="fa fa-times-circle"></i>{props.missed}
      </div>
      <div className='small-1 columns'>
        <i className="fa fa-crosshairs"></i> {props.accuracy}
      </div>
      <div className='small-2 columns'>
        <i className="fa fa-adjust"></i>{props.percentage}
      </div>
      <div className='small-2 columns'>
        {props.gameMode}
      </div>
      <div className='small-1 columns'>
        <i className="fa fa-clock"></i>{props.elapsed}
      </div>
      <div className='small-1 columns'>
        <i className="fa fa-pause-circle fa-3x" onClick={props.pause}></i>
      </div>
    </div>
  )
}

export default GameHud
