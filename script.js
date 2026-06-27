const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList(inputEl.value); // pass the input value
  inputEl.value = "";
});

function toDoList(task) {
  if (!task) return;

  const liEl = document.createElement("li");

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;

  liEl.innerText = task.name || task; // handle both new input and restored task
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  liEl.appendChild(trashBtnEl);

  if (task.checked) {
    liEl.classList.add("checked");
  }

  ulEl.appendChild(liEl);

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  const list = [];
  liEls.forEach(liEl => {
    list.push({
      name: liEl.childNodes[0].nodeValue.trim(), // only text, not icons
      checked: liEl.classList.contains("checked")
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}

let list = JSON.parse(localStorage.getItem("list")) || [];
list.forEach(task => {
  toDoList(task);
});
