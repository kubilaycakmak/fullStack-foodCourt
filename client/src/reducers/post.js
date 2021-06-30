import * as types from '../actions/types';

const initState = {
    posts: [],
};

const postReducer = 
(state = initState, action) => {
    switch(action.type) {
        case types.FETCH_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case types.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        default:
            return {
                ...state
            };
    }
}

export default postReducer;
