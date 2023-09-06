const { TokenHandler } = require("./TokenHandler");
const { cacheHandler } = require("../cache/cacheHandler.js");
const { Authenticator } = require("./Authenticator.js");

class SessionHandler {
  constructor() {}

  async startSession(userId, password) {
    try {
      const authenticator = new Authenticator();

      const isAuthenticated = await authenticator.authenticateUser(
        userId,
        password
      );

      if (isAuthenticated) {
        const tokenHandler = new TokenHandler();
        const token = tokenHandler.create(toString(userId));
        cacheHandler.setCacheDataByKey(userId, token);
        return { success: true, token };
      } else {
        return { success: false, error: "Wrong password error" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: "Internal server error" };
    }
  }

  endSession(sessionId) {}
  validateSession(sessionId) {}
  refreshSession(sessionId) {}
  destroyInactiveSessions() {}
  cleanupExpiredSessions() {}
}

module.exports = { SessionHandler };
