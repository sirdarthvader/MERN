import { GET_ERRORS } from './types';
import axios from 'axios';
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
  })
  .catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}
