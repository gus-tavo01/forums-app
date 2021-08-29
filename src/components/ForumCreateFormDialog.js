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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// #endregion MUI components

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
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function ForumCreateFormDialog(props) {
  const classes = useStyles();
  const { isOpen, onSubmit, onClose, onInputChange, submitDisabled, formValues } = props;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="h6">Create a new forum</Typography>
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
          name="topic"
          size="small"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          onChange={onInputChange}
          name="description"
          size="small"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formValues.isPrivate === 'true'}
              color="secondary"
              onChange={onInputChange}
              name="isPrivate"
              size="small"
            />
          }
          label="Create as private"
        />
      </DialogContent>
      <Divider />
      <DialogActions className={classes.actions}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained" disabled={submitDisabled}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForumCreateFormDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
  submitDisabled: PropTypes.bool,
  formValues: PropTypes.shape({
    topic: PropTypes.string,
    description: PropTypes.string,
    isPrivate: PropTypes.string,
  }),
};

ForumCreateFormDialog.defaultProps = {
  isOpen: false,
  onClose: () => null,
  onSubmit: () => null,
  onInputChange: () => null,
  submitDisabled: true,
  formValues: {
    topic: '',
    description: '',
    isPrivate: 'false',
  },
};

export default ForumCreateFormDialog;
