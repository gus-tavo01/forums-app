import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// components
import FromDate from '../components/FromDate';
import TopicsList from '../components/TopicsList';
import { loadTopics } from '../redux/actions/topics-actions';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    padding: theme.spacing(1),
  },
  image: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(1),
  },
}));

function ForumDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const pageLoaders = useSelector((store) => store.loaders.forum);
  const forum = useSelector((store) => store.forums.docs.find((f) => f.id === id));
  const topics = useSelector((store) => store.topics.docs);

  useEffect(() => {
    const filters = { forumId: id };
    dispatch(loadTopics(filters));
  }, []);

  return (
    <Grid container justify="center" direction="column" className={classes.root} spacing={3}>
      <Grid container item justify="center" alignItems="center">
        <Avatar src={forum.imageSrc} className={classes.image} />
        <Typography component="h2" variant="h4">
          {forum.name}
        </Typography>
      </Grid>
      <Grid container item justify="space-between">
        <Typography>By: {forum.author}</Typography>
        <Typography>
          Created <FromDate>{forum.createDate}</FromDate>
        </Typography>
      </Grid>
      <Divider />
      <Grid item>
        <Typography>{forum.description}</Typography>
      </Grid>
      <Divider />
      <Grid item container justify="center">
        <Typography component="h3" variant="h5">
          Topics 📣
        </Typography>
      </Grid>
      <Grid container item justify="center" spacing={2}>
        {pageLoaders.topics ? <CircularProgress /> : <TopicsList items={topics} />}
      </Grid>
    </Grid>
  );
}

export default ForumDetails;
