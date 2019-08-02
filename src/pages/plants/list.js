import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";

import { Ul, Li, Link, Button } from "../../components/plant-components";

const Header = styled.h3`
  font-size: ${props => {
    switch (props.size) {
      case "LG":
        return "38px";
      default:
        return "24px";
    }
  }};
  padding: 0.25rem 0;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => (props.color ? props.color : "#556867")};
`;

const StyledLink = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  background-color: #4cc2be;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  font-family: sans-serif;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.15);
  margin: 0.5rem auto;
  max-width: 200px;
  &:hover {
    background-color: #45b3bb;
    box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.15);
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 90%;
  margin: 2rem auto;
`;

function PlantsList({ plants, isLoading }) {
  if (isLoading) {
    return (
      <>
        {" "}
        <Header>Loading...</Header>
        <BeatLoader />
      </>
    );
  }

  if (plants.length === 0) {
    return (
      <Flex>
        <Header>No Plants In Your Greenhouse</Header>

        <StyledLink to="/plants/new/">Add a plant</StyledLink>
      </Flex>
    );
  }

  return (
    <>
      <Ul>
        {plants.map((plant, index) => (
          <Li key={index}>
            <Link to={`/plants/${plant.id}`}>
              <p>Plant: {plant.plantName}</p>
              <p>Water Time: {plant.dailyWaterTime} </p>
            </Link>
          </Li>
        ))}
      </Ul>
      <Button to="/plants/new/">Add a plant</Button>
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
