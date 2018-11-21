import { GET_ERRORS, ADD_POST } from './types';

import axios from 'axios';

//Add post
export default (addPost = postData = dispatch => {
  axios
    .post('/post/add/', postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
});
