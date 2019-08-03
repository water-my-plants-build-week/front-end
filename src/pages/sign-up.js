import React from "react";
import styled from "styled-components";

import RegisterForm from "../components/register-form";

const PageTitle = styled.h1`
  color: #538aae;
  font-size: 42px;
  font-weight: 800;
  margin: 2.5rem 0;
`;

export default function SignUpPage() {
  return (
    <>
      <PageTitle>Water My Plants</PageTitle>
      <RegisterForm />
    </>
  );
}
