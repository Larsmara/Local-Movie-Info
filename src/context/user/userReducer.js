import { LOGIN_USER, REMOVE_USER, SET_LOADING, REGISTER_USER, SET_USER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case REMOVE_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};
