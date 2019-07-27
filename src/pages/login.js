import React from "react";
import styled from "styled-components";

import LoginForm from "../components/login-form";

// TODO: Remove duplication and export into styled sheets
const PageTitle = styled.h1`
  color: #538aae;
  font-size: 42px;
  font-weight: 800;
  margin: 2.5rem 0;
`;

class Login extends React.Component {
  render() {
    return (
      <>
        <PageTitle>Water My Plants</PageTitle>
        <LoginForm />
      </>
    );
  }
}

export default Login;
