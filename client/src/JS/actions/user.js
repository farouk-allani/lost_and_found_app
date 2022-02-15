import axios from "axios";
import {
  LOAD_USER,
  SIGN_UP_USER,
  FAIL_USER,
  SIGN_IN_USER,
  CURRENT_USER,
  LOGOUT_USER,
  CLEAR_ERRORS,
} from "../constants/user";

export const signUp = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("/api/user/signUp", user);
    //succees action
    dispatch({ type: SIGN_UP_USER, payload: result.data }); //{user,token,msg}
    // alert(result.data.success[0].msg);
    history.push("/createProfile");
  } catch (error) {
    // fail
    console.log(error);
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const signIn = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("/api/user/signIn", user);

    dispatch({ type: SIGN_IN_USER, payload: result.data }); //{msg,token,user}
    // alert(result.data.success[0].msg);;
    history.push("/myprofile");
  } catch (error) {
    dispatch({
      type: FAIL_USER,
      payload: error.response.data.errors,
    });
  }
};

export const current = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let { data } = await axios.get("/api/user/current", config);
    dispatch({ type: CURRENT_USER, payload: data }); //{msg , user}
  } catch (error) {
    dispatch({ type: LOGOUT_USER, payload: error.response.data });
  }
};

// logout
export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
