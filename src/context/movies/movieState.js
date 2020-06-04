import React, { useReducer } from "react";
import MovieContext from "./movieContext";
import MovieReducer from "./movieReducer";
import {
  SET_LOADING,
  ADD_MOVIES,
  GET_MOVIES,
  MOVIES_ERROR,
  RESET_LOADING,
  DELETE_ERROR_MOVIE,
  DELETE_MOVIE,
} from "../types";
import axios from "axios";
import firebase from "../../configs";

const MovieState = (props) => {
  const initialState = {
    movies: [],
    newMovies: [],
    moviesWithError: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(MovieReducer, initialState);

  const getMovies = (movies, userId) => {
    setLoading();

    movies.forEach(async (movie) => {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=e218537c&t=${movie.title}&y=${movie.year}`
      );

      const data = {
        ...movie,
        ...res.data,
      };

      if (res.data.Error) {
        dispatch({
          type: MOVIES_ERROR,
          payload: data,
        });
        addErrorsToDb(data, userId);
      } else {
        const data = {
          ...res.data,
          Genre: [...res.data.Genre.split(", ")],
          Actors: [...res.data.Actors.split(", ")],
          quality: movie.quality,
          size: movie.size,
          type: movie.type,
        };
        dispatch({
          type: GET_MOVIES,
          payload: data,
        });
      }
    });
  };

  const addErrorsToDb = async (movie, userId) => {
    if (movie.year === undefined || null) {
      movie.year = "";
    }
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("movieErrors")
      .add(movie)
      .then(() => {
        dispatch({ type: RESET_LOADING });
      })
      .catch((error) => console.log(error));
  };

  const addMoviesToDb = async (user) => {
    const userId = user.uid;
    let numberOfMoviesAdded = 0;
    await state.newMovies.forEach((movie) => {
      if (movie.quality === undefined || null) {
        movie.quality = "";
      }
      if (movie.year === undefined || null) {
        movie.year = "";
      }
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("movies")
        .add({ ...movie, added: new Date() })
        .then(() => {
          numberOfMoviesAdded += 1;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    if (numberOfMoviesAdded === state.newMovies.length) {
      console.log("All movies added");
    } else {
      console.log("Not all Movies where added");
    }
  };

  const getMoviesFromDb = async (userId) => {
    setLoading();
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("movies")
      .get()
      .then((snapshot) => {
        snapshot.forEach(function (doc) {
          dispatch({
            type: ADD_MOVIES,
            payload: {
              ...doc.data(),
              id: doc.id,
            },
          });
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: RESET_LOADING,
        });
      });
  };

  const getMovieErrorsFromDb = async (userId) => {
    setLoading();
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("movieErrors")
      .get()
      .then((snapshot) => {
        snapshot.forEach(function (doc) {
          dispatch({
            type: MOVIES_ERROR,
            payload: {
              ...doc.data(),
              id: doc.id,
            },
          });
        });
      });
  };

  const deleteMovieWithError = async (id, userId) => {
    setLoading();
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("movieErrors")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_ERROR_MOVIE,
          payload: id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMovie = async (id, userId) => {
    setLoading();
    await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("movies")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_MOVIE,
          payload: id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        newMovies: state.newMovies,
        moviesWithError: state.moviesWithError,
        loading: state.loading,
        getMovies,
        setLoading,
        addMoviesToDb,
        getMoviesFromDb,
        getMovieErrorsFromDb,
        deleteMovieWithError,
        deleteMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
