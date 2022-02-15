import {
  LOAD_POST,
  GET_ALL_POST,
  FAIL_POST,
  GET_POST,
} from "../constants/post";
const initialState = {
  posts: [],
  isLoad: false,
  isError: false,
  post: null,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POST:
      return { ...state, isLoad: true };
    case GET_ALL_POST:
      return {
        ...state,
        posts: payload.posts,
        isLoad: false,
        isError: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload.post,
        isLoad: false,
        isError: false,
      };
    case FAIL_POST:
      return { ...state, isError: true, isLoad: false };
    default:
      return state;
  }
};

export default postReducer;
