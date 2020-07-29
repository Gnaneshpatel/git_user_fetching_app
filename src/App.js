import React, { useState, Fragment } from 'react';
import './App.css';
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//react-router
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"

//firebase
import firebase from "firebase/app";
import "firebase/auth";

//components
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import PageNotFound from "./Pages/PageNotFound";
import { UserContext } from './context/UserContext';
import SignUp from './Pages/SignUp';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

import firebaseConfig from "./config/firebaseConfig";
//init firebase
firebase.initializeApp(firebaseConfig);

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <Fragment>
      <Router>
        <ToastContainer />
        <UserContext.Provider value={{ user, setUser }}>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Signin" component={SignIn} />
            <Route exact path="/SignuP" component={SignUp} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </UserContext.Provider>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
