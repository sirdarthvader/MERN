import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import jwt_decoded from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';


//Register User...
export const registeruser = (data, history) => dispatch => {
  axios
  .post('/api/users/register', data)
  .then(res => history.push('/login'))
  .catch(err => 
    dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })
  );
};

//Get login token ...

export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
  .then(res => {
    //Set token to local storage
    const { token }  = res.data;
    //Save to localstorage
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    //decode token
    const decoded = jwt_decoded(token);

    dispatch(setCurrentUser(decoded));

  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

//set logged in user 
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
