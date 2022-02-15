import { combineReducers } from "redux";
import userReducer from "./user";
import profileReducer from "./profile";
import postReducer from "./post";
import commentReducer from "./comment";
import demandReducer from "./demand";
import adminReducer from "./admin";

const rootReducer = combineReducers({
  userReducer,
  profileReducer,
  postReducer,
  commentReducer,
  demandReducer,
  adminReducer,
});
export default rootReducer;
