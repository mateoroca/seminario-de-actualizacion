const { Server } = require("./server/server");
const { RequestHandler } = require("./src/controllers/RequestHandler.js");
require("dotenv").config();

const app = new Server();
const requestHandler = new RequestHandler();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

app.post("/sessionHandler/login", requestHandler.login);

app.post("/sessionHandler/signup", requestHandler.signup);

app.get("/sessionHandler/logout", requestHandler.logout);

app.get("/groupHandler/getgroupsdata", requestHandler.getGroupsData);

app.get("/userHandler/getuserdata", requestHandler.getUserData);

// Iniciar el servidor en el puerto 3000
app.start(port);
