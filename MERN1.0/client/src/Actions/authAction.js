//Register User...
import { GET_ERRORS } from './types';
import axios from 'axios';

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
