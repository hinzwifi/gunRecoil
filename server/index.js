const app = require("express")();
const Gun = require("gun");
const port = 3070;
app.use(Gun.serve);
const server = app.listen(port);
Gun({ web: server });
