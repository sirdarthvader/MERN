import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from "./types";

///Get current profile
export const getCurrentProfile = () => dispacth => {
  dispacth(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispacth({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispacth({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
