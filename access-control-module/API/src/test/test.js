const { AccessHandler } = require("../controllers/AccessHandler.js");
const { Authorizer } = require("../controllers/Authorizer.js");
const { UserHandler } = require("../controllers/UserHandler.js");
const { User } = require("../models/User.js");
const { UserData } = require("../models/UserData.js");
const { DataBaseHandler } = require("../controllers/DataBaseHandler.js");
const { GroupHandler } = require("../controllers/GroupHandler.js");
const { Access } = require("../models/access.js");

const http = require("http");
require("dotenv").config({ path: "../.env" });

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end();
});

const port = 3030;

server.listen(port, () => {
  console.log(`Server is lisening on port: ${port}`);
});

let dataBaseHandler = new DataBaseHandler();
let groupH = new GroupHandler(dataBaseHandler);
let userHandler = new UserHandler(dataBaseHandler, groupH);

let accessHandler = new AccessHandler(dataBaseHandler);
let authorizer = new Authorizer(accessHandler, groupH, userHandler);

let user = Object.assign({}, User);
let access = Object.assign({}, Access);

access.name = "readData";
access.description = "access to read data";
access.path = "userHandler/read";

/* console.log(userHandler.GetLastUserID()); */

/* authorizer.authorize(27, 14); */

/* groupH.getGroupIDByUserID(25).then((res) => {
  res.forEach((element) => {
    console.log(element.group_has_userID);
  });
}); */

/* groupH.addUserToGroup(27, 16); */

/* accessHandler.getAccessByGroupID(13).then((element) => {
  console.log(element);
  console.log(accessHandler.acceessByGroupID.length);
}); */

/* accessHandler.remove(10); */

/* accessHandler.create(16, access); */

/* userHandler.checkIfUsersExist().then((state) => {
  console.log(state);
});
 */
/* groupH.checkIfGroupsExist().then((state) => {
  console.log(state);
}); */

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

/* groupH.create("preseptor"); */
/* groupH.remove(12); */

/* user.userName = "teico";
user.password = "123456"; */

/* let userData = Object.assign({}, UserData);

userData.name = "nicol";
userData.surname = "hernandez";
userData.dni = "23456543";
userData.email = "niky@gmail.com";
userData.gender = "female";
userData.phoneNumber = "2235959844";
userData.userMembership = "director";
userData.isActive = 1; */

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
