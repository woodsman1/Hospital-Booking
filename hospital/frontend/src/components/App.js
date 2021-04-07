import React from 'react'
import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
  } from "react-router-dom";
import Cookies from "universal-cookie";
import Home from './comp/Home';
import Navbar from './comp/Navbar';
import { onLogin, RefreshTokenCall, onSignUp } from './comp/utilities/Request';
import Login from "./comp/Login";
import Signup from "./comp/Signup";
import Booking from './comp/Booking';

const App = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [loading, setLoading] = useState(false);

    const cookies = new Cookies();

    useEffect( () =>{
        setLoading(true)
        RefreshTokenCall(setAuthToken, setAuthenticated)
        setLoading(false)
    }
    ,[]);

    const onlogin = async (obj) =>{
        setLoading(true)
        onLogin(obj, setAuthToken, setAuthenticated)
        setLoading(false)
    }

    const onsignup = async (obj) =>{
        setLoading(true)
        onSignUp(obj, setAuthToken, setAuthenticated)
        setLoading(false)
    }

    return (
        <Router>
        <div>
          <Navbar authenticated={authenticated} />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/">
                {loading ? (
                  <h1>loading ... </h1>
                ) : (
                  <Home authToken={authToken}/>
                )}
              </Route>
              <Route exact path="/login">
                {authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Login onLogin={onlogin} />
                )}
              </Route>
              <Route exact path="/sign-up">
                {authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Signup onSignUp={onsignup} />
                )}
              </Route>

              <Route exact path="/your-bookings">
                {!authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <Booking authToken={authToken} />
                )}
              </Route>
              
            </Switch>
          </div>
        </div>
      </Router>
    )
}

export default App
