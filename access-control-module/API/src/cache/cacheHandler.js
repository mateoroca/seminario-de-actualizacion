class CacheHandler {
  constructor() {
    this.tokensCache = new Map();
  }

  setCacheDataByKey(key, value) {
    this.tokensCache.set(key, value);
  }

  getCacheDataByKey(key) {
    if (key) {
      return this.tokensCache.get(key);
    } else {
      console.log(`key : ${key} not found`);
    }
  }

  getCacheData() {
    return this.tokensCache;
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
