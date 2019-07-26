import React from "react";

import RegisterForm from "../components/register-form";
import LoginForm from "../components/login-form";

const Login = () => {
  return (
    <>
      <h1>Login Page</h1>
      <RegisterForm />
      <br />
      <LoginForm />
    </>
  );
};

export default Login;
