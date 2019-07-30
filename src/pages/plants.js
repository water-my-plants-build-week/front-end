import React from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getPlants } from "../actions";

function PlantsList({ plants }) {
  // TODO: Extract component
  return plants.map((plant, index) => (
    <div key={index}>
      <Link to={`/plants/${plant.id}`}>
        <p>Plant: {plant.plantName} </p>
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
            return <PlantDetail {...plant} {...props} />;
          }}
        />

        <Route
          exact
          path="/plants"
          render={props => <PlantsList plants={this.props.plants} {...props} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  plants: state.plants
});

export default connect(
  mapStateToProps,
  { getPlants }
)(PlantsPage);
