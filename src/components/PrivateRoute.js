import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoute(props) {
  const { children, path } = props;
  const { isLoggedIn } = useAuth();

  const handleRender = ({ location }) => {
    if (isLoggedIn) {
      return children;
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  };

  return <Route path={path} render={handleRender} />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
  path: PropTypes.string,
};

PrivateRoute.defaultProps = {
  children: null,
  path: '',
};

export default PrivateRoute;
