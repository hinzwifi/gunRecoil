const app = require("express")();
const Gun = require("gun");
require("dotenv").config();
const port = 3070;
app.use(Gun.serve);
const server = app.listen(process.env.PORT || port);
Gun({ web: server });
