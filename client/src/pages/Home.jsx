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

  let sup = [];
  let mother = [];

  const [formState, setForm] = useState({
    name: "",
    short: "",
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const [celebrants, setCelebrants] = useState([]);

  useEffect(() => {
    const messages = kekw.get("redirect");

    messages.map().on(async (m) => {
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
    <div className="max-w-md  mt-20 mx-auto">
      <p className="  text-center text-3xl">🔫 RecoilGun</p>
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
        {window.origin}/{shortCheck}
      </h6>
      <h5>{urlCheck}</h5>
      <div class="w-full mb-5">
        <div class="flex p-5 rounded-lg shadow bg-white">
          <div>
            <svg
              class="w-6 h-6 fill-current text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
          <div class="ml-3">
            <h2 class="font-semibold text-gray-800">Your short link</h2>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
              impedit ipsam nam quam! Ab accusamus aperiam distinctio doloribus,
              praesentium quasi reprehenderit soluta unde?
            </p>
          </div>
        </div>
      </div>
      <form
        className="form-control bg-base-300 p-5 rounded-md"
        onSubmit={randomShit}
      >
        <label class="label">
          <span class="label-text   text-lg ">Add an url: </span>
        </label>
        <input
          className="input input-bordered mb-5"
          value={url}
          required
          type="text"
          onChange={(e) => seturl(e.target.value)}
        ></input>
        <div className=" p-5 card bg-base-200">
          <p className=" text-lg"></p>
          <label class="label">
            <span class="label-text">Optional: </span>
          </label>
          <input
            className="input input-bordered mb-5"
            value={short}
            placeholder="Custom short URL:"
            type="text"
            onChange={(e) => setshort(e.target.value)}
          ></input>
        </div>
        <div class="divider"></div>
        <button className="btn btn-primary" type="submit">
          Recoiled
        </button>
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
    </div>
  );
}

export default Home;
