import { GET_ERRORS } from '../Actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
