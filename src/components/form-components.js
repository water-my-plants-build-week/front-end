import React from "react";
import styled from "styled-components";

import { colors, sizes, shadow, easeInOut } from "../styles";

const Input = styled.input`
  background-color: ${colors.lightBlue};
  border: 1px solid ${colors.borders.lightBlue};
  border-radius: ${sizes[1]};
  color: white;
  width: 100%;
  padding: ${sizes[3]};
  font-size: ${sizes[4]};
  margin-bottom: ${sizes[5]};
`;

const Label = styled.label`
  color: ${colors.white};
  text-transform: uppercase;
  letter-spacing: 2px;
  align-self: flex-start;
`;

const FormCard = styled.div`
  border-radius: ${sizes[2]};
  background-color: ${colors.teal};
  display: flex;
  flex-direction: column;
  padding: ${sizes[8]} ${sizes[6]};
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: ${sizes[12]} auto;
  ${shadow};
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

  font-size: ${sizes[6]};
  font-weight: 700;
  margin-bottom: ${sizes[4]};
`;

const Button = styled.button`
  background-color: ${colors.green};
  border-radius: ${sizes[1]};
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  font-size: ${sizes[5]};
  padding: ${sizes[4]} ${sizes[8]};
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin: ${sizes[6]} 0;
  ${easeInOut};
  ${shadow};
`;

const FormErrorDetail = styled.p`
  font-size: ${sizes[4]};
  color: ${colors.dark.gold};
  text-transform: uppercase;
`;
const PlaceHolder = styled.div`
  height: ${sizes[4]};
`;

function FormError({ touched, error }) {
  return touched && error ? (
    <FormErrorDetail>{error}</FormErrorDetail>
  ) : (
    <PlaceHolder />
  );
}

export { Input, Label, FormCard, Form, FormTitle, Button, FormError };
