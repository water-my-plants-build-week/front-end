import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { registerUser, login } from "../actions";

import {
  Input,
  Label,
  Button,
  Form,
  FormCard,
  FormTitle,
  FormError
} from "./form-components";

// TODO: Remove duplicated styles
const P = styled.p`
  color white;
  font-size: 18px;
  margin: 1rem 0;
`;

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Please make your username at least five characters in length")
    .required("Enter a username"),
  password: Yup.string()
    .min(5, "Please make your password at least five characters in length")
    .required(),
  phoneNumber: Yup.string()
    .length(10, "Please enter a valid phone number with 10 digits")
    .matches(/\d{10}/, "Phone numbers should only contain digits")
    .required("Please enter a phone number"),
  timezone: Yup.string().required("Enter a city")
});

function RegisterForm({ registerUser, login, errorMessage, history }) {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        phoneNumber: "",
        timezone: ""
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { username, password } = values;
          await registerUser(values);
          await login(username, password);
          history.push("/plants");
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.error(e.message);
          }
          formikHelpers.setSubmitting(false);
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
        <>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <FormCard>
            <Form onSubmit={handleSubmit}>
              <FormTitle>Sign Up</FormTitle>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormError touched={touched.username} error={errors.username} />

              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormError touched={touched.password} error={errors.password} />

              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormError
                touched={touched.phoneNumber}
                error={errors.phoneNumber}
              />

              <Label htmlFor="timezone">Enter Your City</Label>
              <P style={{ alignSelf: "flex-start", margin: 0 }}>
                This is used to set the time zone for your reminders
              </P>
              <Input
                id="timezone"
                type="text"
                name="timezone"
                value={values.timezone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormError touched={touched.timezone} error={errors.timezone} />

              {/* 
              
                TODO: Add some sort of loading indication for the user so that they know the form is submitting
              
                  */}

              <Button disabled={isSubmitting} type="submit">
                Sign up
              </Button>
              <P>Already have an account?</P>
              <Button disabled={isSubmitting} as={Link} to="/login">
                Login
              </Button>
            </Form>
          </FormCard>
        </>
      )}
    </Formik>
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.authorization.registration.isLoading,
    errorMessage: state.authorization.registration.errorMessage
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { registerUser, login }
  )(RegisterForm)
);
