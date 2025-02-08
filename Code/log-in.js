var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://prestige-5017.restdb.io/rest/log-in",
  "method": "GET",
  "headers": {
      "content-type": "application/json",
      "x-apikey": "67a5ad259c9797c0ab1b2a7c",
      "cache-control": "no-cache"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response); // View all user data in console

  // Simulating a login system where we check for a matching email or username
  let enteredEmail = document.getElementById("email-input").value;
  let user = response.find(user => user.email === enteredEmail);

  if (user) {
      alert("Login Successful!");

      // Store user details in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Redirect to account page
      window.location.href = "account.html";
  } else {
      alert("Invalid credentials!");
  }
});
