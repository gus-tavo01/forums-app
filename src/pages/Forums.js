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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { getForums } from '../redux/actions/forums-actions';
import PageTitle from '../components/PageTitle';
import ForumsList from '../components/ForumsList';

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    minWidth: 120,
    margin: '1px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const defaultFilters = { topic: '', author: '', active: '', public: true };

function Forums() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const { isLoggedIn } = useSelector((store) => store.auth);
  const forums = useSelector((store) => store.forums);

  const handleSubmit = () => {
    // get forums
    dispatch(getForums({ ...filters, page }));
  };

  const onPageChange = (ev, value) => {
    setPage(value);
    handleSubmit();
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

  const handleInput = ({ target }) => {
    const newFilters = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };

  const handleOnPrivateCheck = ({ target }) => {
    setFilters({ ...filters, public: !target.checked });
  };

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <PageTitle content="Forums search" />
      <Grid container item direction="column">
        <Grid container item justifyContent="center" alignItems="center">
          <Tooltip title="Filters">
            <IconButton onClick={handleOpenFilters}>
              <FilterListOutlinedIcon />
            </IconButton>
          </Tooltip>
          <TextField
            label="Forum topic"
            type="search"
            variant="outlined"
            size="small"
            onChange={handleInput}
            value={filters.topic}
            name="topic"
          />
          <Tooltip title="Search">
            <IconButton onClick={handleSubmit}>
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
            disabled={!forums.docs?.length}
          />
        </Container>
        <Grid container item direction="column" alignItems="center" justifyContent="center">
          {forums.fetching && <CircularProgress size={80} />}
          <ForumsList forums={forums.docs || []} />
        </Grid>
      </Grid>
      <Dialog open={filtersOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Forum Search Filters</DialogTitle>
        <DialogContent className={classes.form}>
          <TextField
            label="Forum topic"
            variant="outlined"
            fullWidth
            onChange={handleInput}
            value={filters.topic}
            name="topic"
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            onChange={handleInput}
            value={filters.author}
            name="author"
          />
          <FormControl variant="outlined">
            <InputLabel id="select-active">Forum status</InputLabel>
            <Select
              labelId="select-active"
              value={filters.active}
              onChange={handleInput}
              label="Forum status"
              name="active"
            >
              <MenuItem value>Active only</MenuItem>
              <MenuItem value={false}>Inactive only</MenuItem>
            </Select>
          </FormControl>

          <div>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-sortBy">Sort by</InputLabel>
              <Select
                labelId="select-sortBy"
                value={filters.sortBy}
                onChange={handleInput}
                label="Sort by"
                name="sortBy"
              >
                <MenuItem value="topic">Topic</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="createDate">Creation date</MenuItem>
                <MenuItem value="lastActivity">Activity date</MenuItem>
                <MenuItem value="isActive">Status</MenuItem>
                <MenuItem value="isPrivate">Scope</MenuItem>
                <MenuItem value="participants">Participants</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="select-sortOrder">Sort order</InputLabel>
              <Select
                labelId="select-sortOrder"
                value={filters.sortOrder}
                onChange={handleInput}
                label="Sort order"
                name="sortOrder"
              >
                <MenuItem value="asc">Ascendent</MenuItem>
                <MenuItem value="desc">Descendent</MenuItem>
              </Select>
            </FormControl>
          </div>

          {isLoggedIn && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.public === false}
                  onChange={handleOnPrivateCheck}
                  name="public"
                  color="primary"
                />
              }
              label="Include private forums"
            />
          )}
        </DialogContent>
        <Divider />
        <DialogActions className={classes.actions}>
          <Button onClick={handleClear} variant="outlined">
            Clear all
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Add filters
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Forums;
