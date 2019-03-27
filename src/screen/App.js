import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import * as actions from '../actions';

import './App.css';
import Header from '../components/Header';
import SignInScreen from './SignInScreen';
import DashboardScreen from './DashboardScreen';
import Page404 from './Page404';


class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header/>
          <Switch>
            <Route exact path="/" component={SignInScreen} />
            <Route exact path="/Dashboard" component={DashboardScreen} />
            <Route exact path="/404" component={Page404} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
