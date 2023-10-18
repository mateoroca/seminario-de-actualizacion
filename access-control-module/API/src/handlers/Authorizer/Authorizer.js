class Authorizer {
  constructor(innerAccessHandler, innerGroupHandler, innerUserHandler) {
    this.AccessH = innerAccessHandler;
    this.GroupH = innerGroupHandler;
    this.UserH = innerUserHandler;
  }

  async authorize(userId, accessId) {
    try {
      if (await this.UserH.checkIfUsersExist()) {
        const results = await this.GroupH.getGroupIDByUserID(userId);

        if (await this.GroupH.checkIfGroupsExist()) {
          const groupIDS = results.map(
            ({ group_has_userID }) => group_has_userID
          );

          const groupAccess = await this.AccessH.getGroupAccessByAccessID(
            accessId
          );

          const hasRelation = this.checkRelation(groupIDS, groupAccess);

          if (hasRelation) {
            return true;
          } else {
            return false;
          }
        } else {
          console.log("there not are groups");
        }
      } else {
        console.log("there not are users");
      }
    } catch (error) {
      console.log("Ocurrió un error:", error);
    }
  }
  checkRelation(array1, array2) {
    if (array1.find((value1) => array2.find((value2) => value1 === value2))) {
      return true;
    } else return false;
  }
}

module.exports = {
  Authorizer,
};
