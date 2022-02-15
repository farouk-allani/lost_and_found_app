import axios from "axios";
import {
  LOAD_POST,
  GET_ALL_POST,
  FAIL_POST,
  GET_POST,
} from "../constants/post";

//@Get all posts
export const getAllposts = () => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let result = await axios.get("/api/post/all");
    dispatch({ type: GET_ALL_POST, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_POST });
  }
};

//@Get one post
export const getpost = (id) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/post/${id}`, config);
    dispatch({ type: GET_POST, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_POST });
  }
};

//@Get one post by title
export const getPostByTitle = (inputText) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let result = await axios.get(`/api/post/search/${inputText}`);
    dispatch({ type: GET_ALL_POST, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_POST });
  }
};

//@Create a post
export const createpost = (formData, history) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.post("/api/post/add", formData, config);
    dispatch(getAllposts());
    history.push("/posts");
  } catch (error) {
    dispatch({ type: FAIL_POST });
  }
};

//@Delete one post
export const deletePost = (id) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete(`/api/post/${id}`, config);
    dispatch(getAllposts());
  } catch (error) {
    dispatch({ type: FAIL_POST });
  }
};

//@Update post
export const editPost = (id, formData, history) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.put(`/api/post/edit/${id}`, formData, config);
    history.push("/posts");
  } catch (error) {
    dispatch({ type: FAIL_POST });
  }
};

//@Change post to resolved
export const changePostToResolved = (id, post) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.put(`/api/post/toresolved/${id}`, post, config);
    dispatch(getAllposts());
  } catch (error) {
    dispatch({ type: FAIL_POST });
  }
};
