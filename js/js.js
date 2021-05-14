const TASK = document.querySelector("#task");
const taskSendDOM = document.querySelectorAll("#liveToastBtn");
const ulList = document.querySelector("#list");
let addLi = document.createElement("li");

let toDoList = [];

function newElement(event) {
  const toastError = document.querySelector(".error");
  const toastSuccess = document.querySelector(".success");
  let value = TASK.value.trim();
  if (value === "") {
    toastError.classList.remove("hide");
    toastError.classList.add("show");
    setTimeout(() => {
      toastError.classList.remove("show");
      toastError.classList.add("hide");
    }, 5000);
  } else {
    toastSuccess.classList.remove("hide");
    toastSuccess.classList.add("show");
    setTimeout(() => {
      toastSuccess.classList.remove("show");
      toastSuccess.classList.add("hide");
    }, 5000);
  }
  toDoList.push(value);
  TASK.value = "";
  addItem();
  
}

let addItem = () => {
  localStorage.setItem("content", toDoList);
  setTimeout("window.location.reload()",1000);
};

function getItem() {
  let result = localStorage.getItem("content");
  let arr = result.split(",");
  toDoList = arr;
  let i = 0;
  let html = "";
  if (result.length > 0) {
    for (i; i < arr.length; i++) {
      html += `<li><span>${arr[i]}</span><span class="close">×</span></li>`;
    }
    ulList.innerHTML = html;
  }
}

ulList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
  }
  if (event.target.classList == "close") {
    deleteItem(event.target);
  }
});

const deleteItem = (element) => {
  let value = element.previousSibling.innerHTML;
  let valueIndex = toDoList.indexOf(value);
  toDoList.splice(valueIndex, 1);
  addItem(toDoList);
  getItem();
  clearLocal();
};
const clearLocal = () => {
  let check = localStorage.getItem("content");
  if (check.length <= 0) {
    localStorage.clear();
  }
};
getItem();
