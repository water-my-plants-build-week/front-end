import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  background-color: #48c0bb;
  height: 3rem;
`;

const Ul = styled.ul`
  height: 100%;
  margin: 0 auto;
  max-width: 600px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li`
  font-family: sans-serif;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: #f5df80;
  }
`;

function Navigation({ history }) {
  const token = localStorage.getItem("token");

  return token ? (
    <Nav>
      <Ul>
        <li>
          <Li as={Link} to="/plants">
            Home
          </Li>
        </li>
        <li>
          <Li as={Link} to="/edit">
            User Settings
          </Li>
        </li>
        <li>
          <Li
            as="button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              history.push("/login");
            }}
          >
            Log out
          </Li>
        </li>
      </Ul>
    </Nav>
  ) : null;
}

export default withRouter(Navigation);
