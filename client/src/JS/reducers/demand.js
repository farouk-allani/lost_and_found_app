import {
  LOAD_DEMAND,
  ADD_DEMAND,
  FAIL_DEMAND,
  GET_ALL_DEMAND,
  GET_DEMAND,
} from "./../constants/demand";

const initialState = {
  demands: [],
  isLoad: false,
  isError: false,
  demand: null,
};

const demandReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_DEMAND:
      return { ...state, isLoad: true };
    case ADD_DEMAND:
      return {
        ...state,
        demand: payload.demand,
        isLoad: false,
        isError: false,
      };
    case GET_ALL_DEMAND:
      return {
        ...state,
        demands: payload.Demands,
        isLoad: false,
        isError: false,
      };
    case GET_DEMAND:
      return {
        ...state,
        demand: payload.demand,
        isLoad: false,
        isError: false,
      };
    case FAIL_DEMAND:
      return { ...state, isError: true, isLoad: false };
    default:
      return state;
  }
};

export default demandReducer;
