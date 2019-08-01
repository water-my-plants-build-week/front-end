import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import {
  getPlants,
  getReminders,
  updatePlant,
  createPlant,
  deletePlant,
  createReminder
} from "../../actions";
import PlantsForm from "../../components/plant-form";
import ReminderForm from "../../components/reminder-form";

import PlantDetail from "./detail";

// TODO: Extract component
function PlantsList({ plants, isLoading }) {
  // TODO: Implement a better loading indicator

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (plants.length === 0) {
    return (
      <>
        <h2>No Plants In Your Greenhouse</h2>
        {/* 
            TODO: make a link to a plants/new page with a form to create a new plant.
            Maybe add an SVG or some icon of some kind to make it more visually
            appealing
        */}

        <Link to="/plants/new/">Add a plant</Link>
      </>
    );
  }

  return (
    <>
      {plants.map((plant, index) => (
        <div key={index}>
          <Link to={`/plants/${plant.id}`}>
            <p>Plant: {plant.plantName}</p>
            <p>Water Time: {plant.dailyWaterTime} </p>
          </Link>
        </div>
      ))}
      <Link to="/plants/new/">Add a plant</Link>
    </>
  );
}

class PlantsPage extends React.Component {
  componentDidMount() {
    this.props.getPlants();
    this.props.getReminders();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`/plants/:id/reminder/new`}
            render={props => {
              const plant = this.props.plants.find(
                plant => plant.id === Number(props.match.params.id)
              );
              const user = JSON.parse(localStorage.getItem("user"));
              return (
                <ReminderForm
                  formTitle="Create Reminder"
                  submitText="Add Reminder"
                  onSubmit={date =>
                    this.props
                      .createReminder({
                        plantName: plant.plantName,
                        phoneNumber: user.phoneNumber,
                        timeZone: user.timezone,
                        user_id: user.id,
                        notification: true,
                        time: `${date} ${plant.dailyWaterTime}`
                      })
                      .then(() => {
                        this.props
                          .getReminders()
                          .then(() => props.history.push(`/plants/${plant.id}`))
                          .catch(err => console.log(err));
                      })
                      .catch(err => console.log(err))
                  }
                />
              );
            }}
          />
          <Route
            path={`/plants/:id/edit`}
            render={props => {
              const plant = this.props.plants.find(
                plant => plant.id === Number(props.match.params.id)
              );

              // TODO: Check for plant === undefined and render somethign else
              return this.props.isLoading ? (
                <p>Fetching your plants</p>
              ) : plant ? (
                <PlantsForm
                  formTitle="Edit Plant"
                  submitText="Update Plant"
                  onSubmit={values =>
                    this.props
                      .updatePlant(props.match.params.id, values)
                      .then(() => {
                        this.props
                          .getPlants()
                          .then(() => props.history.push("/plants"))
                          .catch(err => {
                            if (process.env.NODE_ENV !== "production") {
                              console.error(err);
                            }
                          });
                      })
                      .catch(err => {
                        if (process.env.NODE_ENV !== "production") {
                          console.error(err);
                        }
                      })
                  }
                  plantName={plant.plantName}
                  dailyWaterTime={plant.dailyWaterTime}
                  {...props}
                />
              ) : (
                <>No plant found</>
              );
            }}
          />
          <Route
            path={`${this.props.match.path}/new/`}
            render={props => (
              <PlantsForm
                formTitle="Create Plant"
                submitText="Add Plant"
                onSubmit={values =>
                  this.props
                    .createPlant(values)
                    .then(() => {
                      this.props
                        .getPlants()
                        .then(() => props.history.push("/plants"))
                        .catch(err => {
                          if (process.env.NODE_ENV !== "production") {
                            console.error(err);
                          }
                        });
                    })
                    .catch(err => {
                      if (process.env.NODE_ENV !== "production") {
                        console.error(err);
                      }
                    })
                }
                {...props}
              />
            )}
          />
          <Route
            path={`${this.props.match.path}/:id`}
            component={PlantDetail}
          />

          <Route
            exact
            path={`${this.props.match.path}`}
            render={props => (
              <PlantsList
                isLoading={this.props.isLoading}
                plants={this.props.plants}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  plants: state.user.plants,
  reminders: state.user.reminders,
  isLoading: state.user.isLoading
});

export default connect(
  mapStateToProps,
  {
    getPlants,
    updatePlant,
    createPlant,
    deletePlant,
    getReminders,
    createReminder
  }
)(PlantsPage);
