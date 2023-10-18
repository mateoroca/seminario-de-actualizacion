const { TokenHandler } = require("../TokenHandler/TokenHandler.js");
const { cacheHandler } = require("../../cache/cacheHandler.js");
const { Authenticator } = require("../Authenticator/Authenticator.js");

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
        const token = tokenHandler.create();

        cacheHandler.storeUserIdAndToken(userId, token);
        cacheHandler.setAsActive(userId);

        return { success: true, token };
      } else {
        return { success: false, error: "wrong username or password error" };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: "Internal server error" };
    }
  }

  endSession(userId) {
    const tokenHandler = new TokenHandler();
    tokenHandler.deleteToken(userId);
    cacheHandler.setAsInactive(userId);
  }
  validateSession(sessionId) {}
  refreshSession(sessionId) {}
  destroyInactiveSessions() {}
  cleanupExpiredSessions() {}
}

module.exports = { SessionHandler };