import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation({ history }) {
  const token = localStorage.getItem("token");

  return token ? (
    <nav>
      <ul>
        <li>
          <Link to="/plants">Home</Link>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              history.push("/login");
            }}
          >
            Log out
          </button>
        </li>
        <li>
          <Link to="/edit">User Settings</Link>
        </li>
      </ul>
    </nav>
  ) : null;
}

export default withRouter(Navigation);
