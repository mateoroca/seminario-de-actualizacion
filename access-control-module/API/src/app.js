const { AccesHandler } = require("./controllers/AccessHandler.js");
const { Authorizer } = require("./controllers/Authorizer.js");
const { UserHandler } = require("./controllers/UserHandler.js");
const { User } = require("./models/User.js");
const { UserData } = require("./models/UserData.js");
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
let user = Object.assign({}, User);

user.userName = "teico";
user.password = "123456";

let userData = Object.assign({}, UserData);

userData.name = "mateo";
userData.surname = "roca";
userData.dni = "39102838";
userData.email = "teico@gmail.com";
userData.gender = "male";
userData.phoneNumber = "2235959844";
userData.userMembership = "ceo";
userData.isActive = 1;

/* userHandler
  .getIdByUserName(user.userName)
  .then((userId) => {
    userHandler.createUserData(userId, userData);
  })
  .catch((error) => {
    console.error("Error:", error);
  }); */

/* userHandler
  .getIdByUserName(user.userName)
  .then((userId) => {
    userHandler.update(userId, userData);
  })
  .catch((error) => { 
    console.error("Error:", error);
  }); */

/* userHandler
  .getIdByUserName(user.userName)
  .then((userId) => {
    userHandler.remove(userId);
  })
  .catch((error) => {
    console.error("Error:", error);
  }); */

userHandler
  .getIdByUserName(user.userName)
  .then((userId) => {
    userHandler.read(userId);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/* userHandler.create(user); */
