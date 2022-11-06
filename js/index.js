var url = new URL(window.location.href);
var message = url.searchParams.get("message");
if (message == "not-permission") {
  toastr.error("Không có quyền truy cập");
}

fetch("https://cybersoft-crm.herokuapp.com/api/task", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var unstartTask = 0;
    var executingTask = 0;
    var completedTask = 0;
    var totalTask = data.length;
    for (var i = 0; i < data.length; i++) {
      if (data[i].status.id == 1) {
        unstartTask++;
      } else if (data[i].status.id == 2) {
        executingTask++;
      } else if (data[i].status.id == 3) {
        completedTask++;
      }
    }
    $("#unstart-task").text(unstartTask);
    $("#executing-task").text(executingTask);
    $("#completed-task").text(completedTask);
    $("#unstart-progress").attr(
      "style",
      "width:" + (unstartTask / totalTask) * 100 + "%"
    );
    $("#executing-progress").attr(
      "style",
      "width:" + (executingTask / totalTask) * 100 + "%"
    );
    $("#completed-progress").attr(
      "style",
      "width:" + (completedTask / totalTask) * 100 + "%"
    );
  })
  .catch(function (error) {
    console.log(error);
  });
