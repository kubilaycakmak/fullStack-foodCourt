import axios from 'axios';
const apiBaseUrl = "http://localhost:5000";
const posts = '/posts/'
export const fetchPosts =
    async () => await axios.get(apiBaseUrl + posts);

export const fetchSinglePost =
    async (id) => await axios.get(`${apiBaseUrl + posts}${id}`);

export const createPost =
    async (post) => await axios.post(apiBaseUrl + posts, post);