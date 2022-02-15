import {
  CREATE_PROFILE,
  FAIL_PROFILE,
  GET_ALL_PROFILE,
  GET_PROFILE,
  LOAD_PROFILE,
} from "./../constants/profile";
const initialState = {
  profiles: [],
  profile: null,
  isLoad: false,
  isError: false,
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PROFILE:
      return { ...state, isLoad: true };
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        isLoad: false,
        isError: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        isLoad: false,
        isError: false,
      };
    case GET_ALL_PROFILE:
      return {
        ...state,
        profiles: payload.profiles,
        isLoad: false,
        isError: false,
      };
    case FAIL_PROFILE:
      return { ...state, isError: true, isLoad: false };
    default:
      return state;
  }
};

export default profileReducer;
