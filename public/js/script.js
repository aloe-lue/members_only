const createMessageBtn = document.querySelector("button.toggle_create_message");
const closeDialogCreateMessageBtn =
  document.querySelector("button.close_modal");

const dialogCreateMessage = document.querySelector("dialog.create_message");
closeDialogCreateMessageBtn.addEventListener("click", () => {
  dialogCreateMessage.close();
});

createMessageBtn.addEventListener("click", () => {
  dialogCreateMessage.showModal();
});
