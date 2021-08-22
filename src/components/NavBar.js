import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import AppMenu from './AppMenu';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const { isLoggedIn } = props;
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Forums App
            </Link>
          </Typography>
          <AppMenu isAuth={isLoggedIn} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

NavBar.defaultProps = {
  isLoggedIn: false,
};

export default NavBar;
