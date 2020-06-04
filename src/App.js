import React, { useEffect, useContext } from "react";
import Movies from "./components/movies";
import Navbar from "./components/Navbar";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "./configs";
import UserContext from "./context/user/userContext";
import MovieContext from "./context/movies/movieContext";
import NoUser from "./views/NoUser";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  offset: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
  const movieContext = useContext(MovieContext);
  const { getMoviesFromDb, getMovieErrorsFromDb } = movieContext;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getMoviesFromDb(user.uid);
        getMovieErrorsFromDb(user.uid);
      }
    });
  }, []);

  return (
    <div>
      {user !== null ? (
        <>
          <nav>
            <Navbar />
          </nav>
          <main className={classes.content} style={{ marginTop: "60px" }}>
            <Container className={classes.offset}>
              <Movies />
            </Container>
          </main>
        </>
      ) : (
        <NoUser />
      )}
    </div>
  );
}

export default App;
