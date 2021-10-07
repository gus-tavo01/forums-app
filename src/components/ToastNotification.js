import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';

import useToast from '../hooks/useToast';

const useStyles = makeStyles(() => ({
  toast: {
    top: 80,
  },
}));

function Transition(props) {
  return <Slide {...props} direction="left" />;
}

function ToastNotification() {
  const classes = useStyles();
  const { toast, setToastClose } = useToast();
  const { isOpen, severity, message, autoHideDuration, variant, position } = toast;

  const handleClose = (e, reason) => {
    if (reason !== 'clickaway') {
      setToastClose();
    }
  };

  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={isOpen}
      anchorOrigin={position}
      TransitionComponent={Transition}
      className={classes.toast}
    >
      <MuiAlert variant={variant} severity={severity} onClose={handleClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default ToastNotification;
