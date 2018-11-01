import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decoded from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './Actions/authAction';
import store from './store';

//Components 
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Landing from './Components/Layout/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

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
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
