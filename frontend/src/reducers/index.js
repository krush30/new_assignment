import { combineReducers } from "redux";
import authUsers from "./register";
import dashboardReducer from "./dashboard";

export default combineReducers({
    auth: authUsers,
    dash: dashboardReducer
})