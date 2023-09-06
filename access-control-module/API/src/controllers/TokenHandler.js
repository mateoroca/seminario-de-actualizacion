const crypto = require("crypto");
const { cacheHandler } = require("../cache/cacheHandler.js");

class TokenHandler {
  constructor() {}

  create(data) {
    const hash = crypto.createHash("sha256");

    hash.update(data);

    const token = hash.digest("hex");

    return token;
  }

  deleteToken(key) {
    cacheHandler.deleteDataByKey(key);
  }
}

module.exports = { TokenHandler };
