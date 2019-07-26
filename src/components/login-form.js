import React from "react";
import { connect } from "react-redux";
import { login } from "../actions";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
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
        console.log("login success");
      })
      .catch(() => {
        console.log("failure 😭");
      });
  };

  render() {
    const { username, password } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
      {this.props.errorMessage && <p style={{color: "red"}}>{this.props.errorMessage}</p>}

      <form onSubmit={handleSubmit}>
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
