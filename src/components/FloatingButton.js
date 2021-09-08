import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(() => ({
  floatingButton: {
    position: 'fixed',
    margin: 0,
    top: 'auto',
    right: 15,
    bottom: 20,
    left: 'auto',
  },
}));

function FloatingButton(props) {
  const { children, color, onClick } = props;
  const classes = useStyles();
  return (
    <Fab color={color} onClick={onClick} className={classes.floatingButton}>
      {children}
    </Fab>
  );
}

FloatingButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

FloatingButton.defaultProps = {
  color: undefined,
  onClick: () => {},
};

export default FloatingButton;
