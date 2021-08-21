import axios from 'axios';
const apiBaseUrl = "https://foodcourt-backend.herokuapp.com";
const posts = '/posts/'
export const fetchPosts =
    async () => await axios.get(apiBaseUrl + posts);

export const fetchSinglePost =
    async (id) => await axios.get(`${apiBaseUrl + posts}${id}`);

export const createPost =
    async (post) => await axios.post(apiBaseUrl + posts, post);

    
export const updatePost =
    async (id, updatedPost) => await axios.patch(`${apiBaseUrl + posts}${id}`, updatedPost);


export const deletePost =
    async (id) => await axios.delete(`${apiBaseUrl + posts}${id}`);