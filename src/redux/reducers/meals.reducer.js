import * as types from "../constants/meals.constants";
import { toast } from "react-toastify";

const initialState = {
  meals: [],
  loading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // CREATE
    case types.CREATE_REQUEST:
      state.loading = true;
      break;
    case types.CREATE_SUCCESS:
      const isCreated = state.meals.find(
        (el) => el.name.toLowerCase() === payload.name.toLowerCase()
      );
      if (isCreated) {
        if (localStorage.getItem("i18nextLng") === "en") {
          toast.error("The meal's name already exists!");
        } else {
          toast.error("Tên món ăn đã tồn tại!");
        }
      } else {
        state.meals = [
          ...state.meals,
          {
            id: Date.now(),
            name: payload.name,
            count: payload.data.data.meals ? payload.data.data.meals.length : 0,
          },
        ];
      }
      state.loading = false;
      break;
    case types.CREATE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    // UPDATE
    case types.UPDATE_REQUEST:
      state.loading = true;
      break;
    case types.UPDATE_SUCCESS:
      const isUpdated = state.meals.find(
        (el) => el.name.toLowerCase() === payload.name.toLowerCase()
      );
      if (isUpdated) {
        toast.error("The meal's name already exists!");
      } else {
        const updateMeals = state.meals.map((meal) => {
          if (meal.id === payload.id) {
            meal.name = payload.name;
            meal.count = payload.data.data.meals
              ? payload.data.data.meals.length
              : 0;
          }
          return meal;
        });
        state.meals = updateMeals;
      }
      state.loading = false;
      break;
    case types.UPDATE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;
    // DELETE
    case types.DELETE_MEAL:
      state.meals = state.meals.filter((el) => el.id !== payload);
      break;
    default:
      return state;
  }

  return { ...state };
};

export default authReducer;
