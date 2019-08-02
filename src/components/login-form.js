import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { login } from "../actions";

import {
  Button,
  FormCard,
  Form,
  FormError,
  FormTitle,
  Input,
  Label
} from "./form-components";

// TODO: Remove duplicated styles
const P = styled.p`
  color white;
  font-size: 18px;
  margin: 1rem 0;
`;

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

/*
 * I was having intermittent issues with React-Router and Redux, it seems like
 * it may be because of Blocked Updates.
 *
 * link: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
 *
 * */

function LoginForm({ login, errorMessage, history }) {
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { username, password } = values;
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
          {errorMessage ? (
            <p style={{ color: "red", fontSize: "20px", fontWeight: 800 }}>
              {errorMessage}
            </p>
          ) : (
            <div style={{ height: "20px" }} />
          )}

          <FormCard>
            <Form onSubmit={handleSubmit}>
              <FormTitle>Login</FormTitle>

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

              {/* 
              
                TODO: Add some sort of loading indication for the user so that they know the form is submitting
              
                  */}
              <Button disabled={isSubmitting} type="submit">
                Login
              </Button>

              <P>Don't have an account?</P>
              <Button disabled={isSubmitting} as={Link} to="/sign-up">
                Sign up
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
    isLoading: state.authorization.login.isLoading,
    errorMessage: state.authorization.login.errorMessage
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(LoginForm)
);
