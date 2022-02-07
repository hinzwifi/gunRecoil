import React, { useState, useEffect, useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import randomize from "randomatic";
import Gun from "gun";
import "gun/sea";
import "gun/axe";

import QRCode from "react-qr-code";
import { CSSTransition } from "react-transition-group";
import copy from "copy-to-clipboard";

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
  const [dialog, setdialog] = useState(false);

  const copyToClipboard = () => {
    copy(`${window.origin}/${shortCheck}`);
  };
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
        setdialog(true);
      });

      // setrandom(randomize("Aa0", 10));
    }
  }
  return (
    <div className=" max-w-2xl py-10    mt-5  md:mt-15 mx-auto">
      <div
        className="  max-w-md mx-auto
      p-3 mb-3  rounded-lg text-center "
      >
        <p className=" text-4xl md:text-6xl">
          🔫 Recoil
          <a
            href="https://gun.eco"
            className=" hover:text-red-400 duration-300 underline text-red-300 "
          >
            Gun
          </a>
        </p>
        <br />
        <p className=" text-lg  md:text-2xl">
          A URL shortener that has zero limits{" "}
        </p>
      </div>
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

      {dialog ? (
        <>
          <div className=" flex justify-between rounded-md relative bg-accent max-w-md mx-3 sm:mx-auto mb-5 p-5">
            <div>
              <div className="mb-3 text-neutral  relative">
                <div className="text-xl ">Your short url:</div>
                <div className="text-lg">
                  {window.origin}/{shortCheck}
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="btn btn-primary mr-2"
              >
                Copy
              </button>
              <label
                for="my-modal-2"
                class="btn btn-primary modal-button      "
              >
                QR Code
              </label>
              <input
                type="checkbox"
                id="my-modal-2"
                class="modal-toggle relative"
              />
              <div class="modal  ">
                <div class="modal-box">
                  <QRCode
                    className="mx-auto rounded-md  "
                    value={`${window.origin}/${shortCheck}`}
                  />
                  <div class="modal-action">
                    {/* <label for="my-modal-2" class="btn btn-primary">
                    Accept
                  </label> */}

                    <label
                      for="my-modal-2"
                      class="btn btn-circle btn-sm btn-ghost top-3 right-3 absolute"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setdialog(false)}
              className="btn btn-sm btn-circle btn-ghost "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1></h1>
        </>
      )}
      <form
        className="form-control mx-2 max-w-lg sm:mx-auto bg-base-300 p-5 rounded-md"
        onSubmit={randomShit}
      >
        <label class="label">
          <span class="label-text   text-lg ">Add any url: </span>
        </label>
        <input
          className="input input-accent input-bordered mb-5"
          value={url}
          required
          type="url"
          placeholder="https://example.com"
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
    </div>
  );
}

export default Home;
