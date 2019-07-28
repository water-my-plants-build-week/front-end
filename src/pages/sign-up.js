import React from "react";
import styled from "styled-components";

import RegisterForm from "../components/register-form";

// TODO: Remove duplication and export into styled sheets
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
