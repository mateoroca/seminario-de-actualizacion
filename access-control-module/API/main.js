const { Server } = require("./server/server");
const { ProxiSessionHandler } = require("./src/proxis/ProxiSessionHandler.js");
const { ProxiGroupHandler } = require("./src/proxis/ProxiGroupHandler.js");
const { ProxiUserHandler } = require("./src/proxis/ProxiUserHandler.js");
const { ProxiChatApi } = require("./src/proxis/ProxiChatApi.js");

require("dotenv").config();

//////////////////////////////////////////////////////////////////////////////////

const app = new Server();
const proxiSessionHandler = new ProxiSessionHandler();
const proxiGroupHandler = new ProxiGroupHandler();
const proxiUserHandler = new ProxiUserHandler();
const proxiChatApi = new ProxiChatApi();
///////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

/*--------------- funciones al iniciar servidor --------*/

/* --------------------------------------------------- */

app.post("/sessionHandler/login", proxiSessionHandler.login);

app.post("/sessionHandler/signup", proxiSessionHandler.signup);

app.get("/sessionHandler/logout", proxiSessionHandler.logout);

app.get("/groupHandler/getgroupsdata", proxiGroupHandler.getGroupsData);

app.get("/userHandler/getusers", proxiUserHandler.getUsers);

app.post("/groupHandler/addusertogroup", proxiGroupHandler.addUserToGroup);

app.post("/chatmessagehandler/newchatmessage", proxiChatApi.newChatMessage);

app.post("/chatmessagehandler/getchatmessages", proxiChatApi.getChatMessages);

app.get("/sessionhandler/getactiveusers", proxiSessionHandler.getActiveUsers);

app.post("/chatproposalhandler/getchatproposal", proxiChatApi.getChatProposal);

app.post("/chatHandler/getchats", proxiChatApi.getChats);

app.post("/chatproposalhandler/newchatproposal", proxiChatApi.newChatProposal);

app.post(
  "/chatproposalhandler/confirmchatproposal",
  proxiChatApi.confirmChatProposal
);

app.post(
  "/chatproposalhandler/rejectchatproposal",
  proxiChatApi.rejectChatProposal
);

// Iniciar el servidor en el puerto 3000
app.start(port);

/* test */

/*  */
