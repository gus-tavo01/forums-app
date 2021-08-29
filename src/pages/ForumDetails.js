import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// #region mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// #endregion mui components
// components
import FromDate from '../components/FromDate';
import PageTitle from '../components/PageTitle';
import AppContainer from '../components/AppContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    maxWidth: 600,
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
  const location = useLocation();
  // const dispatch = useDispatch();
  const forum = useSelector((store) => store.forums.docs.find((f) => f.id === id));
  const { isLoggedIn } = useSelector((store) => store.auth);
  // const comments = useSelector((store) => store.comments);
  const [optsMenu, setOptsMenu] = useState(null);

  const handleOpenOptions = ({ currentTarget }) => {
    setOptsMenu(currentTarget);
  };

  const handleCloseOptions = () => {
    setOptsMenu(null);
  };

  const onEditClick = () => {
    console.log('Edit this forum');
  };

  const onDeleteClick = () => {
    console.log('Delete this forum');
  };

  const onLeaveclick = () => {
    console.log('Leave this forum');
  };

  return (
    <AppContainer>
      <Grid container className={classes.root} alignItems="center" direction="column" spacing={1}>
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
          {isLoggedIn && (
            <div>
              <Button variant="outlined" size="small" onClick={handleOpenOptions}>
                Forum options
              </Button>
              <Menu
                id="forum-options"
                anchorEl={optsMenu}
                open={Boolean(optsMenu)}
                keepMounted
                onClose={handleCloseOptions}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem
                  onClick={handleCloseOptions}
                  component={Link}
                  to={`${location.pathname}/participants`}
                >
                  View participants
                </MenuItem>
                <MenuItem onClick={onEditClick}>Edit</MenuItem>
                <MenuItem onClick={onDeleteClick}>Delete</MenuItem>
                <MenuItem onClick={onLeaveclick}>Leave</MenuItem>
              </Menu>
            </div>
          )}
        </Grid>
        <Divider />
        <Grid container item justifyContent="flex-start">
          <Typography>{forum.description}</Typography>
        </Grid>
        <Divider />
        <Grid container item justifyContent="flex-start">
          <Button color="primary" variant="contained">
            Show comments
          </Button>
        </Grid>
        {/* Comments list */}
      </Grid>
    </AppContainer>
  );
}

export default ForumDetails;
