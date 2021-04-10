import React from 'react';
import PageTitle from '../components/PageTitle';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: 320,
    marginTop: 15,
    padding: 15,
  },
}));

function ForgotPassword() {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Grid container item direction="column">
          <PageTitle>Forgot Password</PageTitle>
          <Button variant="outlined" component={Link} to="/login">
            Go to login
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ForgotPassword;
