import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Menu from './MenuContainer'
import Stats from './StatsContainer'
import GameSelection from './GameSelectionContainer'
import NavBar from '../components/NavBarComponent'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={NavBar}>
          <IndexRoute component={GameSelection} />
          <Route path='stats' component={Stats} />
        </Route>
      </Router>
    )
  }
}

export default App