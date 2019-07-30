import React from "react";
import { connect } from "react-redux";
import { getPlants } from "../actions";

class PlantsPage extends React.Component {
  componentDidMount() {
    this.props.getPlants();
  }

  render() {
    return (
      <div>
        {this.props.plants.map((plantName, index) => (
          <div key={index}>
            <span> {plantName.name} </span>
            <p>Plant: {plantName.plantName} </p>
            <p>Water Time: {plantName.dailyWaterTime} </p>
          </div>
        ))}
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
