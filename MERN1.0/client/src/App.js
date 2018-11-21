import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decoded from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './Actions/authAction';
import { clearCurrentProfile } from './Actions/profileActions';
import store from './store';

//Private Route
import PrivateRoute from './Components/common/PrivateRoute';
//Components 
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Landing from './Components/layout/Landing';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Dashboard from './Components/dashboard/Dashboard';
import CreateProfile from './Components/create-profile/CreateProfile';
import EditProfile from './Components/edit-profile/EditProfile';
import AddExperience from './Components/add-credential/AddExperience'
import AddEducation from './Components/add-credential/AddEducation';
import Profiles from './Components/profiles/Profiles';
import Profile from './Components/profile/Profile';
import Post from './Components/posts/Post';
import NotFound from './Components/common/NotFound';


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
    store.dispatch(clearCurrentProfile());
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute 
                exact 
                path='/create-profile'
                component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                exact 
                path='/edit-profile'
                component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                exact 
                path='/add-experience'
                component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                exact 
                path='/add-education'
                component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                exact 
                path='/feed'
                component={Post}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
