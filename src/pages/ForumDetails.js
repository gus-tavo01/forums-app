import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PageTitle from '../components/PageTitle';
// components

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 320,
    marginTop: 15,
    padding: 15,
  },
  image: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  tabs: {
    margin: '10px 0px',
  },
}));

function ForumDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const forum = useSelector((store) => store.forums.docs.find((f) => f.id === id));

  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Grid container item direction="column">
          <PageTitle content={forum.name} />
          <Grid container item justify="center">
            <Avatar src={null} className={classes.image} />
            {/* edit button */}
          </Grid>
          <Grid container item justify="space-between">
            <Typography>{forum.author}</Typography>
            <Typography>Created on {forum.createDate}</Typography>
          </Grid>
          <Divider />
          <Grid item>
            <Typography>{forum.description}</Typography>
          </Grid>
          <Divider />
          <Grid item>Topics content</Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ForumDetails;
