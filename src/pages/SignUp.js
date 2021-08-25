import React from 'react';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
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

// when component renders, fetch secret questions from service
const secrets = [
  {
    id: 2,
    question: 'Whats your pets name?',
  },
  {
    id: 3,
    question: 'Whats your favourite color?',
  },
  {
    id: 4,
    question: 'Whos your crush?',
  },
];

function SignUp() {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center">
      <Paper className={classes.paper}>
        <Grid container item direction="column">
          <PageTitle>Sign Up</PageTitle>
          <Grid item container alignItems="flex-end" justifyContent="center">
            <Avatar src={null} className={classes.avatar} />
            <IconButton size="small">
              <AddPhotoAlternateOutlinedIcon />
            </IconButton>
          </Grid>
          <form autoComplete="off" className={classes.form}>
            <TextField label="Username" variant="outlined" size="small" />
            <FormControl className={classes.formControl} variant="outlined" size="small">
              <InputLabel id="select-question">Secret question</InputLabel>
              <Select
                labelId="select-question"
                id="simple-question"
                value=""
                label="Secret question"
                // onChange={handleChange}
                size="small"
              >
                {secrets.map((q) => (
                  <MenuItem key={q.id} value={q.id}>
                    {q.question}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Answer" variant="outlined" size="small" />
            <TextField label="Password" variant="outlined" type="password" size="small" />
            <TextField label="Repeat password" variant="outlined" type="password" size="small" />
            <Button variant="contained" color="primary">
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
