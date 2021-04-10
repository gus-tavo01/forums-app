import React from 'react';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PageTitle from '../components/PageTitle';

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: 320,
    maxWidth: 600,
    marginTop: 15,
    padding: 15,
  },
}));

function About() {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center">
      <Paper className={classes.paper}>
        <PageTitle>About</PageTitle>
        <Typography variant="h6" component="h3">
          Author
        </Typography>
        <Typography>Gustavo Adolfo Loera Vazquez</Typography>
        Software Developer
        <Typography variant="h6" component="h3">
          Contact
        </Typography>
        <Typography>gustavoa.loera01@gmail.com</Typography>
        <Typography>https://github.com/gus-tavo01</Typography>
      </Paper>
    </Grid>
  );
}

export default About;
