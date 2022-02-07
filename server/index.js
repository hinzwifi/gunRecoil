const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
// const cors = require("cors");
// const corsOptions = {
//   origin: "*",
// };
// app.use(cors(corsOptions));
const port = 3070;
app.use(express.static(path.join(__dirname, "dist")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
const server = app.listen(process.env.PORT || port);
