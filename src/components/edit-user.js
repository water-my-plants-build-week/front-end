import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  FormCard,
  Form,
  Input,
  FormError,
  FormTitle,
  Button,
  Label
} from "./form-components";

import { editUser } from "../actions";

const UserSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  phoneNumber: Yup.string()
    .length(10, "Please enter a valid phone number with 10 digits")
    .matches(/\d{10}/, "Phone numbers should only contain digits")
    .required("Please enter a phone number")
});

function EditUser(props) {
  return (
    <Formik
      initialValues={{
        username: props.username,
        phoneNumber: props.phoneNumber
      }}
      validationSchema={UserSchema}
      onSubmit={async values => {
        try {
          await props.editUser(values);
          props.history.push("/plants");
        } catch (error) {
          if (process.env.NODE_ENV !== "production") {
            console.error(error.message);
          }
        }
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
              <FormTitle>Edit User</FormTitle>
            </nav>

            <Label htmlFor="username">User Name</Label>
            <Input
              id="username"
              placeholder="User Name"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
            />

            <FormError
              touched={touched.username}
              error={errors.username}
              name={"username"}
            />

            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              name="phoneNumber"
            />

            <FormError
              touched={touched.phoneNumber}
              error={errors.phoneNumber}
              name={"phoneNumber"}
            />

            <Button disabled={isSubmitting} type="submit">
              Update User
            </Button>
          </Form>
        </FormCard>
      )}
    </Formik>
  );
}

const mapStateToProps = state => {
  const user = localStorage.getItem("user");
  const { username, phoneNumber } = JSON.parse(user);
  return { username, phoneNumber };
};

export default connect(
  mapStateToProps,
  { editUser }
)(EditUser);
