const { DataBaseHandler } = require("../DatabaseHandler/DataBaseHandler.js");
const { GroupHandler } = require("../GroupHandler/GroupHandler.js");
const { UserHandler } = require("../UserHandler/UserHandler.js");
const { Encryptor } = require("../Encryptor/Encryptor.js");
const { cacheHandler } = require("../../cache/cacheHandler.js");

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

  validateUserIdAndToken(claveBuscada, valorBuscado) {
    let found;
    for (let [key, value] of cacheHandler.tokensCache.entries()) {
      if (key == claveBuscada && value == valorBuscado) {
        found = true;
        break;
      }
    }

    if (found) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = { Authenticator };
