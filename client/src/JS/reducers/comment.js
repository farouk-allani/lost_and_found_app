import {
  LOAD_COMMENT,
  GET_ALL_COMMENT,
  FAIL_COMMENT,
  GET_COMMENT,
  COUNT_COMMENT,
} from "../constants/comment";
const initialState = {
  comments: [],
  isLoad: false,
  isError: false,
  comment: null,
  commentNbre: 0,
};

const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_COMMENT:
      return { ...state, isLoad: true };
    case GET_ALL_COMMENT:
      return {
        ...state,
        comments: payload.comments,
        isLoad: false,
        isError: false,
      };
    case GET_COMMENT:
      return {
        ...state,
        comment: payload.comment,
        isLoad: false,
        isError: false,
      };
    case COUNT_COMMENT:
      return {
        ...state,
        commentNbre: payload.nbre,
        isLoad: false,
        isError: false,
      };

    case FAIL_COMMENT:
      return { ...state, isError: true, isLoad: false };
    default:
      return state;
  }
};

export default commentReducer;
