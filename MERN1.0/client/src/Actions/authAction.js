//Register User...
import { GET_ERRORS } from './types';
import axios from 'axios';

export const registeruser = data => dispatch => {
  axios
  .post('/api/users/register', data)
  .then(res => console.log(res.data))
  .catch(err => 
    dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })
  );
};
