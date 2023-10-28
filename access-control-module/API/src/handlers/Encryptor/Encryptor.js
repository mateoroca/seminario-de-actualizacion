const crypto = require("crypto");

class Encryptor {
  constructor() {}

  encrypt(data) {
    const hash1 = crypto.createHash("sha256");

    hash1.update(data);

    const hash = hash1.digest("hex");

    return hash;
  }

  generateSecretKey() {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
  }
}

module.exports = { Encryptor };
