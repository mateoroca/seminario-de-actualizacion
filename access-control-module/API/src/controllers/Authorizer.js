class Authorizer {
  constructor(innerAccessHandler, innerGroupHandler, innerUserHandler) {
    this.AccessH = innerAccessHandler;
    this.GroupH = innerGroupHandler;
    this.UserH = innerUserHandler;
  }

  async authorize(userId, accessId) {
    try {
      if (await this.UserH.checkIfUsersExist()) {
        console.log(`id del usuario ${userId}`);

        const results = await this.GroupH.getGroupIDByUserID(userId);

        if (await this.GroupH.checkIfGroupsExist()) {
          const groupIDS = results.map(
            ({ group_has_userID }) => group_has_userID
          );

          console.log(
            `los grupos a los que pertenese el user son : ${groupIDS}`
          );

          const groupAccess = await this.AccessH.getGroupAccessByAccessID(
            accessId
          );

          console.log(
            `los grupos que tienen tal accesso son el :${groupAccess}`
          );

          const hasRelation = this.checkRelation(groupIDS, groupAccess);

          if (hasRelation) {
            console.log("the user has the required access");
            return true;
          } else {
            console.log("the user doesn't have the required access");
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
    for (const value1 of array1) {
      for (const value2 of array2) {
        if (value1 === value2) {
          return true;
        }
      }
    }
    return false;
  }
}

module.exports = {
  Authorizer,
};
