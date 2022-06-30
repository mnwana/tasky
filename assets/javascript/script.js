var formEl = document.querySelector("#task-form");
var taskListEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
  preventDefault();
  var taskItemEl = document.createElement("li");
  taskItemEl.textContent = document.querySelector("#text-name").textContent;
  taskItemEl.className = "task-item";
  taskListEl.appendChild(taskItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
