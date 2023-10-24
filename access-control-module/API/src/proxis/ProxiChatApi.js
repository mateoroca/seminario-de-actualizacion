const { Sanitizer } = require("../sanitizer/sanitizer.js");
const {
  ChatProposalHandler,
} = require("../handlers/ChatApi/ChatProposalHandler/ChatProposalHandler.js");

const {
  ChatMessageHandler,
} = require("../handlers/ChatApi/ChatMessageHandler/ChatMessageHandler.js");

const {
  ChatHandler,
} = require("../handlers/ChatApi/ChatHandler/chatHandler.js");

const {
  DataBaseHandler,
} = require("../handlers/DatabaseHandler/DataBaseHandler.js");
const { GroupHandler } = require("../handlers/GroupHandler/GroupHandler.js");
const { UserHandler } = require("../handlers/UserHandler/UserHandler.js");
const { cacheHandler } = require("../cache/cacheHandler.js");

//////////////////////////////////////////////////////////////////////////////////

class ProxiChatApi {
  constructor() {}

  newChatMessage(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const chatMessageHandler = new ChatMessageHandler();

      const chatId = requestData.chatId;
      const userOriginID = requestData.userOriginId;
      const userTargetID = requestData.userTargetId;
      const MessageBody = requestData.MessageBody;
      const TimesStampSended = requestData.timesStampSended;
      /* const State = requestData.state; */

      const response = chatMessageHandler.newChatMessage(
        chatId,
        userOriginID,
        userTargetID,
        MessageBody,
        TimesStampSended
      );

      if (response.status == true) {
        res.end(
          JSON.stringify({
            status: true,
            message: `success to send "${MessageBody}" to userId : ${userTargetID}`,
          })
        );
      } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: false,
            message: `Error to save message`,
          })
        );
      }
    });
  }
  ///////////////////////////////////////////////////////
  async getChatMessages(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const chatId = requestData.chatId;

      try {
        const chatMessageHandler = new ChatMessageHandler();
        let messages = await chatMessageHandler.getChatMessages(chatId);

        res.end(JSON.stringify({ status: true, arrayOfMessages: messages }));
      } catch (error) {
        console.error("Error en getUsers:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  }
  async getChatProposal(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const userId = requestData;

      try {
        const chatProposalHandler = new ChatProposalHandler();
        let response = await chatProposalHandler.getChatProposal(userId);

        res.end(JSON.stringify(response));
      } catch (error) {
        console.error("Error en getUsers:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  }

  createChats() {
    try {
      const userHandler = new UserHandler(
        new DataBaseHandler(),
        new GroupHandler(new DataBaseHandler())
      );
      const chatHandler = new ChatHandler(userHandler);
      chatHandler.createChats();
    } catch (error) {
      console.log(error);
    }
  }

  getChats(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const userOriginId = requestData.userOriginId;
      const userTargetId = requestData.userTargetId;

      try {
        const chatHandler = new ChatHandler();
        const response = chatHandler.getChats(userOriginId, userTargetId);

        res.end(JSON.stringify(response));
      } catch (error) {
        console.error("Error en getUsers:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  }

  newChatProposal(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const userOriginId = requestData.userOriginId;
      const userTargerId = requestData.userTargetID;

      try {
        const chatProposalHandler = new ChatProposalHandler();
        let response = await chatProposalHandler.newChatProposal(
          userOriginId,
          userTargerId
        );

        res.end(JSON.stringify(response));
      } catch (error) {
        console.error("Error en getUsers:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  }

  confirmChatProposal(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const chatProposalId = requestData;

      try {
        const chatProposalHandler = new ChatProposalHandler();
        let response = await chatProposalHandler.confirmChatProposal(
          chatProposalId
        );

        res.end(JSON.stringify(response));
      } catch (error) {
        console.error("Error en getUsers:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  }

  rejectChatProposal(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const chatProposalId = requestData;

      try {
        const chatProposalHandler = new ChatProposalHandler();
        let response = await chatProposalHandler.rejectChatProposal(
          chatProposalId
        );

        res.end(JSON.stringify(response));
      } catch (error) {
        console.error("Error en getUsers:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  }
  deleteChatProposal(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const chatProposalId = requestData;

      try {
        const chatProposalHandler = new ChatProposalHandler();
        let response = await chatProposalHandler.deleteChatProposal(
          chatProposalId
        );

        res.end(JSON.stringify(response));
      } catch (error) {
        console.error("Error en getUsers:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Internal Server Error" }));
      }
    });
  }
}

module.exports = { ProxiChatApi };
