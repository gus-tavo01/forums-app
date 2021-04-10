import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '10px 0px',
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
  footer: {
    marginBottom: '5px',
  },
}));

function ForumCard(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.card}>
      <Grid container item>
        <Grid
          container
          item
          justify="flex-start"
          alignItems="flex-start"
          wrap="nowrap"
        >
          <Avatar src={null} className={classes.image} />
          <Grid container item direction="column">
            <Typography
              component={Link}
              to={`/forum/${props.id}`}
              variant="subtitle1"
            >
              Forum name
            </Typography>
            <Typography variant="caption">
              Last post: {new Date().toDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.description}>
          <Typography variant="body1">{props.name}</Typography>
        </Grid>
      </Grid>

      <Grid container item justify="space-between" className={classes.footer}>
        <Typography variant="subtitle2">{props.author}</Typography>
        <Typography>Participants: {props.participants}</Typography>
      </Grid>
      <Divider />
    </Grid>
  );
}

ForumCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  lastPostDate: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  participants: PropTypes.number,
};

ForumCard.defaultProps = {
  image: '', // default image
  name: 'Forum Name',
  author: 'Anonymous',
  participants: 0,
};

export default ForumCard;
