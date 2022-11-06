var url = new URL(window.location.href);
var code = url.searchParams.get("code");
fetch("https://cybersoft-crm.herokuapp.com/get-current-user", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    dataType: "json",
    Authorization: "Bearer " + jwtToken,
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if (data.role.id == 3 && data.code != code) {
      window.location.href = "./index.html?message=not-permission";
    }
  })
  .catch(function (error) {
    console.log(error);
  });

fetch("https://cybersoft-crm.herokuapp.com/api/user/getUserById?code=" + code, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $("#profile-avatar-img").attr("src", data.avatar);
    $("#profile-user-name").text(data.fullName);
    $("#profile-email").text(data.email);
  })
  .catch(function (error) {
    console.log(error);
  });

fetch("https://cybersoft-crm.herokuapp.com/api/task/user?id=" + code, {
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

    var unstartTask = [];
    var executingTask = [];
    var completedTask = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i].status.id == 1) {
        unstartTask.push(data[i]);
      } else if (data[i].status.id == 2) {
        executingTask.push(data[i]);
      } else if (data[i].status.id == 3) {
        completedTask.push(data[i]);
      }
    }
    for (var i = 0; i < unstartTask.length; i++) {
      $("#user-unstart-task").append(
        `
                    <div class="mail-contnet">
                      <h5>` +
          unstartTask[i].name +
          `</h5>
                      <span class="mail-desc"></span>
                      <span class="time">Bắt đầu: ` +
          convertStringDateToDDMMYY(
            convertDateObjectToString(unstartTask[i].startDate)
          ) +
          `</span>
                      <span class="time">Kết thúc: ` +
          convertStringDateToDDMMYY(
            convertDateObjectToString(unstartTask[i].endDate)
          ) +
          `</span>
                    </div>`
      );
    }
    for (var i = 0; i < executingTask.length; i++) {
      $("#user-executing-task").append(
        `
                        <div class="mail-contnet">
                        <h5>` +
          executingTask[i].name +
          `</h5>
                        <span class="mail-desc"></span>
                        <span class="time">Bắt đầu: ` +
          convertStringDateToDDMMYY(
            convertDateObjectToString(executingTask[i].startDate)
          ) +
          `</span>
                        <span class="time">Kết thúc: ` +
          convertStringDateToDDMMYY(
            convertDateObjectToString(executingTask[i].endDate)
          ) +
          `</span>
                        </div>`
      );
    }
    for (var i = 0; i < completedTask.length; i++) {
      $("#user-completed-task").append(
        `
                        <div class="mail-contnet">
                        <h5>` +
          completedTask[i].name +
          `</h5>
                        <span class="mail-desc"></span>
                        <span class="time">Bắt đầu: ` +
          convertStringDateToDDMMYY(
            convertDateObjectToString(completedTask[i].startDate)
          ) +
          `</span>
                        <span class="time">Kết thúc: ` +
          convertStringDateToDDMMYY(
            convertDateObjectToString(completedTask[i].endDate)
          ) +
          `</span>
                        </div>`
      );
    }
  })
  .catch(function (error) {
    console.log(error);
  });
