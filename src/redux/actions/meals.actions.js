import api from "../../apiService";
import * as types from "../constants/meals.constants";

const createMeal = (option) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REQUEST });
    const res = await api.get(`/json/v1/1/search.php?s=${option}`);
    console.log(res);
    dispatch({
      type: types.CREATE_SUCCESS,
      payload: {
        data: res,
        name: option,
      },
    });
  } catch (error) {
    dispatch({ type: types.CREATE_FAILURE, payload: error });
  }
};

const updateMeal = (id, option) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_REQUEST });
    const res = await api.get(`/json/v1/1/search.php?s=${option}`);
    dispatch({
      type: types.UPDATE_SUCCESS,
      payload: {
        id,
        data: res,
        name: option,
      },
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_FAILURE, payload: error });
  }
};

const deleteMeal = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_MEAL, payload: id });
};

export const mealsActions = {
  createMeal,
  updateMeal,
  deleteMeal,
};
