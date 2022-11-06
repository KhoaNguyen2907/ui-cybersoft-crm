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
if (jwtToken == null) {
  window.location.href = "login.html";
}

//check if user is logged in by fetch api with jwt token
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

      //display current user info
      $(".current-user-name").text(currentUser.fullName);
      $("#self-detail").attr(
        "href",
        "user-details.html?code=" + currentUser.code
      );
      $("#user-avatar-img").attr("src", currentUser.avatar);

      if (currentUser.roleId == 3) {
        $("#in-charge").closest(".form-group").hide();
        $("#start-date").closest(".form-group").hide();
        $("#end-date").closest(".form-group").hide();
        $("#project").attr("disabled", true);
        $("#name").attr("disabled", true);
        $("#description").attr("disabled", true);
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });
function logout() {
  //remove jwtToken from cookie
  document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "login.html";
}

//convert date object to string
function convertDateObjectToString(date) {
  //put 0 to day and month if it is less than 10
  let dateString =
    date.year +
    "-" +
    (date.month < 10 ? "0" + date.month : date.month) +
    "-" +
    (date.day < 10 ? "0" + date.day : date.day);
  return dateString;
}

//convert input date to dd-mm-yyyy
function convertStringDateToDDMMYY(date) {
  let dateString =
    date.substring(8, 10) +
    "-" +
    date.substring(5, 7) +
    "-" +
    date.substring(0, 4);
  return dateString;
}

//check empty input of form data
function checkEmpty(formEl) {
  var check = true;
  formEl.find("input").each(function () {
    //remove space before and after string
    if ($(this).val().trim() == "") {
      return false;
    }
  });
  return true;
}
