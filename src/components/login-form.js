import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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
        this.props.history.push("/");
      })
      .catch(err => {
        if (process.env.NODE_ENV !== "production") {
          console.error(err);
        }
      });
  };

  render() {
    const { username, password } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        {this.props.errorMessage ? (
          <p style={{ color: "red", fontSize: "20px", fontWeight: 800 }}>
            {this.props.errorMessage}
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

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(LoginForm)
);
