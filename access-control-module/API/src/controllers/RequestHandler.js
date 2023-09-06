const { TokenHandler } = require("./TokenHandler.js");
const { cacheHandler } = require("../cache/cacheHandler.js");
const { UserHandler } = require("./UserHandler.js");
const { User } = require("../models/User.js");
const { UserData } = require("../models/UserData.js");
const { DataBaseHandler } = require("./DataBaseHandler.js");
const { GroupHandler } = require("./GroupHandler.js");
const { Sanitizer } = require("../sanitizer/sanitizer.js");
const { SessionHandler } = require("./SessionHandler.js");

class RequestHandler {
  constructor() {}

  signup(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const requestData = JSON.parse(body);

      const sanitizedData = new Sanitizer();
      sanitizedData.trimData(requestData);

      const isStryng = sanitizedData.validateTypeString(requestData);
      const isEmpty = sanitizedData.isDataEmpty(requestData);

      if (!isEmpty && isStryng) {
        let userData = Object.assign({}, UserData);
        let user = Object.assign({}, User);

        user.userName = requestData.userName;
        user.password = requestData.password;

        userData.name = requestData.name;
        userData.surname = requestData.surname;
        userData.email = requestData.email;
        userData.isActive = 1;

        const dataBaseHandler = new DataBaseHandler();
        const groupH = new GroupHandler(dataBaseHandler);
        const userHandler = new UserHandler(dataBaseHandler, groupH);
        const tokenHAndler = new TokenHandler();

        userHandler.create(user);

        userHandler
          .GetLastUserID()
          .then((lastId) => {
            const idToString = lastId.toString();
            const token = tokenHAndler.create(idToString);
            cacheHandler.setCacheDatabyKey(idToString, token);

            console.log(cacheHandler.getCacheData());
            userHandler.createUserData(lastId, userData);
            res.end(JSON.stringify({ userId: lastId, Token: token }));
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        res.end(JSON.stringify({ message: "error empty data" }));
      }
    });
  }

  login(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const requestData = JSON.parse(body);

      const sanitizedData = new Sanitizer();
      sanitizedData.trimData(requestData);

      const isStryng = sanitizedData.validateTypeString(requestData);
      const isEmpty = sanitizedData.isDataEmpty(requestData);

      if (!isEmpty && isStryng) {
        const userName = requestData.userName;
        const password = requestData.password;

        const dataBaseHandler = new DataBaseHandler();
        const groupH = new GroupHandler(dataBaseHandler);
        const userHandler = new UserHandler(dataBaseHandler, groupH);
        const sessionHandler = new SessionHandler();
        userHandler
          .getIdByUserName(userName)
          .then(async (userId) => {
            try {
              const response = await sessionHandler.startSession(
                userId,
                password
              );

              if (response.success) {
                res.end(
                  JSON.stringify({
                    userId: userId,
                    Token: response.token,
                    message: "User logged in",
                  })
                );
              } else {
                res.end(JSON.stringify({ message: response.error }));
              }
            } catch (error) {
              console.error("Error al iniciar sesión:", error);
            }
          })
          .catch((error) => {
            console.error("Error al obtener el ID del usuario:", error);
          });
      } else {
        res.end(JSON.stringify({ message: "error empty data" }));
      }
    });
  }

  logout(username) {
    // Lógica para cerrar sesión de un usuario
  }

  checkPermissions(username, resource) {
    // Lógica para comprobar los permisos de un usuario para acceder a un recurso
  }

  // Otros métodos relacionados con la autenticación y la autorización
}

module.exports = { RequestHandler };
