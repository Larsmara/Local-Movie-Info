import React from "react";
import { Grid, Paper, FormLabel } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import SeeMovie from "./SeeMovie";
import MovieFilters from "./MovieFilters";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  gridListTile: {
    "&:hover": {
      background: "rgba(0, 0, 0, 0.8)",
      cursor: "pointer",
    },
  },
  paper: {
    width: 300,
    height: 450,
  },
  control: {
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
    paddingRight: theme.spacing(2),
  },
  formLabel: {
    alignItems: "center",
    paddingRight: theme.spacing(2),
  },
}));

const Movies = ({
  data,
  sortBy,
  category,
  handleSortByChange,
  handleCategoryChange,
  search,
  handleSearch,
  handleDelete,
}) => {
  const classes = useStyles();

  let unique = [...new Set(data)];
  
  return (
    <div className={classes.root}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <MovieFilters
                sortBy={sortBy}
                category={category}
                search={search}
                handleSortByChange={handleSortByChange}
                handleCategoryChange={handleCategoryChange}
                handleSearch={handleSearch}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={3}>
            {unique.map((value) => (
              <Grid key={value.Title} item>
                <SeeMovie data={value} handleDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Movies;
