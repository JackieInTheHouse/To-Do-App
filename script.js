"use strict";

const form = document.querySelector("form");

const inputText = document.querySelector("input");

const ul = document.querySelector("ul");

const clear = document.querySelector("#clear");

const list = document.querySelector(".list");

const clickAdd = (event) => {
  event.preventDefault();
  if (inputText.value != "") {
    addTask(inputText.value);
  } else {
    alert("Pleae enter a task to add");
    form.task.focus();
    return false;
  }
  inputText.value = "";
};

const addTask = (text) => {
  let li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" /><label>${text}</label>
     <div class="delete">x</div>`;
  ul.appendChild(li);
  // list.style.display = "block";
  addTaskToStorage();
};

const addTaskToStorage = () => {
  localStorage.setItem("task", ul.innerHTML);
};

const getTasks = () => {
  let tasks = localStorage.getItem("task");
  if (tasks) {
    ul.innerHTML = tasks;
  }
};
getTasks();

const deleteOrChecked = (event) => {
  if (event.target.className == "delete") {
    deleteTask(event);
  } else {
    checkedTask(event);
  }
};

const deleteTask = (event) => {
  let li = event.target.parentNode;
  ul.removeChild(li);
  addTaskToStorage();
};

const checkedTask = (event) => {
  let li = event.target;
  if (li.checked) {
    li.nextSibling.style.textDecoration = "line-through";
  }
  addTaskToStorage();
};

const clearTasks = (event) => {
  ul.innerHTML = "";
  localStorage.clear();
};

const eventClick = () => {
  form.addEventListener("submit", clickAdd);
  ul.addEventListener("click", deleteOrChecked);
  clear.addEventListener("click", clearTasks);
};
eventClick();
