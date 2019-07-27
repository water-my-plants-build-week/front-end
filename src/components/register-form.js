import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../actions";

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

        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </form>
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
