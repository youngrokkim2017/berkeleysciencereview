import axios from 'axios';

export const getArticles = () => {
    return axios.get('https://localhost:1337/articles');
};