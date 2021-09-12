import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
import AddIcon from '@material-ui/icons/Add';

import { getForums, addForum } from '../redux/actions/forums-actions';

import PageTitle from '../components/PageTitle';
import ForumsList from '../components/ForumsList';
import ForumFiltersFormDialog from '../components/ForumFiltersFormDialog';
import ForumCreateFormDialog from '../components/ForumCreateFormDialog';
import FloatingButton from '../components/FloatingButton';

import useToast from '../hooks/useToast';
import ToastTypes from '../constants/ToastTypes';

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

  const { isLoggedIn, token } = useSelector((store) => store.auth);
  const forums = useSelector((store) => store.forums);

  const { setToastOpen } = useToast();

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

  const handleAddFilters = () => {
    if (
      filters.topic ||
      filters.author ||
      filters.isActive ||
      filters.public ||
      filters.sortOrder ||
      filters.sortBy
    ) {
      setToastOpen({ message: 'Filters added', severity: ToastTypes.INFO });
    }
    setFiltersOpen(false);
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

  const handleCreateSubmit = async () => {
    const payload = {
      token,
      forum: { ...createForumInputs, isPrivate: createForumInputs.isPrivate === 'true' },
    };

    const addSuccess = await dispatch(addForum(payload));
    if (addSuccess) {
      handleAddForumClose();
      handleSearchSubmit();
      setToastOpen({ message: 'Forum created Successfully!', severity: ToastTypes.SUCCESS });
    }
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
            <FloatingButton onClick={handleAddForumClick} color="primary">
              <AddIcon />
            </FloatingButton>
          </Grid>
        )}
      </Grid>

      <ForumFiltersFormDialog
        isOpen={filtersOpen}
        onClose={handleCloseFilters}
        onSubmit={handleAddFilters}
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
