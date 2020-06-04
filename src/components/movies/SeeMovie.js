import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "hidden",
  },
  gridListTile: {
    width: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    height: 55,
    color: "#fff",
    padding: theme.spacing(1),
    top: 0,
    "&:hover": {
      background: "rgba(0, 0, 0, 0.8)",
      cursor: "pointer",
    },
  },
  dialogImage: {
    width: 300,
    height: 450,
    borderRadius: "20px",
    backgroundRepeat: "no-repeat",
  },
}));

const SeeMovie = ({ data, handleDelete }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MovieCard handleClickOpen={handleClickOpen} data={data} />
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContent className={classes.root}>
          <Grid
            container
            spacing={3}
            direction='column'
            alignItems='center'
            justify='center'
            className={classes.content}
          >
            <Grid item>
              <img src={data.Poster} alt={data.Title} className={classes.dialogImage} />
            </Grid>
          </Grid>
          <Grid container direction='column' justify='flex-start'>
            <Grid Item>
              <Typography variant='h5'>{data.Title}</Typography>
            </Grid>
            <Grid Item>
              <Typography variant='subtitle'>
                <Typography variant='button'>Released:</Typography>
                {data.Released}
              </Typography>
            </Grid>
            <Grid Item>
              <Typography variant='p' component='div'>
                {data.Released}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleDelete(data.id)} color='primary'>
            Delete Movie
          </Button>
          <Button onClick={handleClose} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default SeeMovie;
