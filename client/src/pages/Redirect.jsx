import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gun from "gun";
import "gun/sea";
import "gun/axe";
import { Helmet } from "react-helmet";
function Redirect() {
  const [redirect, setredirect] = useState(false);
  const [nothing, setnothing] = useState(true);
  const [view, setview] = useState(0);
  const { id } = useParams();

  function Here() {
    return (
      <>
        {nothing ? (
          <></>
        ) : (
          <>
            <h2>BRUH</h2>
          </>
        )}
      </>
    );
  }
  useEffect(() => {
    const db = Gun("http://localhost:3070/gun");
    db.get("redirect")
      .get(id)
      .once(function (data, key) {
        if (data === undefined) {
          setnothing(false);
        } else {
          SEA.decrypt(data.url, "supersecret").then((e) => {
            setredirect(e);
          });
        }
      });
  }, []);

  return (
    <>
      {redirect ? (
        <Helmet>
          <title>Redirecting...</title>
          <meta http-equiv="refresh" content={`0; url = ${redirect}`} />
        </Helmet>
      ) : (
        <>
          <Here />
        </>
      )}
    </>
  );
}

export default Redirect;
