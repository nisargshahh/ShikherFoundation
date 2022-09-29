function confirm() {
  var uname = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  if (uname == "ShikherAdmin" && pass == "admin123") {
    window.location.href =
      "events.html";
    alert("login successf   ull");
    return false;
  } else {
    alert("login failed");
  }
}
