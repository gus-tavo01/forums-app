import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/auth-actions';
// import { fetchProfile } from '../redux/actions/users-actions';
import PageTitle from '../components/PageTitle';
import LoadingButton from '../components/LoadingButton';

const circularSize = 24;
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
  const { isLoggedIn, logginIn /** token */ } = useSelector((state) => state.auth);
  const history = useHistory();
  const [inputs, setInputs] = useState({ username: '', password: '' });
  const { username, password } = inputs;

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

    if (logginIn) return;

    const loginSuccess = await dispatch(login(inputs));
    if (loginSuccess) {
      history.push('/');
      // TODO
      // dispatch(fetchProfile(username, token));
    }
  };

  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Grid item container direction="column">
          <PageTitle content="Login" />
          <form className={classes.form} autoComplete="off" onSubmit={handleOnSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={username}
              onChange={handleOnChange}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={password}
              onChange={handleOnChange}
            />
            <Button component={Link} to="/forgot-password">
              Forgot Password
            </Button>
            <div className={classes.buttons}>
              <Button component={Link} to="/signup" variant="outlined" color="secondary">
                Sign Up
              </Button>

              <LoadingButton loading={!!logginIn}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={logginIn || !username.trim() || !password.trim()}
                >
                  Login
                </Button>
              </LoadingButton>
            </div>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Login;
