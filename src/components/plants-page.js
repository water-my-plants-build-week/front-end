import React from "react";
import { connect } from "react-redux";
import { getPlants, addPlant, deletePlant } from "../actions";
import * as Yup from "yup";
import { Formik } from "formik";
import { FormCard, Form, Input, FormError } from "./form-components";

const PlantSchema = Yup.object().shape({
  plantName: Yup.string().required("Plant name is required"),
  dailyWaterTime: Yup.string().matches(/^\d{2}:\d{2}:\d{2}$/, "Required Time Format - HR:MM:SS").required("Watering time is required")
});

class Plant extends React.Component {

  render() {
    return (
      <Formik
        initialValues={{
          plantName: "",
          dailyWaterTime: ""
        }}
        validationSchema={PlantSchema}
        onSubmit={values => {
          console.log(values)
        }}>
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
                  name="plantName"
                />

                <FormError touched={touched.plantName} error={errors.plantName} name={"plantName"} /> 
                

                <Input
                  placeholder="Time to Water Plant"
                  value={values.dailyWaterTime}
                  onChange={handleChange}
                  name="dailyWaterTime"
                />

                <FormError touched={touched.dailyWaterTime} error={errors.dailyWaterTime} name={"dailyWaterTime"} /> 

                <button type="submit">Complete</button>
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
  { getPlants, addPlant, deletePlant }
)(Plant);
