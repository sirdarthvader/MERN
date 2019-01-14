/* import types from the type.js fiile and the custom built middleware to check for the empty string in action.payload
*/
import {SET_CURRENT_USER} from '../Actions/types';
import isEmpty from '../validations/is-empty';


/*Set initial state */
const initialState = {
  isAuthenticated: false,
  user: {},
};

/**
 * exported funciton, with intial state and action as params
 * @param {*} state initial state
 * @param {*} action action dipatched by theaction function
 */
export default function (state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER :
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    }
    default: 
      return state;
  }
}