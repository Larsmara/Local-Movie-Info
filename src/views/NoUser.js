import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { withWidth, Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";
import UserContext from "../context/user/userContext";
import Image from "./moviePoster.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  gridItemPaper: {
    width: 300,
    height: 300,
    margin: theme.spacing(1),
    "& > *": {
      width: "100%",
      height: "100%",
    },
  },
}));

const cardStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing(theme.unit),
  },
  divider: {
    margin: `${theme.spacing(theme.unit) * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing(theme.unit),
    },
  },
}));

const InfoCard = () => {
  const classes = cardStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"}
      />
      <CardContent className={classes.content}>
        <Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
          Nature Around Us
        </Typography>
        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
          We are going to learn different kinds of species in nature that live together to form
          amazing environment.
        </Typography>
      </CardContent>
    </Card>
  );
};

const LandingPage = ({ width }) => {
  const classes = useStyles();
  const [form, setForm] = useState(1);
  const userContext = useContext(UserContext);
  const { loginUser, registerUser } = userContext;

  const handleFormChange = (value) => {
    setForm(value);
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
          style={{ minHeight: "100vh", display: width === "xs" ? "none" : "flex" }}
        >
          <Grid item>
            <Typography variant='h1' color='secondary'>
              Welcome to MovieInfo!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h2' color='secondary'>
              You can use this app to get
            </Typography>
            <Typography variant='h2' color='secondary'>
              information about movies thats on your local pc!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {form === 1 && <LoginForm handleFormChange={handleFormChange} login={loginUser} />}
          {form === 2 && (
            <RegisterForm handleFormChange={handleFormChange} register={registerUser} />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default withWidth()(LandingPage);
