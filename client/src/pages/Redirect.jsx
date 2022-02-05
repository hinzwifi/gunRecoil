import React from "react";
import { useParams } from "react-router-dom";
function Redirect() {
  const { id } = useParams();
  console.log(id);
  return <div>Redirect </div>;
}

export default Redirect;
