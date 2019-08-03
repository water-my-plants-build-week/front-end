import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { deletePlant, deleteReminder } from "../../actions";
import { colors, sizes, shadow, easeInOut } from "../../styles";

const Card = styled.li`
  padding: ${sizes["4"]} ${sizes["8"]};
  background-color: ${colors.blue};
  border-radius: ${sizes["1"]};
  margin-bottom: ${sizes["8"]};
  color: ${colors.gold};
  font-size: ${sizes["4"]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${easeInOut};
  ${shadow};
`;

const Ul = styled.ul`
  max-width: 600px;
  width: 90%;
  margin: 1rem auto;
`;

const TrashButton = styled(FaTrashAlt)`
  color: ${colors.red};
  cursor: pointer;
  font-size: ${sizes["4"]};
  ${easeInOut};
  &:hover {
    color: ${colors.dark.red};
  }
`;

const Button = styled.button`
  padding: ${sizes["4"]} ${sizes["8"]};
  border-radius: ${sizes["1"]};
  border: none;
  background-color: ${colors.teal};
  color: white;
  font-size: ${sizes["4"]};
  text-transform: uppercase;
  font-family: sans-serif;
  text-decoration: none;
  cursor: pointer;
  margin: ${sizes["2"]} ${sizes["8"]};
  ${easeInOut};
  ${shadow};
  &:hover {
    background-color: ${colors.dark.teal};
  }
`;

const DeleteBtn = styled(Button)`
  background-color: ${colors.red};
  ${easeInOut};
  ${shadow};
  &:hover {
    background-color: ${colors.dark.red};
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1000px;
  width: 90%;
  margin: ${sizes["2"]} auto;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Detail = styled.h3`
  font-size: ${props => {
    switch (props.size) {
      case "LG":
        return sizes["12"];
      default:
        return sizes["6"];
    }
  }};
  padding: ${sizes["1"]} 0;
  margin-bottom: ${sizes["2"]};
  color: ${props => (props.color ? props.color : colors.brown)};
`;

const Hr = styled.div`
  max-width: 800px;
  width: 90%;
  background-color: ${colors.brown};
  height: 3px;
  border-radius: 1px;
  margin: ${sizes["4"]} auto ${sizes["8"]} auto;
`;

function PlantDetail({
  plant,
  match,
  deletePlant,
  deleteReminder,
  history,
  reminders,
  isLoading
}) {
  const handleDeletePlant = async () => {
    try {
      await deletePlant(match.params.id);
      history.push("/plants");
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e.message);
      }
    }
  };

  const handleDeleteReminder = async id => {
    try {
      await deleteReminder(id);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e.message);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <p>Fetching some info on your plants</p>
        <BeatLoader />
      </>
    );
  }

  if (!plant) {
    return <p>No plant with that id found</p>;
  }

  return (
    <>
      <br />
      <Detail size="LG" color="#312d2a">
        {plant.plantName}
      </Detail>
      <Detail>Daily Watering Time {plant.dailyWaterTime}</Detail>
      <br />
      <Hr />
      <Detail>Reminders</Detail>

      {reminders.length === 0 ? (
        <p>No Reminders</p>
      ) : (
        <Ul>
          {reminders.map(reminder => (
            <Card key={reminder._id}>
              <p>
                Remember to water {plant.plantName} on{" "}
                {format(reminder.time, "MMMM Do, YYYY")}
              </p>
              <TrashButton
                aria-label="Delete reminder"
                onClick={() => handleDeleteReminder(reminder._id)}
              />
            </Card>
          ))}
        </Ul>
      )}

      <Flex>
        <Button as={Link} to={`/plants/${match.params.id}/reminder/new`}>
          Add Reminder
        </Button>
        <Button as={Link} to={`/plants/${match.params.id}/edit`}>
          Edit Plant
        </Button>
        <DeleteBtn onClick={handleDeletePlant}>Delete Plant</DeleteBtn>
      </Flex>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const plant = state.user.plants.find(
    plant => plant.id === Number(ownProps.match.params.id)
  );

  /*
   * Because plant might be undefined even for a brief second,
   * we need to guard against checking it's properties
   */

  const reminders = plant
    ? state.user.reminders.filter(
        reminder => reminder.plantName === plant.plantName
      )
    : [];

  return {
    plant,
    reminders,

    /*
     * Because both the plant and the reminders could be fetched by accessing
     * this page, we want to make sure that there isn't flashes and un-flashes
     * of loading state if one request finishes before the other is ready.
     */

    isLoading: state.user.fetchingPlants || state.user.fetchingReminders,
    errorMessage: state.user.errorMessage
  };
};

export default connect(
  mapStateToProps,
  { deletePlant, deleteReminder }
)(PlantDetail);
