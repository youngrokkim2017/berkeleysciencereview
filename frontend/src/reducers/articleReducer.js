import {
    RECEIVE_ARTICLES,
} from '../actions/articleActions';

const ArticleReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
// const ArticleReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ARTICLES:
            newState.all = action.payload.data;
            // newState.all = action.posts.data;
            // // newState = action.posts.data;
            return newState;
        default:
            return state;
    };
};

export default ArticleReducer;