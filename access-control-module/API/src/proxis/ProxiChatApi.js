const { Sanitizer } = require("../sanitizer/sanitizer.js");
const {
  ChatProposalHandler,
} = require("../handlers/ChatApi/ChatProposalHandler/ChatProposalHandler.js");

const {
  ChatMessageHandler,
} = require("../handlers/ChatApi/ChatMessageHandler/ChatMessageHandler.js");

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
      const userTargetId = requestData.userTargetId;

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
}

module.exports = { ProxiChatApi };
