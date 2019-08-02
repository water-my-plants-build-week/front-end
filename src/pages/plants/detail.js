import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deletePlant, deleteReminder } from "../../actions";

const Card = styled.li`
  padding: 1rem 2rem;
  background-color: #295573;
  border-radius: 5px;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  color: #fef6ac;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Ul = styled.ul`
  max-width: 600px;
  width: 90%;
  margin: 1rem auto;
`;

const TrashButton = styled(FaTrashAlt)`
  color: #f49092;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: #df6467;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  background-color: #45b3bb;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  font-family: sans-serif;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 4px 2px 2px rgba(0, 0, 0, 0.15);
  margin: 0.5rem 2rem;
`;

const DeleteBtn = styled(Button)`
  background-color: #f49092;
  &:hover {
    background-color: #df6467;
  }
`;

const H3 = styled.h3``;

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
    return <p>Fetching some info on your plants</p>;
  }

  if (!plant) {
    return <p>No plant with that id found</p>;
  }

  return (
    <>
      <h3>{plant.plantName}</h3>
      <h4>{plant.dailyWaterTime}</h4>
      <br />
      <h3>Reminders</h3>

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

      <Button as={Link} to={`/plants/${match.params.id}/reminder/new`}>
        Add reminder
      </Button>
      <Button as={Link} to={`/plants/${match.params.id}/edit`}>
        Edit
      </Button>
      <DeleteBtn onClick={handleDeletePlant}>Delete Plant</DeleteBtn>
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
