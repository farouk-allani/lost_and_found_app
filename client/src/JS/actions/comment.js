import axios from "axios";
import {
  CREATE_COMMENT,
  LOAD_COMMENT,
  GET_ALL_COMMENT,
  FAIL_COMMENT,
  GET_COMMENT,
} from "../constants/comment";

//@Get all comments
export const getAllComments = (id) => async (dispatch) => {
  dispatch({ type: LOAD_COMMENT });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/post/comment/of/${id}`, config);
    dispatch({ type: GET_ALL_COMMENT, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_COMMENT });
  }
};

//@Count comments
export const coutComments = (id) => async (dispatch) => {
  dispatch({ type: LOAD_COMMENT });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/post/comment/of/${id}`, config);
    dispatch({ type: GET_ALL_COMMENT, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_COMMENT });
  }
};

//@Get one comment
export const getComment = (id) => async (dispatch) => {
  dispatch({ type: LOAD_COMMENT });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/post/comment/${id}`, config);
    dispatch({ type: GET_COMMENT, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_COMMENT });
  }
};
//@Create a comment
export const addComment = (id, comment, history) => async (dispatch) => {
  dispatch({ type: LOAD_COMMENT });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.post(`/api/post/comment/${id}`, comment, config);
    dispatch({ type: CREATE_COMMENT, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_COMMENT });
  }
};

//@Delete one comment
export const deleteComment = (id, idpost) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete(`/api/post/comment/${id}`, config);
    dispatch(getAllComments(idpost));
  } catch (error) {
    dispatch({ type: FAIL_COMMENT });
  }
};

//@Update comment
export const updateComment = (id, idpost, comment) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.put(`/api/post/comment/edit/${id}`, comment, config);
    dispatch(getAllComments(idpost));
  } catch (error) {
    dispatch({ type: FAIL_COMMENT });
  }
};
