const { AccesHandler } = require("./controllers/AccessHandler.js");
const { Authorizer } = require("./controllers/Authorizer.js");
const { UserHandler } = require("./controllers/UserHandler.js");
const { User } = require("./models/User.js");
const { UserData } = require("./models/UserData.js");
const { DataBaseHandler } = require("./controllers/DataBaseHandler.js");
const { GroupHandler } = require("./controllers/GroupHandler.js");

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
let groupH = new GroupHandler(dataBaseHandler);

/* groupH.checkIfGroupsExist().then((state) => {
  console.log(state[0].hasGroups);
});
 */

/* userHandler.showAll().then((users) => {
  users.forEach((u) => {
    console.log(u.user_name, u.id);
  });
}); */

/* groupH.showAll().then((dta) => {
  dta.forEach((element) => {
    console.log(element.id, element.name);
  });
}); */

/* groupH.create("ceo"); */
/* groupH.remove(12); */

/* user.userName = "frix";
user.password = "123456"; */

/* let userData = Object.assign({}, UserData);

userData.name = "mateo";
userData.surname = "roca";
userData.dni = "39102838";
userData.email = "teico@gmail.com";
userData.gender = "male";
userData.phoneNumber = "2235959844";
userData.userMembership = "ceo";
userData.isActive = 1;
 */
/* userHandler.showAll(); */

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

/* userHandler
  .getIdByUserName(user.userName)
  .then((userId) => {
    return userHandler.read(userId);
  })
  .then((userdta) => {
    console.log(userdta[0].name);
  })
  .catch((error) => {
    console.error("Error:", error);
  }); */

/* userHandler.create(user); */
