//check if user isloged in
//get cookie by name
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
//get jwt token from cookie
var jwtToken = getCookie("jwtToken");
//check if jwt token is exist
if (jwtToken != null) {
  window.location.href = "./index.html";
}

//do login
function doLogin() {
  var email = $("#email").val();
  var password = $("#password").val();
  if (email == "" || password == "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  console.log(
    JSON.stringify({
      email: email,
      password: password,
    })
  );
  $.ajax({
    type: "POST",
    url: "https://cybersoft-crm.herokuapp.com/dang-nhap",
    //data is json
    data: JSON.stringify({
      email: email,
      password: password,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.isSuccess == true) {
        //save data to cookie
        document.cookie = "jwtToken=" + data.data;
        alert("Đăng nhập thành công");
        //save user to local storage
        // localStorage.setItem("currentUserCode", data.data.code);
        // localStorage.setItem("currentUserName", data.data.fullName);
        // localStorage.setItem("currentUserEmail", data.data.email);
        window.location.href = "./index.html";
      } else {
        alert("Đăng nhập không thành công");
      }
    },
    error: function (error) {
      alert("Đăng nhập không thành công");
      console.log(error);
    },
  });
}
