import { LocalStorageHandler } from "../../common/LocalStorageHandler.js";
import { ModalWindowView } from "../../modalwindow/x-modalWindow.js";
import { QuestionDialog } from "../../questionDialog/x-questionDialog.js";

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
  }
  async enable() {
    const res = await this.worker();

    this.workerAndErrorManager(res);
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

    const [response, response2, response3] = await Promise.all([
      this.model.getUsers(),
      this.model.getActiveUsers(),
      this.model.getServerChatProposals(userId),
    ]);

    try {
      if (response && response2 && response3) {
        let users = response.data;

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
              this.sendNewChatProposal(data);
            });

            this.usersAttached.push(item.id);
          }
        }

        let activeUsersIds = response2.data;

        this.setActivitiStateOfUser(activeUsersIds);

        this.chatsProposals = response3.data;
        console.log(this.chatsProposals);
        this.setNewChatProposal(this.chatsProposals);

        this.askForChatProposalsAcepted(this.chatsProposals);

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

          proposalIcon.addEventListener("click", async () => {
            this.acceptOrRejectChatProposal(chatProposal.id, div);
          });

          break; // Termina el bucle si se cumple la condición
        } else {
          this.view.setNotProposals(div);
        }
      }
    });
  }

  async acceptOrRejectChatProposal(proposalId, div) {
    this.modal.open();
    const response = await this.questionDialog.response;

    if (response == true) {
      const res = await this.model.confirmChatProposal(proposalId);

      if (res.state == true) {
        window.dispatchEvent(new CustomEvent("new-chat", { detail: res.data }));
        console.log(res);
      }

      this.modal.close();
    } else {
      const res = await this.model.rejectProposal(proposalId);
      console.log(res);
      this.view.setNotProposals(div);
      this.modal.close();
    }
  }

  askForChatProposalsAcepted(chatsProposals) {
    const userId = this.localStorageH.getOfLocalStorage("userId");

    chatsProposals.forEach(async (chatProposal) => {
      if (chatProposal.userOriginId == userId) {
        if (chatProposal.state.acepted == true) {
          const data = {
            userOriginId: chatProposal.userOriginId,
            userTargetId: chatProposal.userTargetId,
          };

          const res = await this.model.getChats(data);

          console.log(res.data);

          window.dispatchEvent(
            new CustomEvent("accepted-chatProposal", { detail: res.data })
          );
        }
      }
    });
  }

  workerAndErrorManager(res) {
    if (res == true) {
      this.intervalId = setInterval(async () => {
        const newRes = await this.worker();
        if (newRes !== true) {
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
