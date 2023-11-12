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

        return { status: true, token };
      } else {
        return { status: false, message: "wrong username or password error" };
      }
    } catch (error) {
      console.error(error);
      return { status: false, error: "Internal server error" };
    }
  }

  endSession(userId) {
    const tokenHandler = new TokenHandler();
    tokenHandler.deleteToken(userId);
    cacheHandler.setAsInactive(userId);
  }
  getActiveUsers() {
    return cacheHandler.getActiveUsers();
  }
  validateSession(sessionId) {}
  refreshSession(sessionId) {}
  destroyInactiveSessions() {}
  cleanupExpiredSessions() {}
}

module.exports = { SessionHandler };
