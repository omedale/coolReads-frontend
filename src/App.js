import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/Nav';
import ListBook from './components/ListBook';
import CreateBook from './components/CreateBook';
import Callback from './components/Callback';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Route exact path='/' component={ListBook} />
        <Route exact path='/create' component={CreateBook} />
        <Route exact path='/callback' component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);
