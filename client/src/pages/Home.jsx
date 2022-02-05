import React, { useState } from "react";
import randomize from "randomatic";
import Gun from "gun";
import "gun/sea";
import "gun/axe";
function Home({ gun }) {
  const [url, seturl] = useState("");
  const [random, setrandom] = useState("");
  const [short, setshort] = useState(false);

  function randomShit(event) {
    const ran = randomize("Aa0", 10);
    event.preventDefault();
    setrandom(ran);
    const shit = {
      url: url,
    };
    gun.get("redirect").get(ran).put(shit);
    // setrandom(randomize("Aa0", 10));
  }
  return (
    <div>
      <h1>INPUST</h1>
      <h3>{url}</h3>
      <h6>
        {window.origin}/r/{short || random}
      </h6>
      <form onSubmit={randomShit}>
        <input
          required
          type="text"
          onChange={(e) => seturl(e.target.value)}
        ></input>
        {/* <input type="text" onChange={(e) => setshort(e.target.value)}></input> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
