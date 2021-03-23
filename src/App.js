import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppMenuBar from './components/AppMenuBar';
// pages
import Login from './pages/Login';
import Forums from './pages/Forums';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <AppMenuBar />
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
        {/*
        /my-forums
        /notifications
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
