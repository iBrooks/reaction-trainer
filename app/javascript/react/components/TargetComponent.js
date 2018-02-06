import React from 'react'

const Target = (props) => {
  return(
    <div className={props.location}>
      <i className="fa fa-square fa-3x" onClick={props.onHit}></i>
    </div>
  )
}

export default Target