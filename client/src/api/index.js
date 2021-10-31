import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

// middleware this is going to be a function thats goiing to happen on each one of our requests 
// API.interceptors.request.use((req) => {

// });

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`); this is old thin now we have post and user.
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);