import React from "react";
import { connect } from "react-redux";
import { createPlant } from "../../actions";

import PlantForm from "../../components/plant-form";

function NewPlant({ createPlant, history }) {
  const handleSubmit = async values => {
    try {
      await createPlant(values);
      history.push("/plants");
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error(e.message);
      }
    }
  };

  return (
    <PlantForm
      formTitle="Create Plant"
      submitText="Add Plant"
      onSubmit={handleSubmit}
    />
  );
}

export default connect(
  null,
  { createPlant }
)(NewPlant);
