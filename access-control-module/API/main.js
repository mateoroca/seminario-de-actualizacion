const { Server } = require("./server/server");
const { AccessHandler } = require("./src/controllers/AccessHandler.js");
const { Authorizer } = require("./src/controllers/Authorizer.js");
const { UserHandler } = require("./src/controllers/UserHandler.js");
const { User } = require("./src/models/User.js");
const { UserData } = require("./src/models/UserData.js");
const { DataBaseHandler } = require("./src/controllers/DataBaseHandler.js");
const { GroupHandler } = require("./src/controllers/GroupHandler.js");
const { Access } = require("./src/models/access.js");
const { Sanitizer } = require("./src/sanitizer/sanitizer");
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
    body += chunk.toString();
  });
  req.on("end", () => {
    const requestData = JSON.parse(body);

    const sanitizedData = new Sanitizer();
    sanitizedData.trimData(requestData);

    const isStryng = sanitizedData.validateTypeString(requestData);
    const isEmpty = sanitizedData.isDataEmpty(requestData);

    if (!isEmpty && isStryng) {
      let user = Object.assign({}, User);
      user.userName = requestData.userName;
      user.password = requestData.password;

      let dataBaseHandler = new DataBaseHandler();
      let groupH = new GroupHandler(dataBaseHandler);
      let userHandler = new UserHandler(dataBaseHandler, groupH);

      userHandler.create(user);

      res.end(JSON.stringify({ value: true }));
    } else {
      res.end(JSON.stringify({ message: "error empty data" }));
    }
  });
});

app.post("/UserHandler/signup/userData", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const requestData = JSON.parse(body);

    const sanitizedData = new Sanitizer();
    sanitizedData.trimData(requestData);
    console.log(
      `Es tipo string : ${sanitizedData.validateTypeString(requestData)}`
    );
    const isStryng = sanitizedData.validateTypeString(requestData);
    const isEmpty = sanitizedData.isDataEmpty(requestData);
    console.log(isEmpty);

    if (!isEmpty && isStryng) {
      let userData = Object.assign({}, UserData);
      userData.name = requestData.name;
      userData.surname = requestData.surname;
      userData.dni = requestData.dni;
      userData.email = requestData.email;
      userData.gender = requestData.gender;
      userData.phoneNumber = requestData.phonenumber;
      userData.isActive = 1;

      let dataBaseHandler = new DataBaseHandler();
      let groupH = new GroupHandler(dataBaseHandler);
      let userHandler = new UserHandler(dataBaseHandler, groupH);

      userHandler
        .GetLastUserID()
        .then((lastId) => {
          userHandler.createUserData(lastId, userData);
          res.end(JSON.stringify({ message: "success to create userdata" }));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      res.end(JSON.stringify({ message: "error empty data" }));
    }
  });
});

// Iniciar el servidor en el puerto 3000
app.start(port);
