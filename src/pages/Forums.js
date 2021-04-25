import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import Pagination from '@material-ui/lab/Pagination';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
// actions
import { loadForums } from '../redux/actions/forums-actions';
import PageTitle from '../components/PageTitle';
import ForumsList from '../components/ForumsList';
// constants
import ForumSizes from '../constants/ForumSizes';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '10px 0px',
  },
  paginationContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    padding: theme.spacing(1),
    minWidth: '300px',
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

const defaultFilters = { size: '', name: '', author: '' };

function Forums() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const classes = useStyles();
  const dispatch = useDispatch();
  const forums = useSelector((store) => store.forums);
  const pageLoaders = useSelector((store) => store.loaders.forums);

  const onSubmit = () => {
    // Step dispatch get forums
    dispatch(loadForums({ ...filters, page }));
  };

  const onPageChange = (ev, value) => {
    setPage(value);
    onSubmit();
  };

  const handleClose = () => {
    setFiltersOpen(false);
  };

  const handleClear = () => {
    setFilters(defaultFilters);
  };

  const handleOpenFilters = () => {
    setFiltersOpen(true);
  };

  const handleInput = (ev) => {
    const { target } = ev;
    const newFilters = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };

  return (
    <Grid container justify="center" className={classes.root}>
      <PageTitle content="Public forums" />
      <Grid container item direction="column">
        <Grid container item justify="center" alignItems="center">
          <Tooltip title="Filters">
            <IconButton onClick={handleOpenFilters}>
              <FilterListOutlinedIcon />
            </IconButton>
          </Tooltip>
          <TextField
            label="Forum name"
            type="search"
            variant="outlined"
            size="small"
            onChange={handleInput}
            value={filters.name}
            name="name"
          />
          <Tooltip title="Search">
            <IconButton onClick={onSubmit}>
              <SearchOutlinedIcon />
            </IconButton>
          </Tooltip>
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
            disabled={!forums.docs.length}
          />
        </Container>
        <Grid container item direction="column" alignItems="center" justify="center">
          {pageLoaders.list ? <CircularProgress size={80} /> : <ForumsList forums={forums.docs} />}
        </Grid>
      </Grid>
      <Dialog open={filtersOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Forum Search Filters</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            label="Forum name"
            variant="outlined"
            fullWidth
            onChange={handleInput}
            value={filters.name}
            name="name"
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            onChange={handleInput}
            value={filters.author}
            name="author"
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-size">Forum Size</InputLabel>
            <Select
              labelId="select-size"
              value={filters.size}
              onChange={handleInput}
              label="Forum Size"
              name="size"
            >
              <MenuItem value={ForumSizes.open.label}>
                I dont care ({ForumSizes.open.from} - {ForumSizes.open.to})
              </MenuItem>
              <MenuItem value={ForumSizes.small.label}>
                {ForumSizes.small.label} ({ForumSizes.small.from} - {ForumSizes.small.to})
              </MenuItem>
              <MenuItem value={ForumSizes.medium.label}>
                {ForumSizes.medium.label} ({ForumSizes.medium.from} - {ForumSizes.medium.to})
              </MenuItem>
              <MenuItem value={ForumSizes.large.label}>
                {ForumSizes.large.label} ({ForumSizes.large.from} - {ForumSizes.large.to})
              </MenuItem>
              <MenuItem value={ForumSizes.xLarge.label}>
                {ForumSizes.xLarge.label} ({ForumSizes.xLarge.from} - {ForumSizes.xLarge.to})
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={handleClear} variant="outlined">
            Clear all
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Okie
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Forums;
