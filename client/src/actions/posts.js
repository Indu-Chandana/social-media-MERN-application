import * as api from '../api';
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, END_LOADING, START_LOADING, FETCH_POST } from '../constans/actionTypes';

// Action Creators
export const getPosts = (page) => async (dispatch) => { //pagination eken ena page eka methanin passe fetchPosts ekata denva   //methanadi export karanne post.js ekedi getPost import karapu nisa 
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page); // this {data} is comming from database. that is very amazing

        console.log(data)

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = (id) => async (dispatch) => { //pagination eken ena page eka methanin passe fetchPosts ekata denva   //methanadi export karanne post.js ekedi getPost import karapu nisa 
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id); // this {data} is comming from database. that is very amazing

        console.log(data)

        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error);
    }
}


//methanata enne form eke data, methanin api ekata deela axios haraha backend ekata yawanava.
//methaninma dispatch haraha reducers valata yawala redux vala save kara gannava.
//meke async use karala thiyenne redux-thunk valin.
export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

// export const likePost = (id) => async (dispatch) => {
//     try {
//         const { data } = await api.likePost(id);

//         dispatch({ type: 'LIKE', payload: data });
//     } catch (error) {
//         console.log(Error)
//     }
// }

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } =  await api.comment(value, id);

        console.log(data);
        
    } catch (error) {
        console.log(error.message);
    }
};