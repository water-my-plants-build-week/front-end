import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { FormCard, Form, Input, FormError } from "./form-components";

import { createPlant, getPlants } from "../actions";

const PlantSchema = Yup.object().shape({
  plantName: Yup.string().required("Plant name is required"),
  dailyWaterTime: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}$/, "Required Time Format - HR:MM:SS")
    .required("Watering time is required")
});

class Plant extends React.Component {
  static defaultProps = {
    plantName: "",
    dailyWaterTime: ""
  };

  render() {
    return (
      <Formik
        initialValues={{
          plantName: this.props.plantName,
          dailyWaterTime: this.props.dailyWaterTime
        }}
        validationSchema={PlantSchema}
        onSubmit={values => {
          this.props.onSubmit(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          isSubmitting
        }) => (
          <FormCard>
            <Form onSubmit={handleSubmit}>
              <nav>
                <h1>Add a Plant</h1>
              </nav>

              <Input
                placeholder="Plant Name"
                value={values.plantName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="plantName"
              />

              <FormError
                touched={touched.plantName}
                error={errors.plantName}
                name={"plantName"}
              />

              <Input
                placeholder="Time to Water Plant"
                value={values.dailyWaterTime}
                onChange={handleChange}
                onBlur={handleBlur}
                name="dailyWaterTime"
              />

              <FormError
                touched={touched.dailyWaterTime}
                error={errors.dailyWaterTime}
                name={"dailyWaterTime"}
              />

              <button disabled={isSubmitting} type="submit">
                {this.props.submitText}
              </button>
            </Form>
          </FormCard>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  plants: state.plants
});

export default connect(
  mapStateToProps,
  { createPlant, getPlants }
)(Plant);
