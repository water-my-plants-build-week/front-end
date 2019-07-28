import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation({ history }) {
  const token = localStorage.getItem("token");

  return token ? (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/login");
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </nav>
  ) : null;
}

export default withRouter(Navigation);
