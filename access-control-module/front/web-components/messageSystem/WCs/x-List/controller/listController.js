import { LocalStorageHandler } from "../../../../common/LocalStorageHandler.js";
import { ModalWindowView } from "../../../../modalwindow/x-modalWindow.js";
import { QuestionDialog } from "../../../../questionDialog/x-questionDialog.js";

class ListController extends HTMLElement {
  constructor(innerView, innerModel) {
    super();

    this.view = innerView;
    this.model = innerModel;
    //////////////////////////////////////
    this.localStorageH = new LocalStorageHandler();
    this.usersAttached = [];
    this.UserDivs = [];
    this.chatsProposals = [];
    /////////////////////////////////////////////////////////
    this.modal = new ModalWindowView();
    this.questionDialog = new QuestionDialog();
    ////////////7////////////////////////////////////////

    this.questionDialog.options = {
      titleText: "New Chat Proposal",
      questionText: "Do you want to accept the chat proposal?",
      confirmText: "Confirm",
      cancelText: "Cancel",
    };

    this.modal.content = this.questionDialog;

    ///////////////////////////////////////////////////////////

    this.newRes = false;
    this.eventListener = null;
    this.eventListener2 = null;
  }
  async enable() {
    this.newRes = await this.worker();

    this.workerAndErrorManager(this.newRes);
  }

  disable() {
    this.view.removeEventListener("send", () => {
      this.sendAndSetMessage();
    });
    clearInterval(this.intervalId);
  }
  ///////////////////////////////////////////////////////
  async sendNewChatProposal(data) {
    let response = await this.model.createChateProposal(data);

    console.log(response);
  }
  ///////////////////////////////////////////////////////

  async worker() {
    const userId = this.localStorageH.getOfLocalStorage("userId");

    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;

    const [response, response2, response3, response4] = await Promise.all([
      this.model.getUsers(),
      this.model.getActiveUsers(),
      this.model.getServerChatProposals(userId),
      this.model.getChats(userId),
    ]);

    try {
      if (response && response2 && response3 && response4) {
        let users = response.data;
        let chats = response4.data;
        this.setNewChats(chats);

        for (const item of users) {
          if (item.id == userId) {
            // Omitir el usuario actual si su ID coincide con el ID almacenado en localStorage
            continue;
          }

          if (!this.usersAttached.includes(item.id)) {
            const div = this.view.createUserList(item.user_name, item.id);

            this.UserDivs.push(div);

            const nameDiv = div.querySelector("#nameDiv");
            const userIdValue = div.getAttribute("data-userId");

            const data = {
              userOriginId: userId,
              userTargetID: userIdValue,
              timeStamp: currentTime,
            };

            nameDiv.addEventListener("click", async () => {
              this.sendNewChatProposal(data); // que hago con esto? es de la vista o del controlador?
            });

            this.usersAttached.push(item.id);
          }
        }

        let activeUsersIds = response2.data;

        this.setActivitiStateOfUser(activeUsersIds);

        this.chatsProposals = response3.data;

        this.setNewChatProposal(this.chatsProposals);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  setActivitiStateOfUser(activeUsersIds) {
    this.UserDivs.forEach((div) => {
      const userIdValue = div.getAttribute("data-userid");

      if (activeUsersIds.includes(parseInt(userIdValue))) {
        this.view.setActiveUser(div);
      } else {
        this.view.setInactiveUser(div);
      }
    });
  }

  async setNewChatProposal(chatsProposals) {
    const userId = this.localStorageH.getOfLocalStorage("userId");

    this.UserDivs.forEach((div) => {
      const userIdValue = div.getAttribute("data-userid");

      for (const chatProposal of chatsProposals) {
        if (
          chatProposal.userTargetId == userId &&
          chatProposal.userOriginId == userIdValue
        ) {
          this.view.setNewProposal(div);

          const proposalIcon = div.querySelector("#svg2");
          // que hago con esto? es de la vista o del controlador?
          this.eventListener = (e) => {
            this.acceptOrRejectChatProposal(chatProposal.id, div);
          };

          proposalIcon.addEventListener("click", this.eventListener);
        } else {
          this.view.setNotProposals(div);
        }
      }
    });
  }

  setNewChats(chats) {
    this.UserDivs.forEach((div) => {
      const userIdValue = div.getAttribute("data-userid");

      for (const chat of chats) {
        if (
          chat.userOriginId == userIdValue ||
          chat.userTargetId == userIdValue
        ) {
          const writeIcon = div.querySelector("#svg3");
          // que hago con esto? es de la vista o del controlador?
          this.view.setNewAvaibleChat(div);

          const nameDiv = div.querySelector("#nameDiv");
          const userName = nameDiv.textContent;

          this.eventListener2 = (e) => {
            this.dispatchEvent(
              new CustomEvent("new-chat", {
                detail: { chat, userName },
              })
            );
          };

          writeIcon.addEventListener("click", this.eventListener2);
        } else {
          /* this.view.setNotAvaibleChat(div); */
        }
      }
    });
  }

  async acceptOrRejectChatProposal(proposalId, div) {
    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      await this.model.confirmChatProposal(proposalId);
      await this.model.rejectProposal(proposalId);
      this.view.setNotProposals(div);

      this.modal.close();
    } else {
      //aca se deberia remover el addEventLisener del ChatProposal div
      const res = await this.model.rejectProposal(proposalId);

      const proposalIcon = div.querySelector("#svg2");
      proposalIcon.removeEventListener("click", this.eventListener);

      this.view.setNotProposals(div);

      this.modal.close();
    }
  }

  workerAndErrorManager(res) {
    if (res == true) {
      this.intervalId = setInterval(async () => {
        this.newRes = await this.worker();
        if (this.newRes !== true) {
          this.view.AddServerErrorsComponent(
            "  Ups! hubo un error por favor intente mas tarde"
          );
        } else {
          this.view.removeErrorsComponent();
        }
      }, 15000);
    } else {
      this.view.AddServerErrorsComponent(
        "  Ups! hubo un error por favor intente mas tarde"
      );
    }
  }
}

customElements.define("x-controllerlist", ListController);

export { ListController };
