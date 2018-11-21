import { GET_ERRORS, ADD_POST, GET_POSTS, POST_LOADING, GET_POST } from './types';

import axios from 'axios';

//Add post
export const addPost = postData => dispatch => {
  axios
    .post('/api/post/', postData)
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
};

//Fetch Post
export const getPost = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/post/')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: err.response.data,
      });
    });
};

//Set post Loading

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}
