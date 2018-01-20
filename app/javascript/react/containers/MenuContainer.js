import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';


class Menu extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  // componentDidMount(){
  //   fetch('/api/v1/cereals.json')
  //   .then(response => {
  //     if (!response.ok) {
  //       throw Error(response.statusText)
  //     }
  //   return response
  //   })
  //   .then(response =>{
  //     let data = response.json()
  //     return data
  //   })
  //   .then(data =>{
  //   this.setState({cereals: data['cereals']})
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }
  render(){
    return(
      <div>
        <h1>Hello from Menu</h1>
      </div>
    )
  }
}
export default Menu