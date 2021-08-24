import { combineReducers } from "redux";
import mealsReducer from "./meals.reducer";

export default combineReducers({ meals: mealsReducer });
