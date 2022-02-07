const app = require("express")();
const Gun = require("gun");
require("dotenv").config();
const cors = require("cors");
const corsOptions = {
  origin: "*",
};
const port = 3070;
app.use(Gun.serve);
app.use(cors(corsOptions));

const server = app.listen(process.env.PORT || port);
Gun({ web: server });
