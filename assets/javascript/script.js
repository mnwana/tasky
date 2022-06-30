var saveTaskEl = document.querySelector("#save-task");
var taskListEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
  var taskItemEl = document.createElement("li");
  taskItemEl.textContent = window.prompt("Enter a task:");
  taskItemEl.className = "task-item";
  taskListEl.appendChild(taskItemEl);
};

saveTaskEl.addEventListener("click", createTaskHandler);
