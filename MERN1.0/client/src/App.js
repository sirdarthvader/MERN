import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decoded from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './Actions/authAction';
import store from './store';

//Components 
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Landing from './Components/layout/Landing';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Dashboard from './Components/dashboard/Dashboard';

import './App.css';

//Set authorization token upon refresh
if(localStorage.jwtToken) {
  //then set auth token
  setAuthToken(localStorage.jwtToken);
  //decode stored token for user info and exp
  const decoded = jwt_decoded(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for token expiry token 
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //logout user
    store.dispatch(logOutUser());
    //clear current profile
    store.dispatch(clearCurrentUser());
    //redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
