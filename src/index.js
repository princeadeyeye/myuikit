

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from 'auth/PrivateRoute.js';
// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Home from "core/Home.js";
import Users from 'user/Users.js'
import Signup from 'user/Signup.js'
import Signin from 'auth/Signin.js'
import Profile from 'user/Profile.js'
import Menu from 'core/Menu.js'
import EditProfile from 'user/EditProfile.js';



ReactDOM.render(
  <BrowserRouter>
  <Menu />
    <Switch>
      <Switch>
        
        <Route
          exact path="/home"
          render={props => <Home {...props} />}
        />
        <Route
          exact path="/users"
          render={props => <Users {...props} />}
        />
        
        <Route
          exact path="/signup"
          render={props => <Signup {...props} />}
        />

        <Route
          exact path="/signin"
          render={props => <Signin {...props} />}
        />
        <PrivateRoute 
          exact path="/user/edit/:userId"
          render={props => <EditProfile {...props} />}
        />
        <Route
          exact path="/user/:userId"
          render={props => <Profile {...props} />}
        />
        
        <Redirect to="/home" />
        <Redirect from="/" to="/home" />
     

      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
