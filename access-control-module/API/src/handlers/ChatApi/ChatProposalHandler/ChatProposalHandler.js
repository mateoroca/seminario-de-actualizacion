const { v4: uuidv4 } = require("uuid");
const { cacheHandler } = require("../../../cache/cacheHandler.js");
const { ChatHandler } = require("../ChatHandler/chatHandler.js");

class ChatProposalHandler {
  constructor() {
    this.i18nOptions = {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
  }

  newChatProposal(userOriginID, userTargetID) {
    const dateText = new Intl.DateTimeFormat("es-AR", this.i18nOptions).format(
      new Date()
    );
    try {
      let chatProposal = {
        id: uuidv4(),
        userOriginId: userOriginID,
        userTargetId: userTargetID,
        state: {
          pending: true,
          active: false,
          revoked: false,
          finished: false,
        },
        timeStamp: dateText,
      };

      cacheHandler.chatsProposal.push(chatProposal);
      return { state: true, message: "success to create chat Proposal" };
    } catch (error) {
      return { status: false, message: "error to create chat Proposal" };
    }
  }
  confirmChatProposal(chatsProposalId) {
    try {
      const chatHandler = new ChatHandler();

      const chatProposal = cacheHandler.chatsProposal.find(
        (proposal) => proposal.id == chatsProposalId
      );

      if (chatProposal) {
        chatProposal.state.pending = false;
        chatProposal.state.active = true;

        const userOriginId = chatProposal.userOriginId;
        const userTargetId = chatProposal.userTargetId;

        const chat = chatHandler.createChats(userOriginId, userTargetId);

        //reemplaza la propuesta en el array:
        const proposalIndex = cacheHandler.chatsProposal.findIndex(
          (proposal) => proposal.id == chatsProposalId
        );

        if (proposalIndex !== -1) {
          cacheHandler.chatsProposal[proposalIndex] = chatProposal;
        }

        return {
          state: true,
          message: "Success to confirm Chat Proposal",
          data: chat,
        };
      } else {
        return {
          state: false,
          message: "Error: Chat Proposal not found",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  revokeChatProposal(chatsProposalId) {
    try {
      const chatProposal = cacheHandler.chatsProposal.find(
        (proposal) => proposal.id == chatsProposalId
      );
      if (chatProposal) {
        chatProposal.state.pending = false;
        chatProposal.state.revoked = true;
        return {
          state: true,
          message: "Success to revoke Chat Proposal",
        };
      } else {
        return {
          state: false,
          message: "error not chats Proposal funded",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  getChatProposal(userId) {
    try {
      const proposals = cacheHandler.chatsProposal.filter(
        (proposal) =>
          proposal.userOriginId == userId || proposal.userTargetId == userId
      );

      if (proposals) {
        return { state: true, data: proposals };
      } else {
        return { state: false, message: "No chat proposals found" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  getChatProposalId(userId) {
    try {
      const proposals = cacheHandler.chatsProposal.filter(
        (proposal) =>
          proposal.userOriginId == userId || proposal.userTargetId == userId
      );

      if (proposals.length > 0) {
        const Ids = proposals.map((proposal) => proposal.id);
        return { state: true, data: Ids };
      } else {
        return { state: false, message: "No chat proposals found" };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { ChatProposalHandler };
