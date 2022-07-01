var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskInProgress = document.querySelector("#tasks-in-progress");
var tasksCompleted = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name'").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  var isEdit = formEl.hasAttribute("data-task-id");
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
  
    createTaskEl(taskDataObj);
  }
};

 var completeEditTask = function(taskName, taskType, taskId){
  var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
  taskSelected.querySelector("h3.task-name").textContent=taskName;
  taskSelected.querySelector("span.task-type").textContent=taskType;
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
 } 
var createTaskEl = function (taskDataObj) {
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add list item to list
  tasksToDoEl.appendChild(listItemEl);
  taskIdCounter++;
};

var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);

  return actionContainerEl;
};

var deleteTask = function (taskId) {
  var confirmDelete = window.confirm("You clicked delete, are you sure?");
  if (confirmDelete) {
    var taskSelected = document.querySelector(
      ".task-item[data-task-id='" + taskId + "']"
    );
    taskSelected.remove();
  }
};

var editTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']");
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  formEl.setAttribute("data-task-id",taskId);
  document.querySelector("input[name='task-name']").value=taskName;
  document.querySelector("select[name='task-type']").value=taskType;
  document.querySelector("#save-task").textContent = "Save Task";
};

var taskButtonHandler = function (event) {
  if (event.target.matches(".delete-btn")) {
    deleteTask(event.target.getAttribute("data-task-id"));
  } else if (event.target.matches(".edit-btn")) {
    editTask(event.target.getAttribute("data-task-id"));
  }
};

var taskStatusChangeHandler = function(event){
    taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    if (statusValue ==="to do"){
      tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue==="in progress"){
      taskInProgress.appendChild(taskSelected);
    }
    else if (statusValue==="completed"){
      tasksCompleted.appendChild(taskSelected);
    };
};

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change",taskStatusChangeHandler);

