import {
  SET_LOADING,
  GET_MOVIES,
  MOVIES_ERROR,
  ADD_MOVIES,
  RESET_LOADING,
  DELETE_ERROR_MOVIE,
  DELETE_MOVIE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case RESET_LOADING:
      return {
        ...state,
        loading: false,
      };

    case ADD_MOVIES:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        loading: false,
      };

    case GET_MOVIES:
      return {
        ...state,
        newMovies: [...state.newMovies, action.payload],
        loading: false,
      };

    case MOVIES_ERROR:
      return {
        ...state,
        moviesWithError: [...state.moviesWithError, action.payload],
        loading: false,
      };

    case DELETE_ERROR_MOVIE:
      return {
        ...state,
        moviesWithError: state.moviesWithError.filter((movie) => movie.id !== action.payload),
        loading: false,
      };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };

    default:
      return state;
  }
};
