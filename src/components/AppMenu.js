import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

function AppMenu(props) {
  const { isAuth } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenNotifications = () => {
    // open notifications dialog
  };

  const handleLogout = () => {
    console.log('logout things');
  };

  return (
    <div>
      <IconButton onClick={handleMenu}>
        <MenuOutlinedIcon />
      </IconButton>
      <Menu
        id="menu-app"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={accountMenuOpen}
        onClose={closeMenu}
      >
        {/* menu items */}
        {isAuth && (
          <Link to="/account">
            <MenuItem onClick={closeMenu}>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              Account
            </MenuItem>
          </Link>
        )}
        {isAuth && (
          <Link to="my-forums">
            <MenuItem onClick={closeMenu}>
              <ListItemIcon>
                <ForumOutlinedIcon />
              </ListItemIcon>
              My forums
            </MenuItem>
          </Link>
        )}
        {isAuth && (
          <MenuItem onClick={handleOpenNotifications}>
            <ListItemIcon>
              <NotificationsOutlinedIcon />
            </ListItemIcon>
            Notifications
          </MenuItem>
        )}
        <Link to="/about">
          <MenuItem onClick={closeMenu}>
            <ListItemIcon>
              <HelpOutlineOutlinedIcon />
            </ListItemIcon>
            About
          </MenuItem>
        </Link>
        {!isAuth && (
          <Link to="/login">
            <MenuItem onClick={closeMenu}>
              <ListItemIcon>
                <PeopleOutlineOutlinedIcon />
              </ListItemIcon>
              Login
            </MenuItem>
          </Link>
        )}
        {isAuth && <Divider />}
        {isAuth && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default AppMenu;

AppMenu.propTypes = {
  isAuth: PropTypes.bool,
};

AppMenu.defaultProps = {
  isAuth: false,
};
