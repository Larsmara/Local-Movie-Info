import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import MovieContext from "../context/movies/movieContext";
import UserContext from "../context/user/userContext";

const useStyles = makeStyles((theme) => ({
  content: {
    overflow: "hidden",
    paddingBottom: theme.spacing(2),
  },
}));

const PreviewTable = ({ files }) => {
  if (files.length === 0) {
    return null;
  }
  return (
    <TableContainer component={Paper}>
      <Table size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align='right'>Year</TableCell>
            <TableCell align='right'>Size</TableCell>
            <TableCell align='right'>Quality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((row, index) => (
            <TableRow key={row.title}>
              <TableCell>{index + 1}</TableCell>
              <TableCell component='th' scope='row'>
                {row.title}
              </TableCell>
              <TableCell align='right'>{row.year}</TableCell>
              <TableCell align='right'>{row.size}</TableCell>
              <TableCell align='right'>{row.quality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AddFolderDialog = () => {
  const classes = useStyles();
  const movieContext = useContext(MovieContext);
  const userContext = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState([]);

  const { loading, getMovies, setLoading } = movieContext;
  const { user } = userContext;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setFiles([]);
    setOpen(false);
  };

  const handleAccept = async () => {
    if (files.length !== 0) {
      await startGetMovies();
      setOpen(false);
    } else {
      console.log("Lista kan ikke være tom");
    }
  };

  const startGetMovies = () => {
    getMovies(files, user.uid);
  };

  var extensionLists = [
    "video/m4v",
    "video/avi",
    "video/mpg",
    "video/mp4",
    "video/webm",
    "video/mkv",
    "video/x-matroska",
  ];

  function isValidFileType(fType) {
    if (extensionLists.includes(fType)) {
      return true;
    } else {
      return false;
    }
  }

  const byteConverter = (bytes) => {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ["B", "KB", "MB", "GB"];
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];
  };

  const fileChange = (e) => {
    let files = [];
    var regexYear = /\d{4}/g;
    const regexN = /\b\d\b/;

    for (let file of Array.from(e.target.files)) {
      let sequel = "";
      if (isValidFileType(file.type)) {
        if (
          file.name.match(regexN) === null ||
          file.name.match(regexN)[0] === "0" ||
          file.name.match(regexN)[0] === "1" ||
          file.name.match(regexN)[0] >= "7"
        ) {
          //console.log("ikke oppfølger");
        } else {
          sequel = file.name.match(regexN)[0];
        }

        if (file.size / 1024 / 1024 < 1000) {
          //console.log("File not large enough");
        } else {
          const newFile = {
            title: file.name.split(/[0-9]/)[0]
              ? file.name.split(/[0-9]/)[0].split(".").join(" ") +
                (sequel !== "" ? "" : " ") +
                sequel
              : file.name.split(/[0-9]/),
            year:
              file.name.match(regexYear) === null
                ? "Didnt find year"
                : file.name.match(regexYear)[0] === "1080"
                ? file.name.match(regexYear)[1]
                : file.name.match(regexYear)[0],
            quality:
              file.name.match(regexYear) === null
                ? ""
                : file.name.match(regexYear)[0] === "1080"
                ? file.name.match(regexYear)[0]
                : file.name.match(regexYear)[1],
            size: byteConverter(file.size),
            type: file.type,
          };
          files.push(newFile);
        }
      }
    }
    files.sort(function (a, b) {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        // the characters are equal.
        return 0;
      }
    });
    setFiles(files);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        edge='end'
        aria-label='account of current user'
        aria-haspopup='true'
        color='inherit'
      >
        <Add />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{"Upload new movies"}</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={3}
            direction='column'
            alignItems='center'
            justify='center'
            className={classes.content}
          >
            <Grid item>
              <Button variant='contained' component='label'>
                Upload File
                <input
                  directory=''
                  webkitdirectory=''
                  type='file'
                  onChange={fileChange}
                  style={{ display: "none" }}
                />
              </Button>
            </Grid>
            <Grid Item>
              {files.length !== 0 && (
                <Typography variant='h5' gutterBottom>
                  Preview of your files
                </Typography>
              )}
              <PreviewTable files={files} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleAccept} variant='contained' color='primary'>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFolderDialog;
