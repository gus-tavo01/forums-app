import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth-actions';
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
  const dispatch = useDispatch();
  const { isLoggedIn, logginIn } = useSelector((state) => state.auth);
  const history = useHistory();
  const [inputs, setInputs] = useState({ username: '', password: '' });

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, []);

  const handleOnChange = ({ target }) => {
    const { value, name } = target;
    setInputs((state) => ({ ...state, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(inputs));
    history.push('/');
  };

  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Grid item container direction="column">
          <PageTitle content="Login" />
          {logginIn && <span>Loading... tiriririri</span>}
          <form className={classes.form} autoComplete="off" onSubmit={handleOnSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={inputs.username}
              onChange={handleOnChange}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={inputs.password}
              onChange={handleOnChange}
            />
            <Button component={Link} to="/forgot-password">
              Forgot Password
            </Button>
            <div className={classes.buttons}>
              <Button component={Link} to="/signup" variant="outlined" color="secondary">
                Sign Up
              </Button>
              <Button variant="contained" color="primary" type="submit">
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
