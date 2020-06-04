import React from "react";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Search, Inbox, Mail } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

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
    width: "100%",
    paddingRight: theme.spacing(2),
  },
  formLabel: {
    alignItems: "center",
    paddingRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Dance",
  "Disaster",
  "Documentary",
  "Drama",
  "Erotic",
  "Family",
  "Fantasy",
  "Found Footage",
  "Historical",
  "Horror",
  "Independent",
  "Legal",
  "Live Action",
  "Martial Arts",
  "Musical",
  "Mystery",
  "Noir",
  "Performance",
  "Political",
  "Romance",
  "Satire",
  "Sci-Fi",
  "Short",
  "Silent",
  "Slasher",
  "Sports",
  "Spy",
  "Superhero",
  "Supernatural",
  "Suspense",
  "Teen",
  "Thriller",
  "War",
  "Western",
];

const MovieFilters = ({
  sortBy,
  category,
  search,
  handleSortByChange,
  handleCategoryChange,
  handleSearch,
}) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>Sort by</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={sortBy}
                onChange={handleSortByChange}
                label='Sort by'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Title (A-Z)</MenuItem>
                <MenuItem value={2}>Title (Z-A)</MenuItem>
                <MenuItem value={3}>Release Date Descending</MenuItem>
                <MenuItem value={4}>Release Date Ascending</MenuItem>
                <MenuItem value={5}>Rating Descending</MenuItem>
                <MenuItem value={6}>Rating Ascending</MenuItem>
              </Select>
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel id='demo-simple-select-outlined-label'>Genres</InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                value={category}
                onChange={handleCategoryChange}
                label='Genres'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {genres.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>

          <ListItem>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-amount'>Search..</InputLabel>
              <OutlinedInput
                id='outlined-adornment-amount'
                value={search}
                onChange={handleSearch}
                placeholder='Search..'
                startAdornment={
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default MovieFilters;
