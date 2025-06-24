var token;
    // localStorage.getItem('authToken', token);
    if (localStorage.getItem('authToken', token) === " ") {
      localStorage.setItem('authToken', " ")
    }
var settings = {
      "url": `https://flashweb.iweberp.com/api/getUpdatedSayFToken?AuthorizationBearer=${token}&clientID=smit@iwebtechno.com&clientSecret=524a3e9a-d775-4762-8878-5687de9b530f`,
      "method": "GET",
};
//     var settings = {
//       "url": "https://cards.rewardsforeveryone.in/auth/login",
//       "method": "POST",
//   "timeout": 0,
//   "data": {
//     // "clientID": "admin@genzdealz.ai",
//     // "clientSecret": "5ab95b89-03af-41c2-b19d-fb5a965ffa2e"
//     "clientID": "reports@sayf.in",
//     "clientSecret": "88936631-cdad-458f-9de7-b1538acf25bc"
// "clientID": "smit@iwebtechno.com", "clientSecret": "524a3e9a-d775-4762-8878-5687de9b530f"
//   },
// };

$.ajax(settings).done(function (response) {
  // console.log(response);

  if (response.success === true) {
    // Authentication successful, retrieve the token
    token = response.NewAuthorizationBearer;
    // console.log("Token:", token);

    // Set the token in the local storage
    localStorage.setItem('authToken', token);

    // Now you can use the token for further requests or store it as needed
  } else {
    // Authentication failed, handle the error
    console.error("Authentication failed. Error:", response.error);
  }
}).fail(function (error) {
  // Handle AJAX request failure
  console.error("AJAX request failed. Error:", error);
});


function checkTokenExpiration() {
  var token = localStorage.getItem('authToken');
  
  if (token) {
    // Parse the token payload (assuming it's a JSON Web Token)
    var tokenPayload = JSON.parse(atob(token.split('.')[1]));

    // Check if the current time is greater than the token's expiration time
    if (Date.now() >= tokenPayload.exp * 1000) {
      // Token has expired, get a new one
      refreshToken();
    }
  }
}

function refreshToken() {
  var settings = {
    // Include your token refresh endpoint
    "url": "https://business.rewardsforeveryone.in/auth/refresh",
    "method": "POST",
    "timeout": 0,
    "data": {
      "refreshToken": localStorage.getItem('refreshToken') // Include the refresh token if applicable
    },
  };

  $.ajax(settings).done(function (response) {
    // console.log(response);
    if (response.success === true) {
      // Refresh successful, retrieve the new token
      var newToken = response.data.token;
      // console.log("New Token:", newToken);

      // Update the token in the local storage
      localStorage.setItem('authToken', newToken);

      // Update the token expiration check
      checkTokenExpiration();
    } else {
      // Refresh failed, handle the error
      console.error("Token refresh failed. Error:", response.error);
    }
  }).fail(function (error) {
    // Handle AJAX request failure
    console.error("Token refresh AJAX request failed. Error:", error);
  });
}

// Call this function to check token expiration on page load or periodically
checkTokenExpiration();