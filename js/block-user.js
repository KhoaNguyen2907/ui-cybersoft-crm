//check authorization
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
//get jwt token from cookie
var jwtToken = getCookie("jwtToken");
//check if jwt token is exist
if (jwtToken == null) {
  window.location.href = "./login.html";
}
//if user is user, cannot access to user, project, role page and return to home page
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
    if (data.role.id == 3) {
      window.location.href = "./index.html?message=not-permission";
    }
  })
  .catch(function (error) {
    console.log(error);
  });
