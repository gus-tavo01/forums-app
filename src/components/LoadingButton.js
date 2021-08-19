import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const circularSize = 24;
const useStyles = makeStyles(() => ({
  buttonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: (circularSize / 2) * -1,
    marginLeft: (circularSize / 2) * -1,
  },
}));

export default function LoadingButton(props) {
  const { loading, children } = props;
  const classes = useStyles();
  return (
    <div className={classes.buttonWrapper}>
      {children}
      {loading && <CircularProgress className={classes.buttonProgress} size={circularSize} />}
    </div>
  );
}

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
