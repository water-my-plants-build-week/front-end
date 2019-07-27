import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/private-route";

import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";
import PlantDetail from "./pages/plant-detail";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="/plant">Plant</Link>
        </li>
      </ul>

      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/plant" component={PlantDetail} />
      <PrivateRoute exact path="/" component={Home} />
    </div>
  );
}

export default App;
