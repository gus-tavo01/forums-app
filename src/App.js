import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
// pages
import Login from './pages/Login';
import Forums from './pages/Forums';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ForumDetails from './pages/ForumDetails';
import Participants from './pages/Participants';
import Account from './pages/Account';
import ToastNotification from './components/ToastNotification';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Forums />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <PrivateRoute path="/my-account">
          <Account />
        </PrivateRoute>
        <PrivateRoute path="/forum/:id/participants">
          <Participants />
        </PrivateRoute>
        <Route path="/forum/:id">
          <ForumDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <ToastNotification />
    </Router>
  );
}

export default App;
