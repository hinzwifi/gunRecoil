import { useState } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <meta http-equiv="refresh" content={`0; url = ${url}`} />
      </Helmet> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="r/:id" element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
