class Authorizer {
  authorize(userId, resourceId) {
    return true;
  }
}

module.exports = {
  Authorizer,
};
