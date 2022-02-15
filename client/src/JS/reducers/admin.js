import {
  FAIL_DATA_CHART,
  GET_DATA_CHART,
  LOAD_DATA_CHART,
} from "../constants/admin";

const initialState = {
  isLoad: false,
  isError: false,
  dataChart: null,
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_DATA_CHART:
      return { ...state, isLoad: true };
    case GET_DATA_CHART:
      return {
        ...state,
        dataChart: payload.dataChart,
        isLoad: false,
        isError: false,
      };

    case FAIL_DATA_CHART:
      return { ...state, isError: true, isLoad: false };
    default:
      return state;
  }
};

export default adminReducer;
