import axios from 'axios';
const apiBaseUrl = "http://localhost:5000";
const posts = '/posts/'
export const fetchPosts = 
    async () => await axios.get(apiBaseUrl + posts);

export const createPost = 
    async (post) => await axios.post(apiBaseUrl + posts, post);