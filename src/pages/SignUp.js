import React, { useEffect, useState, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/actions/auth-actions';

import PageTitle from '../components/PageTitle';
import LoadingButton from '../components/LoadingButton';

import useToast from '../hooks/useToast';
import ToastTypes from '../constants/ToastTypes';

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 320,
    marginTop: 15,
    padding: 15,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '10px 0px',
    },
  },
  submitBtn: {
    width: '100%',
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginRight: theme.spacing(1),
  },
  inputFile: {
    display: 'none',
  },
}));

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { registering, isLoggedIn } = useSelector((store) => store.auth);
  const { setToastOpen } = useToast();

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    rPassword: '',
    dateOfBirth: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    rPassword: '',
    dateOfBirth: '',
    avatar: '',
  });
  const [imageState, setImageState] = useState({ src: null });

  const fileReader = useMemo(() => new FileReader(), []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, []);

  const handleOnChange = ({ target }) => {
    const { value, name } = target;
    setInputs((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRequest = {
      avatar: imageState.src,
      username: inputs.username,
      email: inputs.email,
      dateOfBirth: inputs.dateOfBirth,
      password: inputs.password,
    };

    const registered = await dispatch(register(userRequest));

    const successToast = {
      message: 'Your account has been created successfully!',
      severity: ToastTypes.SUCCESS,
    };
    const failureToast = {
      message: 'Something happened.. please try again later',
      severity: ToastTypes.ERROR,
    };
    const toast = registered ? successToast : failureToast;

    if (registered) {
      history.push('/login');
    }

    setToastOpen(toast);
  };

  const passwordsMatch = () => inputs.password === inputs.rPassword;

  const verifyPassword = () => {
    const errMessage = !passwordsMatch() ? 'Both passwords does not match' : null;
    setErrors((errorState) => ({ ...errorState, rPassword: errMessage }));
  };

  const handleImage = ({ target }) => {
    const [file] = target.files;

    fileReader.onloadstart = () => {
      setImageState({ loading: true });
    };

    fileReader.onloadend = () => {
      setImageState({ src: fileReader.result });
    };

    // Step read file as data url
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      setImageState({ src: '' });
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper className={classes.paper}>
        <Grid container item direction="column">
          <PageTitle content="Sign Up" />
          <Grid item container alignItems="center" justifyContent="center">
            {imageState.loading ? (
              <CircularProgress className={classes.avatar} />
            ) : (
              <Avatar src={imageState.src} className={classes.avatar} />
            )}

            <label htmlFor="avatar-button-file">
              <input
                accept="image/*"
                className={classes.inputFile}
                id="avatar-button-file"
                type="file"
                onChange={handleImage}
              />
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                component="span"
                startIcon={<AddPhotoAlternateOutlinedIcon />}
              >
                Avatar
              </Button>
            </label>
          </Grid>
          <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              onChange={handleOnChange}
              name="username"
              value={inputs.username}
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              onChange={handleOnChange}
              name="email"
              value={inputs.email}
            />
            <TextField
              label="Date of birth"
              variant="outlined"
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleOnChange}
              name="dateOfBirth"
              value={inputs.dateOfBirth}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              onChange={handleOnChange}
              name="password"
              value={inputs.password}
            />
            <TextField
              label="Repeat password"
              variant="outlined"
              type="password"
              size="small"
              onChange={handleOnChange}
              name="rPassword"
              value={inputs.rPassword}
              onBlur={verifyPassword}
              error={!!errors.rPassword}
              helperText={errors.rPassword}
            />
            <LoadingButton loading={!!registering}>
              <Button
                className={classes.submitBtn}
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  registering ||
                  !inputs.username.trim() ||
                  !inputs.email.trim() ||
                  !inputs.dateOfBirth.trim() ||
                  !inputs.password.trim() ||
                  !inputs.rPassword.trim() ||
                  !passwordsMatch()
                }
              >
                Submit
              </Button>
            </LoadingButton>
          </form>
          <Typography>
            Already have an account?{' '}
            <Button component={Link} to="/login" color="primary">
              Login
            </Button>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default SignUp;
