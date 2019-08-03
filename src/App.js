import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./components/private-route";

import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import PlantsPage from "./pages/plants/";
import Navigation from "./components/navigation";
import EditUser from "./components/edit-user";

function NoRoute() {
  return <Redirect to="/plants" />;
}

function App() {
  return (
    <div className="App">
      <Navigation />

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute path="/plants" component={PlantsPage} />
        <PrivateRoute path="/edit" component={EditUser} />
        <PrivateRoute component={NoRoute} />
      </Switch>
    </div>
  );
}

export default App;
