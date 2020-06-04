import React, { useContext } from "react";
import MovieContext from "../context/movies/movieContext";
import UserContext from "../context/user/userContext";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AddFolderDialog from "./AddFolderDialog";
import MoviesError from "./moviesError/MoviesError";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const movieContext = useContext(MovieContext);
  const userContext = useContext(UserContext);

  const { addMoviesToDb, loading, moviesWithError } = movieContext;
  const { user } = userContext;

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Movie info
          </Typography>
          <AddFolderDialog />
          <Button
            className={classes.menuButton}
            color='secondary'
            onClick={() => addMoviesToDb(user)}
          >
            Add Movies to DB
          </Button>
          <div className={classes.grow} />
          <div>
            <MoviesError moviesWithError={moviesWithError} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
