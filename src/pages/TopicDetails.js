import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// mui components
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Components
import PageTitle from '../components/PageTitle';
import CommentsList from '../components/CommentsList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

function TopicDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const currentTopic = useSelector((store) => store.topics.docs.find((topic) => topic.id === id));
  const comments = [];
  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid container item justify="center">
        <PageTitle content={currentTopic.name} />
      </Grid>
      <Grid item>
        <Typography>{currentTopic.content}</Typography>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary">
          Show comments
        </Button>
      </Grid>
      <Grid container item justify="center">
        <CommentsList items={comments} />
      </Grid>
    </Grid>
  );
}

export default TopicDetails;
