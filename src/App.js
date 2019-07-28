import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/private-route";

import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";
import PlantDetail from "./pages/plant-detail";
import Navigation from "./components/navigation";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/plant" component={PlantDetail} />
      <PrivateRoute exact path="/" component={Home} />
    </div>
  );
}

export default App;
