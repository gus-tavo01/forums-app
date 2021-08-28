import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// #region mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// #endregion mui components
// components
import FromDate from '../components/FromDate';
import PageTitle from '../components/PageTitle';
import ForumOptionsMenu from '../components/ForumOptionsMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    padding: theme.spacing(1),
  },
  image: {
    width: theme.spacing(16),
    height: theme.spacing(20),
    marginRight: theme.spacing(1),
    border: '2px solid deepskyblue',
  },
}));

function ForumDetails() {
  const classes = useStyles();
  const { id } = useParams();
  // const dispatch = useDispatch();
  const forum = useSelector((store) => store.forums.docs.find((f) => f.id === id));
  // const comments = useSelector((store) => store.comments);
  const [optsMenu, setOptsMenu] = useState(null);

  const handleOpenOptions = ({ currentTarget }) => {
    setOptsMenu(currentTarget);
  };

  const handleCloseOptions = () => {
    setOptsMenu(null);
  };

  return (
    <Grid container className={classes.root} alignItems="center" direction="column">
      <PageTitle content={`${forum.topic} 📣`} />
      <Grid container item alignItems="center">
        <div className={classes.image} />

        <Grid item>
          <Typography>
            Created: <FromDate>{forum.createDate}</FromDate>
          </Typography>

          <Typography>Created by: {forum.author}</Typography>
        </Grid>
      </Grid>
      <Grid container item justifyContent="flex-end">
        <ForumOptionsMenu
          anchorEl={optsMenu}
          onOpen={handleOpenOptions}
          onClose={handleCloseOptions}
          // add each action edit, delete, leave
        />
      </Grid>
      <Divider />
      <Grid item>
        <Typography>{forum.description}</Typography>
      </Grid>
      <Divider />
      <Grid container item spacing={2}>
        <Typography>comments thread</Typography>
      </Grid>
    </Grid>
  );
}

export default ForumDetails;
