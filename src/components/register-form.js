import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../actions";

import {
  Input,
  Label,
  Button,
  Form,
  FormCard,
  FormTitle
} from "./form-components";

// TODO: Remove duplicated styles
const P = styled.p`
  color white;
  font-size: 18px;
  margin: 1rem 0;
`;

class RegisterForm extends React.Component {
  state = {
    username: "",
    password: "",
    phoneNumber: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, phoneNumber } = this.state;

    this.props
      .registerUser(username, password, phoneNumber)
      .then(() => {
        // TODO: Login user on successful sign up, and then redirect to the home
        // page
        console.log("success");
      })
      .catch(() => {
        // TODO: Provide better information to the user, and/or attempt to
        // recover from the error if possible
        console.log("failure 😭");
      });
  };

  render() {
    const { username, password, phoneNumber } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        {this.props.errorMessage && (
          <p style={{ color: "red" }}>{this.props.errorMessage}</p>
        )}

        <FormCard>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Sign Up</FormTitle>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />

            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
            />
            <Button type="submit">Sign up</Button>
            <P>Already have an account?</P>
            <Button as={Link} to="/login">
              Login
            </Button>
          </Form>
        </FormCard>
      </>
    );
  }
}

const mapStateToProps = ({ isLoading, errorMessage }) => {
  return {
    isLoading,
    errorMessage
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterForm);
