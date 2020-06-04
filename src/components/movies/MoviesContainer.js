import React, { useContext } from "react";
import MovieContext from "../../context/movies/movieContext";
import UserContext from "../../context/user/userContext";
import Movies from "./Movies";
import { Skeleton } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

const SkeletonPlaceHolder = () => {
  return (
    <Grid containerspacing={2}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
            <Grid key={value} item>
              <Skeleton variant='rect' width={300} height={450} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const AllMovies = () => {
  const movieContext = useContext(MovieContext);
  const { movies, loading, deleteMovie } = movieContext;

  const userContext = useContext(UserContext);

  const { user } = userContext;

  const [sortBy, setSortBy] = React.useState(1);
  const [category, setCategory] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (id) => {
    deleteMovie(id, user.uid);
  };

  const genreFilter = (movie) => {
    if (category !== "") {
      return movie.Genre.some((key) => key === category);
    } else {
      return movie;
    }
  };

  const comparer = (a, b) => {
    switch (sortBy) {
      case 1:
        return a.Title.localeCompare(b.Title);

      case 2:
        return b.Title.localeCompare(a.Title);

      case 3:
        return new Date(b.Released) - new Date(a.Released);

      case 4:
        return new Date(a.Released) - new Date(b.Released);

      case 5:
        return b.imdbRating - a.imdbRating;

      case 6:
        return a.imdbRating - b.imdbRating;

      default:
        return 0;
    }
  };

  const searchChange = (movie) => {
    if (search) {
      return movie.Title.toLowerCase().includes(search.toLowerCase());
    } else {
      return movie;
    }
  };

  const filterFunction = () => {
    let filtered = movies.sort(comparer).filter(genreFilter).filter(searchChange);
    return filtered;
  };

  if (loading) {
    return <SkeletonPlaceHolder />;
  }

  let newData = filterFunction();

  return (
    <Movies
      data={newData}
      sortBy={sortBy}
      category={category}
      search={search}
      handleSortByChange={handleSortByChange}
      handleCategoryChange={handleCategoryChange}
      handleSearch={handleSearch}
      handleDelete={handleDelete}
    />
  );
};
export default AllMovies;
