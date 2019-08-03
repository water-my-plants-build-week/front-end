import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";

import { Ul, Li, Link, Button } from "../../components/plant-components";

import { colors, sizes, easeInOut, shadow } from "../../styles";

const Header = styled.h3`
  font-size: ${props => {
    switch (props.size) {
      case "LG":
        return sizes["12"];
      default:
        return sizes["6"];
    }
  }};
  padding: ${sizes["1"]} 0;
  margin-top: ${sizes[4]};
  margin-bottom: ${sizes[2]};
  color: ${props => (props.color ? props.color : colors.brown)};
`;

const StyledLink = styled(Link)`
  padding: ${sizes[4]} ${sizes[8]};
  border-radius: ${sizes[1]};
  border: none;
  background-color: ${colors.teal};
  color: white;
  font-size: ${sizes[4]};
  text-transform: uppercase;
  font-family: sans-serif;
  text-decoration: none;
  cursor: pointer;
  margin: 0.5rem auto;
  max-width: 200px;
  ${easeInOut};
  ${shadow};
  &:hover {
    background-color: ${colors.dark.teal};
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 90%;
  margin: ${sizes[8]} auto;
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
      <Header>Your Greenhouse</Header>
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
