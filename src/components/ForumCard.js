import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Divider from '@material-ui/core/Divider';
import FromDate from './FromDate';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '10px',
    padding: '8px',
    minWidth: 300,
    maxWidth: 400,
  },
  image: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  description: {
    textAlign: 'justify',
    marginBottom: '5px',
  },
}));

function ForumCard(props) {
  const { image, topic, id, lastActivity, description, author, participants } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.card} variant="outlined">
      <Grid container direction="column">
        <Grid container item>
          <Grid container item justifyContent="flex-start" alignItems="flex-start" wrap="nowrap">
            <Avatar src={image} className={classes.image}>
              <ForumOutlinedIcon />
            </Avatar>
            <Grid container item justifyContent="space-between">
              <Typography component={Link} to={`/forum/${id}`} variant="subtitle1">
                {topic}
              </Typography>
              <Typography variant="caption">
                Last activity: <FromDate>{lastActivity}</FromDate>
              </Typography>
            </Grid>
          </Grid>
          <Grid container item className={classes.description}>
            <Typography variant="body1">{description}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container item justifyContent="space-between">
          <Typography variant="subtitle2">Author: {author}</Typography>
          <Typography>Participants: {participants}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

ForumCard.propTypes = {
  id: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lastActivity: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  participants: PropTypes.number.isRequired,
  image: PropTypes.string,
};

ForumCard.defaultProps = {
  image: null,
};

export default ForumCard;
