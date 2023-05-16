const { userData } = require("./models/UserData.js");
const { AccesHandler } = require("./controllers/AccessHandler.js");
const { Authorizer } = require("./controllers/Authorizer.js");
const { UserHandler } = require("./controllers/UserHandler.js");

let userHandler = new UserHandler();

userHandler.read(userData);
