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
  background-color: #4cc2be;
  border-radius: 10px;
  padding: 0.7rem 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const Link = styled(UglyLink)`
  font-size: 16px;
  font-family: sans-serif;
  text-decoration: none;
  color: white;
`;

export const Button = styled(UglyLink)`
  background-color: #80bd0c;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.2);
  }
`;
