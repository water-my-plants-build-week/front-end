import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";

import Login from "./pages/login";
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
          <Link to="/plant">Plant</Link>
        </li>
      </ul>

      <Route path="/login" component={Login} />
      <Route path="/plant" component={PlantDetail} />
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
