const http = require("http");
const url = require("url");

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

  handleRequest(req, res) {
    const { pathname } = url.parse(req.url, true);
    const method = req.method;
    const customToken = req.headers["custom-token"];

    if (method === "OPTIONS") {
      res.writeHead(204, this.headers);
      res.end();
      return;
    }

    const handler = this.routes[method][pathname] || this.routes[method]["*"];

    if (handler) {
      res.writeHead(200, this.headers);
      handler(req, res);
    } else {
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
