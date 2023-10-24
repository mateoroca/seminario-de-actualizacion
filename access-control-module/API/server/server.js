const http = require("http");
const url = require("url");
const { Authorizer } = require("../src/handlers/Authorizer/Authorizer.js");
const {
  Authenticator,
} = require("../src/handlers/Authenticator/Authenticator.js");
const {
  AccessHandler,
} = require("../src/handlers/AccessHandler/AccessHandler.js");
const {
  DataBaseHandler,
} = require("../src/handlers/DatabaseHandler/DataBaseHandler.js");
const {
  GroupHandler,
} = require("../src/handlers/GroupHandler/GroupHandler.js");
const { UserHandler } = require("../src/handlers/UserHandler/UserHandler.js");

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

    if (handler) {
      if (
        pathname == "/sessionHandler/login" ||
        pathname == "/sessionHandler/signup" ||
        pathname == "/sessionHandler/logout" ||
        pathname == "/chatmessagehandler/newchatmessage" ||
        pathname == "/chatmessagehandler/getchatmessages" ||
        pathname == "/userHandler/getusers" ||
        pathname == "/sessionhandler/getactiveusers" ||
        pathname == "/chatproposalhandler/getchatproposal" ||
        pathname == "/chatHandler/getchats" ||
        pathname == "/chatproposalhandler/newchatproposal" ||
        pathname == "/chatproposalhandler/confirmchatproposal" ||
        pathname == "/chatproposalhandler/rejectchatproposal" ||
        pathname == "/chatproposalhandler/deletechatproposal"
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
