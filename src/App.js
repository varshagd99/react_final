import React,{useState,useEffect} from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import { Switch, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
const App=()=> {
  return (
    <div className="App">
       <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          App
        </Link>
        

        
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          
        </Switch>
      </div>
    

    </div>
  );
}

export default App;