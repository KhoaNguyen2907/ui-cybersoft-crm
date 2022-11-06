var url = new URL(window.location.href);
var id = url.searchParams.get("id");
if (id != null) {
  // change button name
  $("#btn-update").text("Cập nhật");
  $(".page-title").text("Chỉnh sửa dự án");
  //change onclick event atribute
  $("#btn-update").attr("onclick", "updateProject(event)");
  // add input hidden
  $("#submit-form").append(
    "<input type='hidden' name='id' value='" + id + "'>"
  );

  //get project from server and display in form when page is load
  fetch(
    "https://cybersoft-crm.herokuapp.com/api/project/getProjectById?id=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#id").val(data.id);
      $("#name").val(data.name);
      $("#start-date").val(convertDateObjectToString(data.startDate));
      $("#end-date").val(convertDateObjectToString(data.endDate));
      $("#description").val(data.description);
      $("#created-by").val(data.createdBy);
    })
    .catch(function (error) {
      console.log(error);
    });
}

//convert string to date object json

//add project
function addProject(event) {
  var formEl = $("#submit-form");
  if (checkEmpty(formEl) == false) {
    toastr.error("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  var json = toJson(formEl);
  console.log(JSON.stringify(json));
  fetch("https://cybersoft-crm.herokuapp.com/api/project/add", {
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
          window.location.href = "/groupwork.html";
        }, 2000);
      } else {
        toastr.error("Thêm không thành công");
      }
    })
    .catch(function (error) {
      toastr.error("Thêm không thành công");
      console.log(error);
    });
}

//update project
function updateProject(event) {
  //get form data
  var formEl = $("#submit-form");
  if (checkEmpty(formEl) == false) {
    toastr.error("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  var json = toJson(formEl);
  console.log(JSON.stringify(json));
  fetch("https://cybersoft-crm.herokuapp.com/api/project/update", {
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
      console.log(data);
      if (data.isSuccess == true) {
        toastr.success("Cập nhật thành công");
      } else {
        toastr.error("Cập nhật không thành công");
      }
    })
    .catch(function (error) {
      toastr.error("Cập nhật không thành công");
      console.log(error);
    });
}

function toJson(form) {
  var array = $(form).serializeArray();
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
    json["startDate"] = convertStringDateToDDMMYY($("#start-date").val());
    json["endDate"] = convertStringDateToDDMMYY($("#end-date").val());
  });
  return json;
}
