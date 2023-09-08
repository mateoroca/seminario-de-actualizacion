const { v4: uuidv4 } = require("uuid");
const { cacheHandler } = require("../cache/cacheHandler.js");

class TokenHandler {
  constructor() {}

  create() {
    const token = uuidv4();

    return token;
  }

  deleteToken(key) {
    cacheHandler.deleteDataByKey(key);
  }
}

module.exports = { TokenHandler };
