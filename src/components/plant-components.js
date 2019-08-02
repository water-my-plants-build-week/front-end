import styled from "styled-components";
import { Link as UglyLink } from "react-router-dom";

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 90%;
  margin: 1rem auto;
`;

export const Li = styled.li`
  padding: 1rem 2rem;
  background-color: #295573;
  border-radius: 5px;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  color: #fef6ac;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    box-shadow: 8px 8px 6px rgba(0, 0, 0, 0.3);
  }
`;

export const Link = styled(UglyLink)`
  font-size: 16px;
  font-family: sans-serif;
  text-decoration: none;
  color: white;
`;

export const Button = styled(UglyLink)`
  font-family: sans-serif;
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
