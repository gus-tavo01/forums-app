import React from 'react';
import PageTitle from '../components/PageTitle';
// mui components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// components
import ForumTabPanel from '../components/ForumTabPanel';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 320,
    marginTop: 15,
    padding: 15,
  },
  image: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  tabs: {
    margin: '10px 0px',
  },
}));

const tabsValues = {
  topics: 0,
  participants: 1,
};

function ForumDetails() {
  const classes = useStyles();
  const location = useLocation();
  const [tabValue, setTabValue] = React.useState(tabsValues.topics);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleTabPanel = (tabValue) => {
    const topics = [
      {
        id: 2,
        name: 'First topic',
      },
    ];
    const participants = [
      {
        id: 2,
        name: 'Ticky',
      },
    ];

    console.log(location.pathname);

    switch (tabValue) {
      case tabsValues.topics:
        return <ForumTabPanel endpoint="/forum/1/topic" items={topics} />;
      case tabsValues.participants:
        return <ForumTabPanel endpoint="/user" items={participants} />;
      default:
        return 'Invalid tab';
    }
  };

  return (
    <Grid container justify="center">
      <Paper className={classes.paper}>
        <Grid container item direction="column">
          <PageTitle>Forum Name</PageTitle>
          <Grid container item justify="center">
            <Avatar src={null} className={classes.image} />
            {/* edit button */}
          </Grid>
          <Grid container item justify="space-between">
            <Typography>GALV</Typography>
            <Typography>Created on {new Date().toJSON()}</Typography>
          </Grid>
          <Divider />
          <Grid item>
            <Typography>Forum description</Typography>
          </Grid>
          <Divider />
          <Grid item>
            <Tabs
              className={classes.tabs}
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Topics" />
              <Tab label="Participants" />
            </Tabs>
            {handleTabPanel(tabValue)}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ForumDetails;
