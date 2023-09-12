class CacheHandler {
  constructor() {
    this.tokensCache = new Map();
  }

  setCacheDataByKey(key, value) {
    this.tokensCache.set(key, value);
  }

  getCacheDataByKey(key) {
    if (this.tokensCache.has(key)) {
      return this.tokensCache.get(key);
    } else {
      return `key : ${key} not found`;
    }
  }

  getCacheData() {
    if (this.tokensCache) {
      return this.tokensCache;
    } else {
      return "empty cache data";
    }
  }

  deleteDataByKey(key) {
    this.tokensCache.delete(key);
  }

  clearAllCache() {
    this.tokensCache.clear();
  }
}

const cacheHandler = new CacheHandler();

module.exports = { cacheHandler };
