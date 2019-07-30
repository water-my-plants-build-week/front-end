import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/private-route";

import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import PlantsPage from "./pages/plants";
import Navigation from "./components/navigation";

// TODO: Extract into it's own function
function NoRoute() {
  return (
    <>
      <h1>No route found</h1>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute path="/plants" component={PlantsPage} />
        <PrivateRoute component={NoRoute} />
      </Switch>
    </div>
  );
}

export default App;
