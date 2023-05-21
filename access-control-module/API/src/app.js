const { userData } = require("./models/UserData.js");
const { AccesHandler } = require("./controllers/AccessHandler.js");
const { Authorizer } = require("./controllers/Authorizer.js");
const { UserHandler } = require("./controllers/UserHandler.js");
const { User } = require("./models/User.js");
const { DataBaseHandler } = require("./controllers/DataBaseHandler.js");

const http = require("http");
require("dotenv").config();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end();
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is lisening on port: ${port}`);
});

let dataBaseHandler = new DataBaseHandler();
let userHandler = new UserHandler(dataBaseHandler);
user = User;
user.name = "pedro";
user.password = "poejekndka";

/* userHandler.create(user); */
