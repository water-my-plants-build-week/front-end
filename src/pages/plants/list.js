import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function PlantsList({ plants, isLoading }) {
  // TODO: Implement a better loading indicator

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (plants.length === 0) {
    return (
      <>
        <h2>No Plants In Your Greenhouse</h2>

        <Link to="/plants/new/">Add a plant</Link>
      </>
    );
  }

  return (
    <>
      <ul>
        {plants.map((plant, index) => (
          <li key={index}>
            <Link to={`/plants/${plant.id}`}>
              <p>Plant: {plant.plantName}</p>
              <p>Water Time: {plant.dailyWaterTime} </p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/plants/new/">Add a plant</Link>
    </>
  );
}

const mapStateToProps = state => {
  return {
    plants: state.user.plants,
    isLoading: state.user.fetchingPlants
  };
};

export default connect(mapStateToProps)(PlantsList);
