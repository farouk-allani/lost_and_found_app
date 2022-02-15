import axios from "axios";
import {
  LOAD_DEMAND,
  ADD_DEMAND,
  FAIL_DEMAND,
  GET_ALL_DEMAND,
  GET_DEMAND,
} from "./../constants/demand";

//@Send demand
export const addDemand = (idPost, demand) => async (dispatch) => {
  dispatch({ type: LOAD_DEMAND });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.post(
      `/api/demand/about/${idPost}`,
      demand,
      config
    );
    dispatch({ type: ADD_DEMAND, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_DEMAND });
  }
};

//@Get all demands
export const getAllDemands = (id) => async (dispatch) => {
  dispatch({ type: LOAD_DEMAND });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/demand/about/${id}`, config);
    dispatch({ type: GET_ALL_DEMAND, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_DEMAND });
  }
};

//@Get one demand
export const getDemand = (id) => async (dispatch) => {
  dispatch({ type: LOAD_DEMAND });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/demand/${id}`, config);
    dispatch({ type: GET_DEMAND, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_DEMAND });
  }
};

//@Delete one demand
export const deleteDemand = (id, idpost) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.delete(`/api/demand/${id}`, config);
    dispatch(getAllDemands(idpost));
  } catch (error) {
    dispatch({ type: FAIL_DEMAND });
  }
};

//@Update demande
export const updateDemand = (id, idpost, demand) => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    await axios.put(`/api/demand/edit/${id}`, demand, config);
    dispatch(getAllDemands(idpost));
  } catch (error) {
    dispatch({ type: FAIL_DEMAND });
  }
};
