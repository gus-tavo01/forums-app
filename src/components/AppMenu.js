import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../redux/actions/auth-actions';

import useToast from '../hooks/useToast';
import ToastTypes from '../constants/ToastTypes';

function AppMenu(props) {
  const { isAuth } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { setToastOpen } = useToast();
  const [anchorEl, setAnchorEl] = useState(null);
  const accountMenuOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenNotifications = () => {
    // TODO
    // open a modal dialog
    closeMenu();
  };

  const handleLogout = async () => {
    closeMenu();
    await dispatch(logout());
    history.push('/login');
    setToastOpen({ message: 'Logged out', severity: ToastTypes.INFO });
  };

  return (
    <div>
      <IconButton onClick={handleMenu}>
        <MenuOutlinedIcon />
      </IconButton>
      <Menu
        id="menu-app"
        anchorEl={anchorEl}
        keepMounted
        open={accountMenuOpen}
        onClose={closeMenu}
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
        {isAuth && (
          <MenuItem onClick={closeMenu} component={Link} to="/my-account">
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            Account
          </MenuItem>
        )}
        {isAuth && (
          <MenuItem onClick={handleOpenNotifications}>
            <ListItemIcon>
              <NotificationsOutlinedIcon />
            </ListItemIcon>
            Notifications
          </MenuItem>
        )}
        {!isAuth && (
          <MenuItem onClick={closeMenu} component={Link} to="/login">
            <ListItemIcon>
              <PeopleOutlineOutlinedIcon />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
        <MenuItem onClick={closeMenu} component={Link} to="/about">
          <ListItemIcon>
            <HelpOutlineOutlinedIcon />
          </ListItemIcon>
          About
        </MenuItem>
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
