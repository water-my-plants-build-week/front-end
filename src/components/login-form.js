import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions";

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

        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

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

          <button type="submit">Register</button>

          <p>Don't have an account?</p>
          <Link to="/sign-up">Sign up</Link>
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
  { login }
)(LoginForm);
