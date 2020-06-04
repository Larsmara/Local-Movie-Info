import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const cardStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)",
      cursor: "pointer",
    },
  },
  media: {
    paddingTop: "56.25%",
    height: 450,
    width: 300,
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

const MovieCard = ({ data, handleClickOpen }) => {
  const classes = cardStyles();
  return (
    <Card className={classes.card} onClick={handleClickOpen}>
      <CardMedia className={classes.media} image={data.Poster} />
      <CardContent className={classes.content}>
        <Typography className={"MuiTypography--heading"} variant={"h6"} gutterBottom>
          {data.Title}
        </Typography>
        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
          {data.Released}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
