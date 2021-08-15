import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
// import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
// components
import FromDate from './FromDate';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    width: '600px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(2),
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  likesTxt: {
    marginRight: theme.spacing(1),
  },
}));

function CommentCard(props) {
  const { from, to, message, date, likes, dislikes } = props;
  const classes = useStyles();
  if (to) {
    // TODO
    // handle if comment is for someone if (to) {arrange to his recipent}
    console.log(to);
    console.log(likes);
    console.log(dislikes);
  }
  return (
    <Paper className={classes.card}>
      <Grid container direction="column" spacing={1}>
        <Grid container item justify="space-between">
          <div className={classes.user}>
            <Avatar src={null} className={classes.avatar} alt={from} />
            <Typography variant="h6">{from}</Typography>
          </div>
          <Typography variant="caption">
            <FromDate>{date}</FromDate>
          </Typography>
        </Grid>
        <Grid item>{message}</Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid container item justify="space-between">
          <Grid item>
            <Button size="small" variant="contained">
              Liked
            </Button>
            <Button size="small">Dislike</Button>
            <Button size="small" color="secondary">
              Reply
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="caption" className={classes.likesTxt}>
              {likes} likes
            </Typography>
            <Typography variant="caption">{dislikes} dislikes</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

CommentCard.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
};

CommentCard.defaultProps = {
  to: null,
};

export default CommentCard;
