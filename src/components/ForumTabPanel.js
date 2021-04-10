import React from 'react';
import PropTypes from 'prop-types';
// mui components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';

function ForumTabPanel(props) {
  const handleOnDelete = (id) => {
    console.log(`You will delete the item ${id}`);
  };

  const handleAddNew = () => {
    console.log('Add new');
  };

  return (
    <Grid container direction="column">
      <Grid container item justify="flex-end">
        <Button variant="outlined" onClick={handleAddNew}>
          Add new
        </Button>
      </Grid>
      <Grid item>
        <List>
          {props.items.map((item) => (
            <ListItem
              key={item.id}
              button
              component={Link}
              to={`${props.endpoint}/${item.id}`}
            >
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleOnDelete(item.id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

ForumTabPanel.propTypes = {
  endpoint: PropTypes.string.isRequired,
  items: PropTypes.array,
  // labels on modals
};

ForumTabPanel.defaultProps = {
  items: [],
};

export default ForumTabPanel;
