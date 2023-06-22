const { Server } = require("./server/server");
const { AccessHandler } = require("./src/controllers/AccessHandler.js");
const { Authorizer } = require("./src/controllers/Authorizer.js");
const { UserHandler } = require("./src/controllers/UserHandler.js");
const { User } = require("./src/models/User.js");
const { UserData } = require("./src/models/UserData.js");
const { DataBaseHandler } = require("./src/controllers/DataBaseHandler.js");
const { GroupHandler } = require("./src/controllers/GroupHandler.js");
const { Access } = require("./src/models/access.js");
require("dotenv").config();

const app = new Server();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, pipo!");
});

// Ruta sign up
app.post("/UserHandler/signup", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const requestData = JSON.parse(body);

    if (requestData != null && requestData !== "") {
      let user = Object.assign({}, User);
      user.userName = requestData.userName;
      user.password = requestData.password;

      let dataBaseHandler = new DataBaseHandler();
      let groupH = new GroupHandler(dataBaseHandler);
      let userHandler = new UserHandler(dataBaseHandler, groupH);

      /* userHandler.create(user); */
      userHandler.showAll().then((users) => {
        res.end(JSON.stringify(users));
      });
    }
  });
});

// Iniciar el servidor en el puerto 3000
app.start(port);
