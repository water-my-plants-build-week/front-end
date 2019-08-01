import React from "react";
import { Link } from "react-router-dom";

export default function ResourceNotFound({ resource, route = "/plants" }) {
  return (
    <>
      <h1>{resource} not found</h1>
      <Link to={route}>View your greenhouse</Link>
    </>
  );
}
