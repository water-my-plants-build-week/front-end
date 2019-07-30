import React from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getPlants } from "../actions";

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

        <button>Add a plant</button>
      </>
    );
  }

  return plants.map((plant, index) => (
    <div key={index}>
      <Link to={`/plants/${plant.id}`}>
        <p>Plant: {plant.plantName}</p>
        <p>Water Time: {plant.dailyWaterTime} </p>
      </Link>
    </div>
  ));
}

function PlantDetail({ plantName, dailyWaterTime }) {
  // TODO:
  // Implement ability to edit, and delete plant,
  // as well as viewing reminders for the plant,
  // and creating a new reminder
  return (
    <>
      <p>{plantName}</p>
      <p>{dailyWaterTime}</p>
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
        <Route
          path={`/plants/:id`}
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
          path="/plants"
          render={props => (
            <PlantsList
              isLoading={this.props.isLoading}
              plants={this.props.plants}
              {...props}
            />
          )}
        />
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
  { getPlants }
)(PlantsPage);
