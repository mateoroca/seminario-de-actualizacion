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
          acepted: false,
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

      const proposalIndex = cacheHandler.chatsProposal.findIndex(
        (proposal) => proposal.id == chatsProposalId
      );

      if (proposalIndex !== -1) {
        const chatProposal = cacheHandler.chatsProposal[proposalIndex];
        const userOriginId = chatProposal.userOriginId;
        const userTargetId = chatProposal.userTargetId;

        chatProposal.state.pending = false;
        chatProposal.state.acepted = true;

        const chat = chatHandler.createChats(userOriginId, userTargetId);

        // Actualiza la propuesta en el array
        cacheHandler.chatsProposal[proposalIndex] = chatProposal;

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

  rejectChatProposal(chatsProposalId) {
    try {
      const proposalIndex = cacheHandler.chatsProposal.findIndex(
        (proposal) => proposal.id == chatsProposalId
      );

      if (proposalIndex !== -1) {
        // Elimina la propuesta del array
        cacheHandler.chatsProposal.splice(proposalIndex, 1);
        console.log(cacheHandler.chatsProposal);
        return {
          state: true,
          message: "Success to reject Chat Proposal",
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
  deleteChatProposal(chatsProposalId) {
    try {
      const proposalIndex = cacheHandler.chatsProposal.findIndex(
        (proposal) => proposal.id == chatsProposalId
      );

      if (proposalIndex !== -1) {
        // Elimina la propuesta del array
        cacheHandler.chatsProposal.splice(proposalIndex, 1);
        console.log(cacheHandler.chatsProposal);
        return {
          state: true,
          message: "Success to confirm Chat Proposal",
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
}

module.exports = { ChatProposalHandler };
