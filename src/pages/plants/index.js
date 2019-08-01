import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getPlants, getReminders } from "../../actions";

import PlantDetail from "./detail";
import PlantsList from "./list";
import NewReminder from "./new-reminder";
import EditPlant from "./edit";
import NewPlant from "./new";

class PlantsPage extends React.Component {
  componentDidMount() {
    this.props.getPlants();
    this.props.getReminders();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path={`/plants/:id/reminder/new`} component={NewReminder} />
          <Route path={`/plants/:id/edit`} component={EditPlant} />
          <Route path={`${this.props.match.path}/new/`} component={NewPlant} />
          <Route
            path={`${this.props.match.path}/:id`}
            component={PlantDetail}
          />

          <Route
            exact
            path={`${this.props.match.path}`}
            component={PlantsList}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(
  null,
  {
    getPlants,
    getReminders
  }
)(PlantsPage);
