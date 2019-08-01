import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deletePlant, getPlants } from "../../actions";

// TODO:
// Add ability to delete reminder
// Move functionality to delete a plant up into this page

function PlantDetail({
  plantName,
  dailyWaterTime,
  match,
  deletePlant,
  getPlants,
  history,
  reminders
}) {
  // TODO:
  // Implement ability to edit, and delete plant,
  // as well as viewing reminders for the plant,
  // and creating a new reminder

  const handleDeletePlant = async () => {
    try {
      await deletePlant(match.params.id);
      await getPlants();
      history.push("/plants");
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e.message);
      }
    }
  };

  return (
    <>
      <p>{plantName}</p>
      <p>{dailyWaterTime}</p>
      <p>Reminders</p>

      {/* TODO: Extract into reminders list component */}

      {reminders.length === 0 ? (
        <p>No Reminders</p>
      ) : (
        reminders.map(reminder => (
          <React.Fragment key={reminder._id}>
            <p>
              Remember to water {plantName} at {reminder.time}
            </p>
          </React.Fragment>
        ))
      )}

      <Link to={`/plants/${match.params.id}/reminder/new`}>Add reminder</Link>
      <Link to={`/plants/${match.params.id}/edit`}>Edit</Link>
      <button onClick={handleDeletePlant}>Delete Plant</button>
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
  { deletePlant, getPlants }
)(PlantDetail);
