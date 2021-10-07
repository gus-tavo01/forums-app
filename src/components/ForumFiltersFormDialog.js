import React from 'react';
import PropTypes from 'prop-types';
// #region MUI components
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// #endregion MUI components
import useAuth from '../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
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

function ForumFiltersFormDialog(props) {
  const classes = useStyles();
  const { isOpen, onSubmit, onClear, onClose, onInputChange, currentFilters } = props;
  const { isLoggedIn } = useAuth();

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Forum Search Filters</Typography>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.form}>
        <TextField
          label="Forum topic"
          variant="outlined"
          fullWidth
          onChange={onInputChange}
          value={currentFilters.topic}
          name="topic"
          size="small"
        />
        <TextField
          label="Author"
          variant="outlined"
          fullWidth
          onChange={onInputChange}
          value={currentFilters.author}
          name="author"
          size="small"
        />
        <FormControl variant="outlined" size="small" className={classes.formControl}>
          <InputLabel id="select-active">Forum status</InputLabel>
          <Select
            labelId="select-active"
            value={currentFilters.isActive}
            onChange={onInputChange}
            label="Forum status"
            name="isActive"
          >
            <MenuItem value="true">Active only</MenuItem>
            <MenuItem value="false">Inactive only</MenuItem>
          </Select>
        </FormControl>

        <div>
          <FormControl variant="outlined" className={classes.formControl} size="small">
            <InputLabel id="select-sortBy">Sort by</InputLabel>
            <Select
              labelId="select-sortBy"
              value={currentFilters.sortBy}
              onChange={onInputChange}
              label="Sort by"
              name="sortBy"
            >
              <MenuItem value="topic">Topic</MenuItem>
              <MenuItem value="author">Author</MenuItem>
              <MenuItem value="createDate">Creation date</MenuItem>
              <MenuItem value="lastActivity">Activity date</MenuItem>
              <MenuItem value="isActive">Status</MenuItem>
              {isLoggedIn && <MenuItem value="isPrivate">Privacity</MenuItem>}
              <MenuItem value="participants">Participants</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} size="small">
            <InputLabel id="select-sortOrder">Sort order</InputLabel>
            <Select
              labelId="select-sortOrder"
              value={currentFilters.sortOrder}
              onChange={onInputChange}
              label="Sort order"
              name="sortOrder"
            >
              <MenuItem value="asc">Ascendent</MenuItem>
              <MenuItem value="desc">Descendent</MenuItem>
            </Select>
          </FormControl>
        </div>

        {isLoggedIn && (
          <FormControl variant="outlined" className={classes.formControl} size="small">
            <InputLabel id="select-public">Forum privacity</InputLabel>
            <Select
              labelId="select-public"
              value={currentFilters.public}
              onChange={onInputChange}
              label="Forum privacity"
              name="public"
            >
              <MenuItem value="true">Public</MenuItem>
              <MenuItem value="false">Private</MenuItem>
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <Divider />
      <DialogActions className={classes.actions}>
        <Button onClick={onClear} variant="outlined">
          Clear filters
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForumFiltersFormDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  currentFilters: PropTypes.shape({
    topic: PropTypes.string,
    author: PropTypes.string,
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
    public: PropTypes.string,
    isActive: PropTypes.string,
  }),
};

ForumFiltersFormDialog.defaultProps = {
  isOpen: false,
  onClose: () => null,
  onClear: () => null,
  onSubmit: () => null,
  onInputChange: () => null,
  currentFilters: defaultFilters,
};

export default ForumFiltersFormDialog;
