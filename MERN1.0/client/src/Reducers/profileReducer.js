import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "../Actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

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
        loading: false,
        profile: action.payload
      };
    case CLEAR_CURRENT_PROFILE: 
    return {
      ...state,
      profile: null
    }
    default:
      return state;
  }
}
