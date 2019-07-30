import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background-color: #99e7e8;
  border: 1px solid #40a9b0;
  border-radius: 5px;
  color: white;
  width: 100%;
  padding: 0.7rem;
  font-size: 16px;
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  color: #efefed;
  text-transform: uppercase;
  letter-spacing: 2px;
  align-self: flex-start;
`;

const FormCard = styled.div`
  border-radius: 10px;
  background-color: #4ac4ae;
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.15);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const FormTitle = styled.h2`
  color: white;
  text-transform: uppercase;

  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #6fd41f;
  border-radius: 5px;
  box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.15);
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  font-size: 18px;
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin: 1.5rem 0;

  &:hover {
    box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.15);
  }
`;

function FormError({ touched, error }) {
  return touched && error ? (
    <p
      style={{ fontSize: "16px", color: "#f5df80", textTransform: "uppercase" }}
    >
      {error}
    </p>
  ) : (
    <div style={{ height: "16px" }} />
  );
}

export { Input, Label, FormCard, Form, FormTitle, Button, FormError };
