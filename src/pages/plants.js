import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getPlants, updatePlant, createPlant } from "../actions";
import PlantsForm from "../components/plants-page";

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

function PlantDetail({ plantName, dailyWaterTime, match }) {
  // TODO:
  // Implement ability to edit, and delete plant,
  // as well as viewing reminders for the plant,
  // and creating a new reminder
  return (
    <>
      <p>{plantName}</p>
      <p>{dailyWaterTime}</p>
      <Link to={`/plants/${match.params.id}/edit`}>Edit</Link>
    </>
  );
}

class PlantsPage extends React.Component {
  componentDidMount() {
    this.props.getPlants();
  }

  render() {
    return (
      <div>
        <Switch>
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
            render={props => {
              const plant = this.props.plants.find(
                plant => plant.id === Number(props.match.params.id)
              );
              return (
                <PlantDetail
                  isLoading={this.props.isLoading}
                  {...plant}
                  {...props}
                />
              );
            }}
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
  isLoading: state.user.isLoading
});

export default connect(
  mapStateToProps,
  { getPlants, updatePlant, createPlant }
)(PlantsPage);
