import React from 'react'

const Target = (props) => {
  let targetClass
  if (props.gameState == 'running' && !props.pause) {
    targetClass = props.location + ' showTarget'
  } else {
    targetClass = 'hide'
  }
  return(
      <div className={targetClass} id='target' onClick={props.onHit}>
      </div>
  )
}

export default Target