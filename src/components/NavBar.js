import React, { Fragment } from 'react';
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

function NavBar() {
  const classes = useStyles();
  const isAuth = true;
  return (
    <Fragment>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Forums App
            </Link>
          </Typography>
          <AppMenu isAuth={isAuth} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}

export default NavBar;
