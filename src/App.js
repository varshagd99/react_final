import React,{useState,useEffect} from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service"
import { Switch, Route, Link } from "react-router-dom";
import First from './Components/First'
import Register from "./Components/Register";
import Home from "./Components/Home";
import Login from "./Components/Login";
import User from "./Components/User"
const App=()=> {


  const [currentUser, setCurrentUser] = useState(undefined);

 useEffect(() => {
    const user = AuthService.getCurrentUser();
    document.title ='Facial Emotion Recognition'

    if (user) {
      setCurrentUser(user);

    }
  }, []);

  const logOut = () => {
    AuthService.logout()
  }
  return (
    <div className="App">
      
       <nav className="navbar navbar-expand navbar-dark">
        <Link to={"/"} className="navbar-brand">
         <font size="4"> <i class="fa fa-home" aria-hidden="true"></i> Home</font>
        </Link>
        

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            
            <li className="nav-item">
              <a href="/login" className="nav-link"  onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
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
          )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/user" component={User} />
        </Switch>
      </div>
     
    

    </div>
  );
}

export default App;