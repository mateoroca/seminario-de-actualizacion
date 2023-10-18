const { v4: uuidv4 } = require("uuid");
const { cacheHandler } = require("../../cache/cacheHandler.js");

class TokenHandler {
  constructor() {}

  create() {
    const token = uuidv4();

    return token;
  }

  deleteToken(id) {
    cacheHandler.deleteTokenById(id);
  }
}

module.exports = { TokenHandler };
