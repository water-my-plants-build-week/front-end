import React from "react";
import { connect } from "react-redux";
import { getPlants, addPlant, deletePlant } from "../actions";

class Plant extends React.Component {
  state = {
    plantName: "",
    dailyWaterTime: ""
  };

  componentDidMount() {
    this.props.getPlants();
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addPlant = e => {
    e.preventDefault();
    this.props.addPlant(this.state);
    this.setState({ plantName: "", dailyWaterTime: "" });
  };

  deletePlant = (e, id) => {
    console.log(e);
    this.props.deletePlant(id);
  };

  render() {
    return (
      <>
        <form onSubmit={this.addPlant}>
          <nav>
            <h1>Add a Plant</h1>
          </nav>

          <input
            placeholder="Plant Name"
            value={this.state.plantName}
            onChange={this.handleChanges}
            name="plantName"
          />
          <input
            placeholder="Time to Water Plant"
            value={this.state.dailyWaterTime}
            onChange={this.handleChanges}
            name="dailyWaterTime"
          />
          <button type="submit">Add Plant</button>
        </form>
        <div>
          {this.props.plants.map((plantName, index) => (
            <div key={index}>
              <span> {plantName.name} </span>
              <p>Plant: {plantName.plantName} </p>
              <p>Water Time: {plantName.dailyWaterTime} </p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  plants: state.plants
});

export default connect(
  mapStateToProps,
  { getPlants, addPlant, deletePlant }
)(Plant);
