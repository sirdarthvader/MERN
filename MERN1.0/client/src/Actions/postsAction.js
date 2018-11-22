import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  GET_POST,
  CLEAR_ERRORS,
  DELETE_POST
} from "./types";

import axios from "axios";

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/post', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

//Fetch Post
export const getPost = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/post/")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: err.response.data
      });
    });
};

//Delete post
export const deletePost = (id) => dispatch => {
  if(window.confirm) {
    axios.delete(`/api/post/${id}`)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: id
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
  }
}

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/post/like/${id}`, id)
    .then(res =>
      dispatch(getPost())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/post/unlike/${id}`, id)
    .then(res =>
      dispatch(getPost())
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Show Single Post
export const getSinglePost = (id) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/post/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: err.response.data
      });
    });
};

// Add Comment
export const addComment = (postId, newComment) => dispatch => {
  axios
    .post(`/api/post/comment/${postId}`, newComment)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

//Set post Loading

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
