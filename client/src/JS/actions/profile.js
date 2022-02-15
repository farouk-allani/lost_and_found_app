import axios from "axios";
import {
  FAIL_PROFILE,
  GET_PROFILE,
  GET_ALL_PROFILE,
  LOAD_PROFILE,
} from "../constants/profile";
import { current } from "./user";

//@Create profile
export const createProfile = (profile, history) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.post("/api/profile", profile, config);
    dispatch(getMyProfile());
    history.push("/myprofile");
  } catch (error) {
    dispatch({ type: FAIL_PROFILE });
  }
};

//@Get my profile
export const getMyProfile = () => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/profile/myprofile`, config);
    dispatch({ type: GET_PROFILE, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PROFILE });
  }
};

//@Edit profile
export const editMyProfile = (id, formData, history) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  dispatch({ type: LOAD_PROFILE });
  try {
    await axios.put(`/api/profile/edit/${id}`, formData, config);
    dispatch(current());
    dispatch(getMyProfile());
    history.push("/myprofile");
  } catch (error) {
    dispatch({ type: FAIL_PROFILE });
  }
};

//@Get other profile
export const getOtherProfile = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/profile/${id}`, config);
    dispatch({ type: GET_PROFILE, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PROFILE });
  }
};

//@Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/profile/all`, config);
    dispatch({ type: GET_ALL_PROFILE, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PROFILE });
  }
};

//@Delete profile
export const deleteProfile = (id) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete(`/api/profile/${id}`, config);
    dispatch(getAllProfiles());
  } catch (error) {
    dispatch({ type: FAIL_PROFILE });
  }
};
