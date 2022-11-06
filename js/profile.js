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
    if (data == null) {
      window.location.href = "login.html";
    } else {
      currentUser = {
        email: data.email,
        fullName: data.fullName,
        code: data.code,
        roleId: data.role.id,
        avatar: data.avatar,
      };
      console.log(currentUser);
      //display current user info
      $(".current-user-name").text(currentUser.fullName);
      $("#profile-avatar-img").attr("src", currentUser.avatar);
      $("#profile-user-name").text(currentUser.fullName);
      $("#profile-email").text(currentUser.email);
      fetch(
        "https://cybersoft-crm.herokuapp.com/api/task/user?id=" +
          currentUser.code,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          $("tbody").empty();
          for (var i = 0; i < data.length; i++) {
            $("tbody").append(
              "<tr>" +
                "<td>" +
                Number(i + 1) +
                "</td>" +
                "<td>" +
                data[i].name +
                "</td>" +
                "<td>" +
                data[i].project.name +
                "</td>" +
                "<td>" +
                convertStringDateToDDMMYY(
                  convertDateObjectToString(data[i].startDate)
                ) +
                "</td>" +
                "<td>" +
                convertStringDateToDDMMYY(
                  convertDateObjectToString(data[i].endDate)
                ) +
                "</td>" +
                "<td>" +
                data[i].status.name +
                "</td>" +
                "<td> <button type ='button' class='btn btn-primary' onclick='showTaskDetail(" +
                data[i].id +
                ")'>Cập nhật tiến độ</button>" +
                "</td>" +
                "</tr>"
            );
          }
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
          $("#unstart-task").text(
            Math.round((unstartTask / totalTask) * 100) + "%"
          );
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
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  })
  .catch(function (error) {
    console.log(error);
  });

function showTaskDetail(id) {
  window.location.href = "task-add.html?id=" + id;
}
