import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// mui components
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import PageTitle from '../components/PageTitle';
import CommentsList from '../components/CommentsList';
import { loadComments, cleanComments } from '../redux/actions/comments-actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

function TopicDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentTopic = useSelector((store) => store.topics.docs.find((topic) => topic.id === id));
  const comments = useSelector((store) => store.comments);
  const pageLoader = useSelector((store) => store.loaders.topic);

  // TODO move to state
  const page = 1;

  React.useEffect(
    () => () => {
      dispatch(cleanComments());
    },
    [],
  );

  const handleShowComments = () => {
    const filters = { topicId: id, page };
    dispatch(loadComments(filters));
  };

  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      <Grid container item justify="center">
        <PageTitle content={currentTopic.name} />
      </Grid>
      <Grid item>
        <Typography>{currentTopic.content}</Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleShowComments}
          disabled={currentTopic.comments === 0 || pageLoader.comments}
        >
          Show comments ({currentTopic.comments})
        </Button>
      </Grid>
      <Grid container item justify="center">
        {pageLoader.comments ? <CircularProgress /> : <CommentsList items={comments.docs} />}
      </Grid>
    </Grid>
  );
}

export default TopicDetails;
