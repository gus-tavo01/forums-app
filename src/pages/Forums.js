import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadForums } from '../redux/actions/forums-actions';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PageTitle from '../components/PageTitle';
import ForumsList from '../components/ForumsList';

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px 0px',
  },
  search: {
    marginLeft: '20px',
  },
  paginationContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    marginTop: 15,
    padding: 15,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '10px 0px',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

function Forums() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const forums = useSelector((store) => store.forums);

  console.log('on render');

  const onSubmit = () => {
    console.log('Submit forums search');
    dispatch(loadForums({ page: 1 }));
  };

  const onPageChange = () => {
    console.log('page change');
  };

  const handleClose = () => {
    setFiltersOpen(false);
  };

  const handleOpenFilters = () => {
    setFiltersOpen(true);
  };

  return (
    <Grid container justify="center" spacing={3}>
      <Paper className={classes.paper}>
        <PageTitle>Public forums</PageTitle>
        <Grid container item direction="column">
          <Grid container item justify="center">
            <TextField label="Forum name" type="search" variant="outlined" />
            <Button
              className={classes.search}
              onClick={onSubmit}
              color="primary"
              variant="contained"
              size="small"
              startIcon={<SearchOutlinedIcon />}
            >
              Search
            </Button>
          </Grid>
          <Grid container item justify="center">
            <Button
              className={classes.input}
              onClick={handleOpenFilters}
              color="secondary"
              variant="outlined"
            >
              Add filters
            </Button>
          </Grid>
          <Container className={classes.paginationContainer}>
            <Pagination
              count={11}
              defaultPage={1}
              page={1}
              siblingCount={0}
              boundaryCount={2}
              onChange={onPageChange}
              variant="outlined"
              color="secondary"
              showFirstButton
              showLastButton
            />
          </Container>
          <Grid container item direction="column" justify="center">
            <ForumsList forums={forums} />
          </Grid>
        </Grid>
        <Dialog open={filtersOpen} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Forum Search Filters</DialogTitle>
          <DialogContent className={classes.form}>
            <TextField label="Forum name" variant="outlined" fullWidth />
            <TextField label="Author" variant="outlined" fullWidth />
            <TextField
              label="Participants"
              type="number"
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grid>
  );
}

export default Forums;
