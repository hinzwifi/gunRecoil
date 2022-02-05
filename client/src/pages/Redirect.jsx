import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gun from "gun";
import "gun/sea";
import "gun/axe";
import { Helmet } from "react-helmet";
function Redirect() {
  const [redirect, setredirect] = useState(false);
  const [view, setview] = useState(0);
  const { id } = useParams();

  // export const user = db.user().recall({ sessionStorage: true });

  // export const username = writable("");
  // user.get("alias").on((v) => username.set(v));

  // db.on("auth", async (event) => {
  //   const alias = await user.get("alias");
  //   username.set(alias);
  //   console.log(`Hi I am ${alias}`);
  // });
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
        SEA.decrypt(data.url, "supersecret").then((e) => {
          setredirect(e);
        });
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
  }, [Gun, view]);

  return (
    <>
      {redirect ? (
        <Helmet>
          <meta charSet="utf-8" />
          <title>Redirecting...</title>
          <meta http-equiv="refresh" content={`0; url = ${redirect}`} />
        </Helmet>
      ) : (
        <>
          {" "}
          <h1>HI still here</h1>
          <div>Moving my ass</div>{" "}
        </>
      )}
    </>
  );
}

export default Redirect;
