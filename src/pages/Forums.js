import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// #region mui components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import Pagination from '@material-ui/lab/Pagination';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// #endregion mui components
import { getForums } from '../redux/actions/forums-actions';

import PageTitle from '../components/PageTitle';
import ForumsList from '../components/ForumsList';
import ForumFiltersFormDialog from '../components/ForumFiltersFormDialog';
import ForumCreateFormDialog from '../components/ForumCreateFormDialog';

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
}));

const defaultFilters = {
  topic: '',
  author: '',
  isActive: '',
  public: '',
  sortBy: '',
  sortOrder: '',
};
const defaultCreateForumInputs = {
  topic: '',
  description: '',
  imageSrc: '',
  isPrivate: '',
};

function Forums() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const [createForumOpen, setCreateForumOpen] = useState(false);
  const [createForumInputs, setCreateForumInputs] = useState(defaultCreateForumInputs);

  const { isLoggedIn } = useSelector((store) => store.auth);
  const forums = useSelector((store) => store.forums);

  const handleOpenFilters = () => {
    setFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const handleFilterChange = ({ target }) => {
    const newFilters = { ...filters, [target.name]: target.value };
    setFilters(newFilters);
  };

  const handleSearchSubmit = () => {
    dispatch(getForums({ ...filters, page }));
  };

  const onPageChange = (ev, value) => {
    setPage(value);
    handleSearchSubmit();
  };

  const handleCreateForumInputs = ({ target }) => {
    const value = target.name === 'isPrivate' ? target.checked.toString() : target.value;
    const newInputs = { ...createForumInputs, [target.name]: value };
    setCreateForumInputs(newInputs);
  };

  const handleAddForumClick = () => {
    if (!isLoggedIn) return;
    setCreateForumOpen(true);
  };

  const handleAddForumClose = () => {
    setCreateForumOpen(false);
  };

  const handleCreateSubmit = () => {
    console.log('Submit forum data');
    console.log(createForumInputs);
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
            onChange={handleFilterChange}
            value={filters.topic}
            name="topic"
          />
          <Tooltip title="Search">
            <IconButton onClick={handleSearchSubmit} color="primary">
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
          {!forums.fetching && !forums.docs?.length && <p>No forums found</p>}
          <ForumsList forums={forums.docs || []} />
        </Grid>
        {isLoggedIn && (
          <Grid container item justifyContent="flex-end">
            <Fab color="primary" onClick={handleAddForumClick}>
              <AddIcon />
            </Fab>
          </Grid>
        )}
      </Grid>

      <ForumFiltersFormDialog
        isOpen={filtersOpen}
        onClose={handleCloseFilters}
        onSubmit={handleCloseFilters}
        onClear={handleClearFilters}
        onInputChange={handleFilterChange}
        currentFilters={filters}
      />
      {isLoggedIn && (
        <ForumCreateFormDialog
          isOpen={createForumOpen}
          onClose={handleAddForumClose}
          onSubmit={handleCreateSubmit}
          onInputChange={handleCreateForumInputs}
          submitDisabled={!createForumInputs.topic.trim() || !createForumInputs.description.trim()}
          formValues={createForumInputs}
        />
      )}
    </Grid>
  );
}

export default Forums;
