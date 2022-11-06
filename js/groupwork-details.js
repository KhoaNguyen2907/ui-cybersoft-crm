var url = new URL(window.location.href);
var id = url.searchParams.get("id");

//get all task by project id
fetch("https://cybersoft-crm.herokuapp.com/api/task/project?id=" + id, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // calculate uncomplete task, executing task and completed task
    var totalTask = data.length;
    var unstartTask = 0;
    var executingTask = 0;
    var completedTask = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].status.id == 1) {
        unstartTask++;
      } else if (data[i].status.id == 2) {
        executingTask++;
      } else if (data[i].status.id == 3) {
        completedTask++;
      }
    }
    $("#unstart-task").text(Math.round((unstartTask / totalTask) * 100) + "%");
    $("#executing-task").text(
      Math.round((executingTask / totalTask) * 100) + "%"
    );
    $("#completed-task").text(
      Math.round((completedTask / totalTask) * 100) + "%"
    );
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
    //clear all-task
    $("#all-task").empty();

    // if have same user id, add task element to user element
    var user = [];

    user.push(data[0].user);
    for (var i = 1; i < data.length; i++) {
      for (var j = 0; j < user.length; j++) {
        if (user[j].code == data[i].user.code) {
          break;
        }
        user.push(data[i].user);
      }
    }
    console.log("list user");
    console.log(user);

    for (var i = 0; i < user.length; i++) {
      let taskOfUser = [];
      for (var j = 0; j < data.length; j++) {
        if (user[i].code == data[j].user.code) {
          taskOfUser.push(data[j]);
        }
      }
      console.log("task of " + i + ": ");
      console.log(taskOfUser);
      //if task status is unstart, add to unstart column
      var unstartTask = [];
      var executingTask = [];
      var completedTask = [];
      for (var j = 0; j < taskOfUser.length; j++) {
        if (taskOfUser[j].status.id == 1) {
          unstartTask.push(taskOfUser[j]);
        } else if (taskOfUser[j].status.id == 2) {
          executingTask.push(taskOfUser[j]);
        } else if (taskOfUser[j].status.id == 3) {
          completedTask.push(taskOfUser[j]);
        }
      }
      var userTaskElement =
        `<div id="user-task" class="row">
        <div class="col-xs-12">
          <a href="user-details.html?code=` +
        user[i].code +
        `"  class="group-title">
            <img
              width="30"
              src="` +
        user[i].avatar +
        `"
              class="img-circle"
            />
            <span>` +
        user[i].fullName +
        `</span>
          </a>
        </div>
        <div class="col-md-4">
          <div class="white-box">
            <h3 class="box-title">Chưa thực hiện</h3>
            <div id="user-unstart-task-` +
        i +
        `" class="message-center">
              <a href="#">
                <div  class="mail-contnet">
                  <h5>Pavan kumar</h5>
                  <span class="mail-desc">Just see the my admin!</span>
                  <span class="time">9:30 AM</span>
                </div>
              </a>
             
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="white-box">
            <h3 class="box-title">Đang thực hiện</h3>
            <div id="user-executing-task-` +
        i +
        `" class="message-center">
              <a href="#">
                <div class="mail-contnet">
                  <h5>Pavan kumar</h5>
                  <span class="mail-desc">Just see the my admin!</span>
                  <span class="time">9:30 AM</span>
                </div>
              </a>
              
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="white-box">
            <h3 class="box-title">Đã hoàn thành</h3>
            <div id ="user-completed-task-` +
        i +
        `" class="message-center">
              <a href="#">
                <div class="mail-contnet">
                  <h5>Pavan kumar</h5>
                  <span class="mail-desc">Just see the my admin!</span>
                </div>
              </a>
             
            </div>
          </div>
        </div>
      </div>`;
      $("#all-task").append(userTaskElement);

      $("#user-unstart-task-" + i).empty();
      $("#user-executing-task-" + i).empty();
      $("#user-completed-task-" + i).empty();

      //for each unstart task, add to unstart column
      for (var j = 0; j < unstartTask.length; j++) {
        var unstartTaskElement =
          `<a href="#" class="mail-contnet">
          <h5>` +
          unstartTask[j].name +
          `</h5>
          <span class="mail-desc">` +
          unstartTask[j].description +
          `</span>
        </a>`;
        $("#user-unstart-task-" + i).append(unstartTaskElement);
      }
      //for each executing task, add to executing column
      for (var j = 0; j < executingTask.length; j++) {
        var executingTaskElement =
          `<a href="#" class="mail-contnet">
          <h5>` +
          executingTask[j].name +
          `</h5>
          <span class="mail-desc">` +
          executingTask[j].description +
          `</span>
        </a>`;
        $("#user-executing-task-" + i).append(executingTaskElement);
      }
      //for each completed task, add to completed column

      for (var j = 0; j < completedTask.length; j++) {
        var completedTaskElement =
          `<a href="#" class="mail-contnet">
          <h5>` +
          completedTask[j].name +
          `</h5>
          <span class="mail-desc">` +
          completedTask[j].description +
          `</span>
        </a>`;
        $("#user-completed-task-" + i).append(completedTaskElement);
      }
    }
  });
