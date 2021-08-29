import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  rootContent: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function AppContainer(props) {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.rootContent}>{children}</div>;
}

AppContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

AppContainer.defaultProps = {
  children: null,
};

export default AppContainer;
