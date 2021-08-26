import React from 'react';
// #region MUI components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// #endregion mui components
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

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
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
  },
}));

function SignUp() {
  const classes = useStyles();

  // useEffect(() => { if auth, redirect to '/' }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Grid container justifyContent="center">
      <Paper className={classes.paper}>
        <Grid container item direction="column">
          <PageTitle content="Sign Up" />
          <Grid item container alignItems="flex-end" justifyContent="center">
            <Avatar src={null} className={classes.avatar} />
            <IconButton size="small">
              <AddPhotoAlternateOutlinedIcon />
            </IconButton>
          </Grid>
          <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
            <TextField label="Username" variant="outlined" size="small" />
            <TextField label="Email" variant="outlined" size="small" />
            <TextField
              label="Birthday"
              variant="outlined"
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField label="Password" variant="outlined" type="password" size="small" />
            <TextField label="Repeat password" variant="outlined" type="password" size="small" />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          <Typography>
            Already have an account?{' '}
            <Button component={Link} to="/login" color="secondary">
              Login
            </Button>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default SignUp;
