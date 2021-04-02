import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function AppContainer({ children }) {
  const classes = useStyles();
  return <section className={classes.container}>{children}</section>;
}

AppContainer.propTypes = {
  children: PropTypes.element,
};

export default AppContainer;
