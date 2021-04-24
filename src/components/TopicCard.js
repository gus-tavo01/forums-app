import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// components
import FromDate from './FromDate';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

function TopicCard(props) {
  const classes = useStyles();
  const { name, lastActivity, comments } = props;

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" justify="center">
        <Typography component="p" variant="h6">
          {name}
        </Typography>

        <Divider />

        <Typography>
          Last activity: <FromDate>{lastActivity}</FromDate>
        </Typography>

        <Typography component="span">Comments: {comments}</Typography>
      </Grid>
    </Paper>
  );
}

TopicCard.propTypes = {
  name: PropTypes.string.isRequired,
  lastActivity: PropTypes.string.isRequired,
  comments: PropTypes.number,
};

TopicCard.defaultProps = {
  comments: 0,
};

export default TopicCard;
