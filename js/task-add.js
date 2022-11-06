//get project list from server and display in select element
fetch("https://cybersoft-crm.herokuapp.com/api/project", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $("#project").empty();
    $.each(data, function (index, value) {
      //clear select element before display new data
      $("#project").append(
        "<option value='" + value.id + "'>" + value.name + "</option>"
      );
    });
  })
  .catch(function (error) {
    console.log(error);
  });
//get user list
fetch("https://cybersoft-crm.herokuapp.com/api/user", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $("#in-charge").empty();
    $.each(data, function (index, value) {
      //clear select element before display new data
      $("#in-charge").append(
        "<option value='" + value.code + "'>" + value.fullName + "</option>"
      );
    });
  })
  .catch(function (error) {
    console.log(error);
  });
//get status list and display to select el
fetch("https://cybersoft-crm.herokuapp.com/api/status", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $("#status").empty();
    $.each(data, function (index, value) {
      //clear select element before display new data
      $("#status").append(
        "<option value='" + value.id + "'>" + value.name + "</option>"
      );
    });
  })
  .catch(function (error) {
    console.log(error);
  });

var url = new URL(window.location.href);
var id = url.searchParams.get("id");
if (id != null) {
  // change button name
  $("#btn-update").text("Cập nhật");
  $(".page-title").text("Chỉnh sửa công việc");
  //change onclick event atribute
  $("#btn-update").attr("onclick", "updateTask(event)");
  // add input hidden
  $("#submit-form").append(
    "<input type='hidden' id='id' name='id' value='" + id + "'>"
  );

  //get task from server and display in form when page is load
  fetch("https://cybersoft-crm.herokuapp.com/api/task/getTaskById?id=" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#project").val(data.project.id);
      $("#name").val(data.name);
      $("#description").val(data.description);
      $("#in-charge").val(data.user.code);
      $("#start-date").val(convertDateObjectToString(data.startDate));
      $("#end-date").val(convertDateObjectToString(data.endDate));
      $("#status").val(data.status.id);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//add task
function addTask(event) {
  var formEl = $("#submit-form");
  //if any input is empty, alert and retype
  if (checkEmpty(formEl) == false) {
    toastr.error("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  var json = toJson(formEl);
  console.log(JSON.stringify(json));
  fetch("https://cybersoft-crm.herokuapp.com/api/task/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //body is json from form data
    body: JSON.stringify(json),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.isSuccess == true) {
        toastr.success("Thêm thành công");
        setTimeout(function () {
          window.location.href = "./task.html";
        }, 2000);
      } else {
        //toastr fail
        toastr.error("Cập nhật thất bại");
      }
    })
    .catch(function (error) {
      console.log(error);
      toastr.error("Cập nhật thất bại");
    });
}

//update task
function updateTask(event) {
  //get form data
  var formEl = $("#submit-form");
  if (checkEmpty(formEl) == false) {
    toastr.error("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  var json = toJson(formEl);
  console.log(JSON.stringify(json));
  fetch("https://cybersoft-crm.herokuapp.com/api/task/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //body is json from form data
    body: JSON.stringify(toJson(formEl)),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.isSuccess == true) {
        toastr.success("Cập nhật thành công");
      } else {
        toastr.error("Cập nhật thất bại");
      }
    })
    .catch(function (error) {
      toastr.error("Cập nhật thất bại");
      console.log(error);
    });
}

function toJson(form) {
  var json = {};
  json["id"] = $("#id").val();
  json["description"] = $("#description").val();
  json["name"] = $("#name").val();
  json["user"] = { code: $("#in-charge").val() };
  json["project"] = { id: $("#project").val() };
  json["status"] = { id: $("#status").val() };
  json["startDate"] = convertStringDateToDDMMYY($("#start-date").val());
  json["endDate"] = convertStringDateToDDMMYY($("#end-date").val());

  return json;
}
