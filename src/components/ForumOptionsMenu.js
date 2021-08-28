import React from 'react';
import PropTypes from 'prop-types';
// #region MUI components
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// #endregion MUI components
import { Link } from 'react-router-dom';

function ForumOptionsMenu(props) {
  const { onOpen, anchorEl, onClose } = props;

  return (
    <div>
      <Button variant="outlined" size="small" onClick={onOpen}>
        Forum options
      </Button>
      <Menu
        id="forum-options"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={onClose}
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
        <MenuItem onClick={onClose} component={Link} to="/participants">
          View participants
        </MenuItem>
        <MenuItem onClick={onClose}>Edit</MenuItem>
        <MenuItem onClick={onClose}>Delete</MenuItem>
        <MenuItem onClick={onClose}>Leave</MenuItem>
      </Menu>
    </div>
  );
}

ForumOptionsMenu.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  anchorEl: PropTypes.object,
};

ForumOptionsMenu.defaultProps = {
  onOpen() {},
  onClose() {},
  anchorEl: null,
};

export default ForumOptionsMenu;
