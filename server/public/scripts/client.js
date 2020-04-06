$(document).ready(init);

function init() {
  console.log("JQ");

  setupClickListeners();

  getTasks();
  $(".viewTasks").on("click", ".js-btn-ready", taskReady);
}

let listOfTasks = [];
let taskCompleteId = 0;

function setupClickListeners() {
  $("#addButton").on("click", function () {
    console.log("in addButton on click");

    const taskToSend = {
      task: $("#task-input").val(),
      completion: $("#complete-input").val(),
    };
    console.log(taskToSend);

    saveTask(taskToSend);

    $("#task-input").val(""), $("#complete-input").val("");
  });
}

function getTasks() {
  console.log("in getTasks");
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((response) => {
      listOfTasks = response;
      render(listOfTasks);
    })
    .catch((error) => {
      console.log("error in task get", error);
    });
}

function saveTask(taskToSend) {
  console.log("in saveTask", taskToSend);

  $.ajax({
    method: "POST",
    url: "/tasks",
    data: taskToSend,
  })
    .then((response) => {
      console.log(response);
      getTasks();
    })
    .catch((error) => {
      console.log("error in task post", error);
    });
}

function taskReady(event) {
  console.log("in task ready");
  taskCompleteId = event.target.dataset.id;
  console.log("id", taskCompleteId);
  const $taskReady = $(this).parent().parent();
  const taskToComplete = $taskReady.children(".complete-input").text().trim();
  const completionStatus = "Y";

  const taskCompleted = {
    task: taskToComplete,
    completion: completionStatus,
  };
  updateTaskList(taskCompleteId, taskCompleted);
}

function updateTaskList(id, taskData) {
  console.log(taskData);
  $.ajax({
    method: "PUT",
    url: `/tasks/${id}`,
    data: taskData,
  })
    .then((response) => {
      console.log(response);
      getTasks();
    })
    .catch((err) => {
      console.log("Error:", err);
    });
}

function render(listOfTasks) {
  $(".viewTasks").empty();

  for (let tasks of listOfTasks) {
    if (tasks.completionStatus === "Y") {
      $(".viewTasks").append(`
      <tr>
          <td class="task-input">${tasks.task}</td>
          <td class="complete-input">${tasks.complete}</td>
          <td></td>
          <td><button class="js-btn-delete" data-id="${tasks.id}">Delete</button></td>
      </tr>`);
    } else if (tasks.completionStatus === "N") {
      $(".viewTasks").append(`
        <tr>
            <td class="task-input">${tasks.task}</td>
            <td class="complete-input">${tasks.complete}</td>
            <td><button class="js-btn-ready" data-id="${tasks.id}">Task Complete</button></td>
            <td><button class="js-btn-delete" data-id="${tasks.id}">Delete</button></td>
        </tr>`);
    }
  }
}
