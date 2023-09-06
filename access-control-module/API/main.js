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

// Ruta sign up
app.post("/UserHandler/login", requestHandler.login);

app.post("/UserHandler/signup", requestHandler.signup);

// Iniciar el servidor en el puerto 3000
app.start(port);
