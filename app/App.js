import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Home} />
        <Route path='/address' component={Address} />
      </Router>
    )
  }
}
// const Home = () => <h1>hey hey hey!</h1>
// const Address = () => <h1>We are located at 45 Pineapple, Brooklyn</h1>
export default App