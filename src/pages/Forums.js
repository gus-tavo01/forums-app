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
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// #endregion mui components
import { getForums } from '../redux/actions/forums-actions';
import PageTitle from '../components/PageTitle';
import ForumsList from '../components/ForumsList';
import ForumFiltersFormDialog from '../components/ForumFiltersFormDialog';

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
      margin: '6px 0px',
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

const defaultFilters = {
  topic: '',
  author: '',
  isActive: '',
  public: '',
  sortBy: '',
  sortOrder: '',
};

function Forums() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const { isLoggedIn } = useSelector((store) => store.auth);
  const forums = useSelector((store) => store.forums);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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

  const handleAddForum = () => {
    alert('Open modal to add a new forum');
  };

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <PageTitle content="Forums search" />
      <Grid container item direction="column">
        <Grid container item justifyContent="center" alignItems="center">
          <Tooltip title="Filters">
            <IconButton onClick={handleOpenDialog}>
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
            <Fab color="primary" onClick={handleAddForum}>
              <AddIcon />
            </Fab>
          </Grid>
        )}
      </Grid>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <ForumFiltersFormDialog
          onClose={handleCloseDialog}
          onSubmit={handleCloseDialog}
          onClear={handleClearFilters}
          onInputChange={handleFilterChange}
          currentFilters={filters}
        />
      </Dialog>
    </Grid>
  );
}

export default Forums;
