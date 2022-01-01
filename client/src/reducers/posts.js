import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../constans/actionTypes';
export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }; //denta thiyena id ekata smana id ekak hamu unoth. anna e id ekata adala tikata aluth data denna.
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state;
    }
}


// import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constans/actionTypes';
// export default (posts = [], action) => {
//     switch (action.type) {
//         case LIKE:
//             return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
//         case DELETE:
//             return posts.filter((post) => post._id !== action.payload);
//         case UPDATE:
//             return posts.map((post) => (post._id === action.payload._id ? action.payload : post)); //denta thiyena id ekata smana id ekak hamu unoth. anna e id ekata adala tikata aluth data denna.
//         case FETCH_ALL:
//             return action.payload;
//         case FETCH_BY_SEARCH:
//             return action.payload;
//         case CREATE:
//             return [...posts, action.payload];
//         default:
//             return posts;
//     }
// }