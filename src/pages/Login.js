import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: 320,
    maxWidth: 500,
    marginTop: 15,
    padding: 15,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '10px 0px 10px 0px',
    },
  },
}));

function Login() {
  const classes = useStyles();

  const handleOnSubmit = () => {
    console.log('Trigger login');
  };

  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Grid item container direction="column">
          <PageTitle>Login</PageTitle>
          <form className={classes.form} autoComplete={'off'}>
            <TextField label="Username" variant="outlined" fullWidth />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button component={Link} to="/forgot-password">
              Forgot Password
            </Button>
            <div className={classes.buttons}>
              <Button
                component={Link}
                to="/signup"
                variant="outlined"
                color="secondary"
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnSubmit}
              >
                Login
              </Button>
            </div>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;
