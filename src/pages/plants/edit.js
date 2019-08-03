import React from "react";
import { connect } from "react-redux";
import PlantForm from "../../components/plant-form";
import ResourceNotFound from "../../components/resource-not-found";
import { updatePlant } from "../../actions";
import { BeatLoader } from "react-spinners";

function EditPlant({ plant, isLoading, updatePlant, history }) {
  if (isLoading) {
    return <BeatLoader />;
  }

  if (!plant) {
    return <ResourceNotFound resource="Plant" />;
  }

  const handleSubmit = async values => {
    try {
      await updatePlant(plant.id, values);
      history.push("/plants");
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e.message);
      }
    }
  };

  return (
    <PlantForm
      {...plant}
      formTitle="Edit Plant"
      submitText="Update Plant"
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
    isLoading: state.user.fetchingPlants
  };
};

export default connect(
  mapStateToProps,
  { updatePlant }
)(EditPlant);
