import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions";

import {
  Input,
  Label,
  FormCard,
  Form,
  FormTitle,
  Button
} from "./form-components";

// TODO: Remove duplicated styles
const P = styled.p`
  color white;
  font-size: 18px;
  margin: 1rem 0;
`;

class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props
      .login(username, password)
      .then(() => {
        // TODO: Implement redirect on success
        console.log("login success");
      })
      .catch(() => {
        // TODO: Remove the console log and attempt to recover from error
        // or provide additional information to the user so they can know what
        // they need to do.
        console.log("failure 😭");
      });
  };

  render() {
    const { username, password } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        {this.props.errorMessage && (
          <p style={{ color: "red" }}>{this.props.errorMessage}</p>
        )}

        <FormCard>
          <Form onSubmit={handleSubmit}>
            <FormTitle>Login</FormTitle>

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

            <Button type="submit">Login</Button>

            <P>Don't have an account?</P>
            <Button as={Link} to="/sign-up">
              Sign up
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
  { login }
)(LoginForm);
