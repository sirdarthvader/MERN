/**
 * import action types fromr the file and set the initial state to be handled by the reducer
 */
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from "../Actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};



/**
 * exported funciton, with intial state and action as params
 * @param {*} state initial state
 * @param {*} action action dipatched by theaction function
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_PROFILE: 
    return {
      ...state,
      profile: null
    }
    default:
      return state;
  }
}
