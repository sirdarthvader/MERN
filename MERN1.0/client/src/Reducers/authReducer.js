import { TEST_DISPATCH } from '../Actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_DISPATCH: 
        return {
            ...state,
            user: action.payload
        };
        default: 
        return state;
    }
}