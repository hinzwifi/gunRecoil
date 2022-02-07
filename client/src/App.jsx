import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import Gun from "gun";
import "gun/sea";
import "gun/axe";
import Data from "./pages/Data";
function App() {
  const [count, setCount] = useState(0);
  const [gunJS, setgunJS] = useState({});
  useEffect(() => {
    const db = Gun({
      peers: [
        "https://gunrecoil1.herokuapp.com/gun",
        "https://gunrecoil.herokuapp.com/gun",
      ],
    });
    setgunJS(db);
  }, [Gun]);
  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <meta http-equiv="refresh" content={`0; url = ${url}`} />
      </Helmet> */}
      <Routes>
        <Route exact path="/" element={<Home gun={gunJS} />} />
        <Route path="/:id" element={<Redirect />} />
        <Route path="/d" element={<Data gun={gunJS} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
