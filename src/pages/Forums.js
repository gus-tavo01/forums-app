import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadForums } from '../redux/actions/forums-actions';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PageTitle from '../components/PageTitle';
import ForumsList from '../components/ForumsList';
// constants
import ForumSizes from '../constants/ForumSizes';

const useStyles = makeStyles(() => ({
  input: {
    margin: '10px 0px',
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
    minHeight: '500px',
    minWidth: '400px',
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
  const [size, setSize] = useState('');
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [page, setPage] = useState(1);

  const classes = useStyles();
  const dispatch = useDispatch();
  const forums = useSelector((store) => store.forums);

  console.log('on render');

  const onSubmit = () => {
    // Step prepare request
    const filters = { page, size, author, name };
    // Step dispatch get forums
    dispatch(loadForums(filters));

    // Step close modal if its open
    if (filtersOpen) {
      setFiltersOpen(false);
    }
  };

  const onPageChange = (ev, value) => {
    setPage(value);
    onSubmit();
  };

  const handleClose = () => {
    setFiltersOpen(false);
  };

  const handleOpenFilters = () => {
    setFiltersOpen(true);
  };

  const handleName = (ev) => {
    setName(ev.target.value);
  };

  const handleAuthor = (ev) => {
    setAuthor(ev.target.value);
  };

  const handleForumSize = (ev) => {
    setSize(ev.target.value);
  };

  return (
    <Grid container justify="center" spacing={3}>
      <Paper className={classes.paper}>
        <PageTitle>Public forums</PageTitle>
        <Grid container item direction="column">
          <Grid container item justify="space-evenly">
            <TextField
              label="Forum name"
              type="search"
              variant="outlined"
              size="small"
              onChange={handleName}
            />
            <div>
              <Button
                onClick={onSubmit}
                color="primary"
                variant="contained"
                startIcon={<SearchOutlinedIcon />}
              >
                Search
              </Button>
            </div>
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
              count={forums.totalPages}
              defaultPage={1}
              page={page}
              siblingCount={0}
              boundaryCount={2}
              onChange={onPageChange}
              variant="outlined"
              color="secondary"
              showFirstButton
              showLastButton
            />
          </Container>
          <Grid container item direction="column" alignItems="center">
            <ForumsList forums={forums.docs} />
          </Grid>
        </Grid>
        <Dialog open={filtersOpen} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Forum Search Filters</DialogTitle>
          <DialogContent className={classes.form}>
            <TextField
              label="Forum name"
              variant="outlined"
              fullWidth
              onChange={handleName}
              value={name}
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              onChange={handleAuthor}
              value={author}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-size">Forum Size</InputLabel>
              <Select
                labelId="select-size"
                value={size}
                onChange={handleForumSize}
                label="Forum Size"
              >
                <MenuItem value={ForumSizes.open.label}>
                  I dont care ({ForumSizes.open.from} - {ForumSizes.open.to})
                </MenuItem>
                <MenuItem value={ForumSizes.small.label}>
                  {ForumSizes.small.label} ({ForumSizes.small.from} -{' '}
                  {ForumSizes.small.to})
                </MenuItem>
                <MenuItem value={ForumSizes.medium.label}>
                  {ForumSizes.medium.label} ({ForumSizes.medium.from} -{' '}
                  {ForumSizes.medium.to})
                </MenuItem>
                <MenuItem value={ForumSizes.large.label}>
                  {ForumSizes.large.label} ({ForumSizes.large.from} -{' '}
                  {ForumSizes.large.to})
                </MenuItem>
                <MenuItem value={ForumSizes.xLarge.label}>
                  {ForumSizes.xLarge.label} ({ForumSizes.xLarge.from} -{' '}
                  {ForumSizes.xLarge.to})
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grid>
  );
}

export default Forums;
