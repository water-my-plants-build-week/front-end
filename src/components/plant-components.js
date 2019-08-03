import styled from "styled-components";
import { Link as UglyLink } from "react-router-dom";

import { colors, sizes, easeInOut, shadow } from "../styles";

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 90%;
  margin: ${sizes[4]} auto;
`;

export const Li = styled.li`
  padding: ${sizes[4]} ${sizes[8]};
  background-color: ${colors.blue};
  border-radius: ${sizes[1]};
  margin-bottom: ${sizes[8]};
  color: ${colors.gold};
  font-size: ${sizes[4]};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${easeInOut};
  ${shadow};
`;

export const Link = styled(UglyLink)`
  font-size: ${sizes[4]};
  font-family: sans-serif;
  text-decoration: none;
  color: white;
`;

export const Button = styled(UglyLink)`
  font-family: sans-serif;
  background-color: ${colors.green};
  border-radius: ${sizes[1]};
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  font-size: ${sizes[6]};
  padding: ${sizes[4]} ${sizes[8]};
  border: none;
  cursor: pointer;
  text-decoration: none;
  margin: 1.5rem 0;

  ${easeInOut};
  ${shadow};
`;
