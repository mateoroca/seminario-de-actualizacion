const { DataBaseHandler } = require("./DataBaseHandler.js");
const { GroupHandler } = require("./GroupHandler.js");
const { UserHandler } = require("./UserHandler.js");
const { Encryptor } = require("./Encryptor.js");

class Authenticator {
  contructor() {}
  async authenticateUser(id, password) {
    const dataBaseHandler = new DataBaseHandler();
    const groupH = new GroupHandler(dataBaseHandler);
    const userHandler = new UserHandler(dataBaseHandler, groupH);
    const encryptor = new Encryptor();

    const userInfo = await userHandler.GetUserInformation(id);
    const encryptedPassw = encryptor.encrypt(password);

    if (encryptedPassw == userInfo.password) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = { Authenticator };
