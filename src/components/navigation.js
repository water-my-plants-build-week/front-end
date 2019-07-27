import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const token = localStorage.getItem("token");

  return token ? (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="/plant">Plant</Link>
        </li>
      </ul>
    </nav>
  ) : null;
}
