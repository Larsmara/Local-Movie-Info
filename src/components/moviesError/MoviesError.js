import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Badge, TextField, Grid, Paper, ListItemSecondaryAction } from "@material-ui/core";
import { Mail, Delete } from "@material-ui/icons";
import MovieContext from "../../context/movies/movieContext";
import UserContext from "../../context/user/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  item1: {
    order: 1,
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
  },
  item2: {
    order: 2,
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const MoviesError = ({ moviesWithError }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const movieContext = useContext(MovieContext);
  const userContext = useContext(UserContext);

  const { deleteMovieWithError } = movieContext;
  const { user } = userContext;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteMovie = (id) => {
    deleteMovieWithError(id, user.uid);
  };

  return (
    <div>
      <IconButton aria-label='show 4 new mails' color='inherit' onClick={handleClickOpen}>
        <Badge badgeContent={moviesWithError.length} color='secondary'>
          <Mail />
        </Badge>
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Movies that wasnt found
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClose}>
              OK
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={2}>
              <Grid item sm={4} className={classes.item1}>
                <Paper className={classes.paper}>
                  <List>
                    {moviesWithError.length !== 0 ? (
                      <>
                        {moviesWithError.map((movie) => (
                          <>
                            <ListItem key={movie}>
                              <ListItemText primary={movie.title} secondary={movie.year} />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge='end'
                                  aria-label='delete'
                                  color='secondary'
                                  onClick={() => deleteMovie(movie.id)}
                                >
                                  <Delete />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                          </>
                        ))}
                      </>
                    ) : (
                      <ListItem>
                        <ListItemText primary='You have nothing here. Everything is working fine :)' />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>
              <Grid item sm={4} className={classes.item2}>
                <Paper className={classes.paper}>
                  <List>
                    <ListItem>
                      <div>
                        <ListItemText primary='Search for the movies here and add them to your list now!' />
                        <TextField
                          fullWidth
                          id='standard-search'
                          label='Search field'
                          type='search'
                        />
                      </div>
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default MoviesError;
