import axios from "axios";
import {
  FAIL_DATA_CHART,
  GET_DATA_CHART,
  LOAD_DATA_CHART,
} from "../constants/admin";

//@Get data chart
export const getDataChart = () => async (dispatch) => {
  dispatch({ type: LOAD_DATA_CHART });
  const config = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/api/admin/posts/resolved`, config);
    dispatch({ type: GET_DATA_CHART, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_DATA_CHART });
  }
};
