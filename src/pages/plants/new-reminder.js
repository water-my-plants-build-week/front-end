import React from "react";
import { connect } from "react-redux";
import ReminderForm from "../../components/reminder-form";
import ResourceNotFound from "../../components/resource-not-found";
import { createReminder } from "../../actions";

function NewReminder({ plant, createReminder, isLoading, history }) {
  if (isLoading) {
    // TODO: Swap for loading component
    return <p>Loading...</p>;
  }

  if (!plant) {
    return <ResourceNotFound resource="Plant" />;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async date => {
    try {
      await createReminder({
        plantName: plant.plantName,
        phoneNumber: user.phoneNumber,
        timeZone: user.timezone,
        user_id: user.id,
        notification: true,
        time: `${date} ${plant.dailyWaterTime}`
      });

      history.push(`/plants/${plant.id}`);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e.message);
      }
    }
  };
  return (
    <ReminderForm
      formTitle="Create Reminder"
      submitText="Add Reminder"
      onSubmit={handleSubmit}
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  const plant = state.user.plants.find(
    plant => plant.id === Number(ownProps.match.params.id)
  );

  return {
    plant,
    isLoading: state.user.fetchingPlants || state.user.fetchingReminders
  };
};

export default connect(
  mapStateToProps,
  { createReminder }
)(NewReminder);
