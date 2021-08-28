import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
// pages
import Login from './pages/Login';
import Forums from './pages/Forums';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ForumDetails from './pages/ForumDetails';

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <Router>
      <NavBar isLoggedIn={auth.isLoggedIn} />
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
        <Route path="/forum/:id">
          <ForumDetails />
        </Route>

        {/*
        /notifications?
        /account
        */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
