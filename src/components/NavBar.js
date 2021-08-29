import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// #region MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// #endregion MUI components
import { Link } from 'react-router-dom';
import AppMenu from './AppMenu';
import useAuth from '../hooks/useAuth';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function NavBar() {
  const classes = useStyles();
  const { isLoggedIn } = useAuth();
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

export default NavBar;
