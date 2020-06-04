import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { SET_USER, REMOVE_USER, REGISTER_USER, LOGIN_USER } from "../types";
import firebase from "../../configs";

const UserState = (props) => {
  const initialState = {
    loading: false,
    user: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setUser = async (user) => {
    setLoading();
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  const loginUser = async (user) => {
    setLoading();

    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((signedInUser) => {
        dispatch({
          type: LOGIN_USER,
          payload: signedInUser,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerUser = async (user) => {
    setLoading();

    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((createdUser) => {
        createdUser.user
          .updateProfile({
            displayName: user.name,
          })
          .then(() => {
            dispatch({
              type: REGISTER_USER,
              payload: createdUser,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeUser = () => {
    setLoading();
    dispatch({
      type: REMOVE_USER,
    });
  };

  const setLoading = () => dispatch({ type: setLoading });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        loginUser,
        registerUser,
        removeUser,
        setLoading,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
