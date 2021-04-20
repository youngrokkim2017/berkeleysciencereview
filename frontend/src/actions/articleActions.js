import { getArticles } from '../util/articleApiUtil';

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

export const receiveArticles = (payload) => ({
    type: RECEIVE_ARTICLES,
    // articles
    payload
});

export const fetchArticles = () => dispatch => (
    getArticles()
        // .then(articles => dispatch(receiveArticles(articles)))
        .then(payload => dispatch(receiveArticles(payload)))
        .catch(err => console.log(err))
        // .catch(err => dispatch(receivePostErrors(err.response.data)))
);