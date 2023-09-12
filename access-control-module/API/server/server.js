const http = require("http");
const url = require("url");
const { Authorizer } = require("../src/controllers/Authorizer.js");
const { Authenticator } = require("../src/controllers/Authenticator.js");
const { AccessHandler } = require("../src/controllers/AccessHandler.js");
const { DataBaseHandler } = require("../src/controllers/DataBaseHandler.js");
const { GroupHandler } = require("../src/controllers/GroupHandler.js");
const { UserHandler } = require("../src/controllers/UserHandler.js");

class Server {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
    };

    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "content-type, custom-token, id",
      "Content-Type": "application/json",
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  async handleRequest(req, res) {
    const { pathname } = url.parse(req.url, true);
    const method = req.method;
    const Token = req.headers["custom-token"];
    const userId = req.headers["id"];

    if (method === "OPTIONS") {
      res.writeHead(204, this.headers);
      res.end();
      return;
    }

    const handler = this.routes[method][pathname] || this.routes[method]["*"];
    console.log(pathname);
    if (handler) {
      if (
        pathname == "/sessionHandler/login" ||
        pathname == "/sessionHandler/signup" ||
        pathname == "/sessionHandler/logout" ||
        pathname == "/groupHandler/getgroupsdata" ||
        pathname == "/userHandler/getuserdata"
      ) {
        res.writeHead(200, this.headers);
        handler(req, res);
      } else {
        const authorizer = new Authorizer(
          new AccessHandler(new DataBaseHandler()),
          new GroupHandler(new DataBaseHandler()),
          new UserHandler(
            new DataBaseHandler(),
            new GroupHandler(new DataBaseHandler())
          )
        );
        const authenticator = new Authenticator();
        const accessHandler = new AccessHandler(new DataBaseHandler());

        if (authenticator.validateUserIdAndToken(userId, Token)) {
          const accessId = await accessHandler.GetAccessIDByPath(pathname);

          if (await authorizer.authorize(userId, accessId)) {
            res.writeHead(200, this.headers);
            handler(req, res);
          } else {
            res.writeHead(403, this.headers);
            res.end(
              JSON.stringify({
                status: false,
                message: "user don't has the access required",
              })
            );
          }
        }
      }
    } else {
      res.writeHead(404, this.headers);
      handler(req, res);
      console.log(`Solicitud a ${method} ${pathname} no encontrada`);
      res.statusCode = 404;
      res.end("endpoint Not Found");
    }
  }

  start(port) {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

module.exports = { Server };
