import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '10px',
    padding: '5px',
    minWidth: 320,
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
  const classes = useStyles();
  return (
    <Paper className={classes.card} variant="outlined">
      <Grid container direction="column">
        <Grid container item>
          <Grid
            container
            item
            justify="flex-start"
            alignItems="flex-start"
            wrap="nowrap"
          >
            {/* add image source */}
            <Avatar src={props.image} className={classes.image} />
            <Grid container item direction="column">
              <Typography
                component={Link}
                to={`/forum/${props.id}`}
                variant="subtitle1"
              >
                {props.name}
              </Typography>
              <Typography variant="caption">
                Last post: {props.lastActivity}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item className={classes.description}>
            <Typography variant="body1">{props.name}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container item justify="space-between">
          <Typography variant="subtitle2">Author: {props.author}</Typography>
          <Typography>Participants: {props.participants}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

ForumCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  lastActivity: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  participants: PropTypes.number,
};

ForumCard.defaultProps = {
  image: null,
  name: 'Forum Name',
  author: 'Anonymous',
  participants: 0,
};

export default ForumCard;
