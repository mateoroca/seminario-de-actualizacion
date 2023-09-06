const { DataBaseHandler } = require("./DataBaseHandler.js");
const { GroupHandler } = require("./GroupHandler.js");
const { UserHandler } = require("./UserHandler.js");
const { TokenHandler } = require("./TokenHandler.js");

class Authenticator {
  contructor() {}
  async authenticateUser(id, password) {
    const dataBaseHandler = new DataBaseHandler();
    const groupH = new GroupHandler(dataBaseHandler);
    const userHandler = new UserHandler(dataBaseHandler, groupH);
    const tokenHandler = new TokenHandler();

    const userInfo = await userHandler.GetUserInformation(id);
    const encryptedPassw = tokenHandler.create(password);

    if (encryptedPassw == userInfo.password) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = { Authenticator };
