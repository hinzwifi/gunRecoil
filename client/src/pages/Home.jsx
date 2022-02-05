import React, { useState, useEffect, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import randomize from "randomatic";
import Gun from "gun";
import "gun/sea";
import "gun/axe";
const kekw = Gun({
  peers: ["http://localhost:3070/gun"],
});
function reducer(state, message) {
  return {
    messages: [message, ...state.messages.slice(-100)],
  };
}
const initialState = {
  messages: [],
};
function Home({ gun }) {
  const [url, seturl] = useState("");
  const [random, setrandom] = useState("");
  const [short, setshort] = useState("");
  const [shortCheck, setshortCheck] = useState(false);
  const [urlCheck, setUrlcheck] = useState("");
  // const [shorcut, setShortcut] = useState([]);

  let newMessage;
  let messagesSHIT = [];
  // let messages = [];
  let sup = [];
  let mother = [];
  // useEffect(() => {
  //   gun
  //     .get("redirect")
  //     .map()
  //     .once(async (data, id) => {
  //       console.log(data);
  //     });
  // }, [gun]);
  // the form state manages the form input for creating a new message
  const [formState, setForm] = useState({
    name: "",
    short: "",
  });

  // initialize the reducer & state for holding the messages array
  const [state, dispatch] = useReducer(reducer, initialState);
  const [celebrants, setCelebrants] = useState([]);

  // when the app loads, fetch the current messages and load them into the state
  // this also subscribes to new data as it changes and updates the local state
  useEffect(() => {
    const messages = kekw.get("redirect");

    messages.map().once(async (m) => {
      // if (data) {
      // Key for end-to-end encryption
      //   const key = "#foo";
      //   var message = {
      //     // transform the data
      //     who: await db.user(data).get("alias"), // a user might lie who they are! So let the user system detect whose data it is.
      //     what: (await SEA.decrypt(data.what, key)) + "", // force decrypt as text.
      //     when: GUN.state.is(data, "what"), // get the internal timestamp for the what property.
      //   };
      //   if (message.what) {
      //     messages = [...messages.slice(-100), message].sort(
      //       (a, b) => a.when - b.when
      //     );
      //     if (canAutoScroll) {
      //       autoScroll();
      //     } else {
      //       unreadMessages = true;
      //     }
      //   }
      // }
      // const remove = m.url;
      // dispatch({
      //   url: m.url,
      //   short: m.shortURL,
      // });
      //  dispatch({
      //    name: m.name,
      //    message: m.message,
      //    createdAt: m.createdAt,
      //  });
      // console.log(m);
      // mother.push({
      //   url: m.url,
      //   short: m.shortURL,
      // });

      // console.log(mother);
      sup.push(m.shortURL);
    });
  }, [sup]);

  function randomShit(event) {
    event.preventDefault();
    const fucker = sup.includes(short);
    if (fucker) {
      toast.error(" It's already used!", {
        icon: "🚨",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const ran = randomize("Aa0", 10);
      SEA.encrypt(url, "supersecret").then((e) => {
        setrandom(ran);
        setUrlcheck(url);
        const shortPerson = short || ran;
        setshortCheck(shortPerson);
        const shit = {
          url: e,
          shortURL: shortPerson,
          urlViews: 0,
        };
        gun.get("redirect").get(shortPerson).put(shit);
        seturl("");
        setshort("");
        toast.success("🦄 Added the short url!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

      // setrandom(randomize("Aa0", 10));
    }
  }
  return (
    <>
      <h1>🔫 RecoilGun</h1>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h6>
        {window.origin}/r/{shortCheck}
      </h6>
      <h5>{urlCheck}</h5>
      <form onSubmit={randomShit}>
        <input
          value={url}
          required
          type="text"
          onChange={(e) => seturl(e.target.value)}
        ></input>
        <input
          value={short}
          type="text"
          onChange={(e) => setshort(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      {/* {celebrants.length ? (
        celebrants.map((celebrant) => (
          <li key={celebrant.url}> {celebrant.url} </li>
        ))
      ) : (
        <h1>kekw</h1>
      )}  */}
      {/* {sup.map((e) => (
        <h3>{e}</h3>
      ))} */}
      {/* {/* {state.messages.map((message) => ( */}
      {/* <div key={message.short}>
          <h2>{message.url}</h2>
          <h3>From: {message.short}</h3>
        </div>
      ))} */}
    </>
  );
}

export default Home;
