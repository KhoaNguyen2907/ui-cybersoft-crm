//get json from servlet using fetch api
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
    console.log(data);
    var table = $("#user-table").DataTable();
    //clear table before display new data, the last column is the action column edit,delete and get detail
    table.clear().draw();
    $.each(data, function (index, value) {
      table.row
        .add([
          index + 1,
          value.fullName,
          value.email,
          value.phone,
          value.role.name,
          '<button class="btn btn-primary btn-sm" onclick="editUser(' +
            value.code +
            ')">Sửa</button>' +
            '<button class="btn btn-danger btn-sm" onclick="deleteUser(' +
            value.code +
            ')">Xóa</button>' +
            '<button class="btn btn-info btn-sm" onclick="getDetail(' +
            value.code +
            ')">Xem</button>',
        ])
        .draw(false);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

//delete user
function deleteUser(code, event) {
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
      if (data.role.id == 3 || data.role.id == 2) {
        alert("Không có quyền xoá");
      } else {
        var result = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
        if (result) {
          fetch("https://cybersoft-crm.herokuapp.com/api/user/delete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            //body is json
            body: JSON.stringify({
              code: code,
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
    })
    .catch(function (error) {
      console.log(error);
    });
}

//get detail of user, send redirect to user-details.html
function getDetail(code) {
  window.location.href = "user-details.html?code=" + code;
}

//edit user
function editUser(code) {
  window.location.href = "user-add.html?code=" + code;
}

toJson = function (form) {
  var array = $(form).serializeArray();
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  return json;
};
