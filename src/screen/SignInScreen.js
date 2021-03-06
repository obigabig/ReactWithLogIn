// React core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Styles
import './App.css'; // This uses CSS modules.

const config = {
  apiKey: 'AIzaSyDQAmGCoZgz9sEPwGr-D4YgkJFZNeFbdPM',
  authDomain: 'baanheng-dev.firebaseapp.com',
  databaseURL: 'https://baanheng-dev.firebaseio.com',
  projectId: 'baanheng-dev',
  storageBucket: '',
  messagingSenderId: '1086485022003'
};

firebase.initializeApp(config);

class SignInScreen extends Component {

  componentWillMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(token => {
            this.props.signInAction(user, token, () => {
              this.props.history.push('/Dashboard');
            });
          });
      } else {
        localStorage.setItem('token', '');
      }
    });
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.props.authenticated) {
      return (
        <div className="row grey lighten-3">
          <div className="col s6">
            <p>Please sign-in:</p>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
          <div className="col s12">
            <img
              src={require('../img/mainPic.jpg')}
              alt="home pic"
              style={{ width: '100%', margin: '10px 0px 10px 0px' }}
            />
          </div>
        </div>
      );
    }

    return <div className="container" />;
  }
}

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated
  };
}

export default connect(
  mapStateToProps,
  actions
)(SignInScreen);
