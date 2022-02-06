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
    // window.gun = db;
    // var note = { url: "https://hinzwifi.xyz" };
    // db.get("redirect").get(id).put(note);
    // db.get("redirect")
    //   .get(id)
    //   .once(function (data, key) {
    //     setview(data);
    //   });
    // db.get("redirect").get(id);

    db.get("redirect")
      .get(id)
      .once(function (data, key) {
        if (data === undefined) {
          setnothing(false);
        } else {
          setview(data.urlViews + 1);
          SEA.decrypt(data.url, "supersecret").then((e) => {
            setredirect(e);
          });
        }
      });

    // axios
    //   .get(
    //     "https://raw.githubusercontent.com/hinzwifi/gunRecoil/47dcdd7f9400612dc6ad77290f46be893b7661b3/client/url.json"
    //   )
    //   .then((res) => {
    //     const get = res.data;
    //     setredirect(get.url);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
