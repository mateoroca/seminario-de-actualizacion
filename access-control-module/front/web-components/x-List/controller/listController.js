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
    if (res == false) {
      this.view.AddServerErrorsComponent(
        "Ups! hubo un error por favor intente mas tarde"
      );
    }

    this.intervalId = setInterval(() => {
      this.worker();
    }, 15000);
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

            nameDiv.addEventListener("click", () => {
              this.sendNewChatProposal(data);
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

  setNewChatProposal(chatsProposals) {
    const userId = this.localStorageH.getOfLocalStorage("userId");

    this.UserDivs.forEach((div) => {
      const userIdValue = div.getAttribute("data-userid");

      for (const chatProposal of chatsProposals) {
        if (
          chatProposal.userTargetId == userId &&
          chatProposal.userOriginId == userIdValue
        ) {
          this.view.setNewProposal(div);
          break; // Termina el bucle si se cumple la condición
        } else {
          this.view.setNotProposals(div);
        }
      }
    });
  }
}

customElements.define("x-controllerlist", ListController);

export { ListController };
