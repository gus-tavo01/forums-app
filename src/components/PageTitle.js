import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  title: { marginBottom: 15 },
}));

function PageTitle({ text }) {
  const classes = useStyles();
  return (
    <Typography className={classes.title} variant="h4" component="h2">
      {text}
    </Typography>
  );
}

PageTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PageTitle;
