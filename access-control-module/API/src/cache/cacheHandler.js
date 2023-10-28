class CacheHandler {
  constructor() {
    this.tokensCache = new Map();
    this.chats = [];
    this.chatsProposal = [];
    this.chatsMessages = new Map();
    this.activeUsers = [];
  }

  storeUserIdAndToken(key, value) {
    this.tokensCache.set(key, value);
  }

  getTokensById(key) {
    if (this.tokensCache.has(key)) {
      return this.tokensCache.get(key);
    } else {
      return `key : ${key} not found`;
    }
  }

  getTokens() {
    if (this.tokensCache) {
      return this.tokensCache;
    } else {
      return "empty cache data";
    }
  }

  deleteTokenById(id) {
    this.tokensCache.delete(id);
  }

  clearAllCache() {
    this.tokensCache.clear();
  }
  getChatsProposals() {
    return this.chatsProposal;
  }
  setAsActive(userId) {
    this.activeUsers.push(userId);
  }
  setAsInactive(userId) {
    const userIndex = this.activeUsers.findIndex((userID) => userID == userId);

    if (userIndex !== -1) {
      this.activeUsers.splice(userIndex, 1);
    } else {
      console.log("not users founded");
    }
  }

  setNewChat(chat) {
    this.chats.push(chat);
  }

  getActiveUsers() {
    return this.activeUsers;
  }
  getChats() {
    return this.chats;
  }
}

const cacheHandler = new CacheHandler();

module.exports = { cacheHandler };
