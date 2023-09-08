const { UserHandler } = require("./UserHandler.js");
const { User } = require("../models/User.js");
const { UserData } = require("../models/UserData.js");
const { DataBaseHandler } = require("./DataBaseHandler.js");
const { GroupHandler } = require("./GroupHandler.js");
const { Sanitizer } = require("../sanitizer/sanitizer.js");
const { SessionHandler } = require("./SessionHandler.js");
const { cacheHandler } = require("../cache/cacheHandler.js");

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

        userHandler.create(user);

        userHandler
          .GetLastUserID()
          .then((lastId) => {
            userHandler.createUserData(lastId, userData);
            res.end(
              JSON.stringify({ state: true, message: "user registered" })
            );
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
                    status: true,
                    userId: userId,
                    Token: response.token,
                    message: "User logged in",
                  })
                );
              } else {
                res.end(
                  JSON.stringify({ status: false, message: response.error })
                );
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

  logout(req, res) {
    const id = req.headers["id"];
    if (id) {
      const sessionHandler = new SessionHandler();
      sessionHandler.endSession(id);
      console.log(cacheHandler.getCacheData());
      res.end(JSON.stringify({ message: "session close" }));
    } else {
      res.end(JSON.stringify({ message: "error user id no valido" }));
    }
  }

  getUserData() {
    const customToken = req.headers["custom-token"];
    const id = req.headers["id"];
    console.log(customToken, id);
    if (customToken && id) {
      res.end(JSON.stringify({ message: "Solicitud procesada correctamente" }));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Faltan encabezados Custom-Token e Id" })
      );
    }
  }
}

module.exports = { RequestHandler };
