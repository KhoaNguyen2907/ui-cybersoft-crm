//get json from servlet using fetch api
fetch("https://cybersoft-crm.herokuapp.com/api/role", {
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
    var table = $("#roleTable").DataTable();
    //clear table before display new data, the last column is the action column
    table.clear().draw();
    $.each(data, function (index, value) {
      table.row
        .add([
          index + 1,
          value.name,
          value.description,
          "<button class='btn btn-primary btn-sm' onclick='editRole(" +
            value.id +
            ")'>Sửa</button> <button class='btn btn-danger btn-sm' onclick='deleteRole(" +
            value.id +
            ")'>Xoá</button>",
        ])
        .draw(false);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

//delete role
function deleteRole(id, event) {
  var result = confirm("Bạn có chắc chắn muốn xóa quyền này không?");
  if (result) {
    fetch("https://cybersoft-crm.herokuapp.com/api/role/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //body is json
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.isSuccess == true) {
          toastr.success("Xoá thành công");
          window.location.reload();
        } else {
          toastr.error("Xoá thất bại");
        }
      })
      .catch(function (error) {
        toastr.error("Xoá thất bại");
        console.log(error);
      });
  }
}

//button edit role redirect to edit role page
function editRole(id) {
  window.location.href = "./role-add.html?id=" + id;
}

//convert form to json
function toJson(form) {
  var array = $(form).serializeArray();
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  return json;
}
