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
  const { toast, setClose } = useToast();
  const { isOpen, severity, message, autoHideDuration, variant, position } = toast;

  const handleClose = (e, reason) => {
    if (reason !== 'clickaway') {
      setClose();
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

// ToastNotification.propTypes = {
//   isOpen: PropTypes.bool,
//   severity: PropTypes.string,
//   message: PropTypes.string,
//   onClose: PropTypes.func,
//   autoHideDuration: PropTypes.number,
//   variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
// };

// ToastNotification.defaultProps = {
//   isOpen: false,
//   severity: undefined,
//   message: null,
//   onClose: () => null,
//   autoHideDuration: 6000,
//   variant: 'outlined',
// };

export default ToastNotification;
