// Set the SameSite cookie
document.cookie = "myCookie=myValue; SameSite=Lax";
$(".footer").hide();
$("main").hide();
$(document).ready(function () {

  // Function to handle card click and navigate to the new page with storeId
  function handleCardClick(storeId) {
    // Construct the URL with the selected storeId
    var storeProductsUrl = "https://flashweb.iweberp.com/api/store_products?storeId=" + storeId;

    // Open the URL in a new page
    window.open(storeProductsUrl);
  }

  // Function to detect mobile operating system
  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      $("#iosApp").hide();
      // $(".divLogo").addClass("ms-2");
      return "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      $("#androidApp").hide();
      // $(".divLogo").addClass("ms-2");
      return "iOS";
    }

    return "unknown";
  }

  // Call the getMobileOperatingSystem function
  var mobileOS = getMobileOperatingSystem();
// Retrieve user data from local storage
const userDataString = localStorage.getItem('userDataF') || localStorage.getItem('userDataA');

if (!userDataString) {
  console.error("User data not available in local storage");
  // Optionally, handle the absence of user data and inform the user
}

// Parse user data from the string
const userData = JSON.parse(userDataString);
const mobileNumber = userData?.number || userData.mobile_no || userData.phoneNumber;
// Assuming userData is already retrieved from local storage
const name = userData?.name;

// Function to extract the first and last words from a string
function getFirstAndLastWords(fullName) {
  const words = fullName.split(/\s+/);
  const firstWord = words[0] || 'DefaultFirst';
  const lastWord = words[words.length - 1] || 'DefaultLast';
  return { firstWord, lastWord };
}

// Use the chosen userData for first_name and last_name
const { firstWord, lastWord } = name ? getFirstAndLastWords(name) : { firstWord: 'DefaultFirst', lastWord: 'DefaultLast' };
let fName = userData?.first_name || firstWord;
let lName = userData?.last_name || lastWord;
  // Make an AJAX request to fetch store data
  $.ajax({
    url: "https://flashweb.iweberp.com/api/kj_local_stores?page=$page&itemsPerPage=$itemsPerPage",
    dataType: "json",
    success: function (data) {

      var cardHtml = ""; // Initialize cardHtml here

      for (var i = 0; i < data.length; i++) {
        cardHtml += `
        <div class="col">
          <div class="card h-100 border-0 contact-card ${data[i].storeName}" data-storeid="${data[i].storeId}" data-title="${data[i].storeName}" id="${data[i].storeName}" style="cursor:pointer;">
            <div class="row g-0 h-100 p-3 align-items-center">
              <div class="col-md-4">
                <img src="${data[i].storeImageUrl}" width="100%" height="200px" class="rounded-start rounded-end" alt="Store Image">
              </div>
              <div class="col-md-8 d-flex">
                <div class="card-body my-auto pe-0">
                  <h5 class="card-title text-white fs-5">${data[i].storeName}</h5>
                  <h5 class="card-title text-white fs-6 mb-0">Phone No.</h5>
                  <p class="mb-1"><span class=" fw-normal"><a href="tel:${data[i].storePhoneNo}" class="card-title tel fw-bold ${data[i].storeName}" id="${data[i].storePhoneNo}" style="color: #00cbff;">${data[i].storePhoneNo}</a></span>
                  </p>
                  <h5 class="card-title text-white fs-6 mb-0">Description </h5>
                  <p class="mb-1"><span class=" fw-normal text-white-50"> ${data[i].storeDescription}</span></p>
                  <div class="d-flex mb-2 align-items-center" style="color:#F34333;">
                    <i class="fa-solid fa-location-dot fs-5 grow"></i>
                    <a href="${data[i].storeLocation}" target="_blank" class="ms-2 position-relative location fw-bold" style="color: #00cbff;">Location</a>
                  </div>
                  <h5 class="card-title fs-6" style="color:#F34333;">Up To ${data[i].storeDiscount}.0% Off</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      }

      // Append cardHtml to the desired element
      $("#appendData").html(cardHtml);
      $(".footer").show();
      $("main").show();
      $("#overlay").hide();
      // Add a click event handler to the cards
      $(".card").on("click", function (event) {
        // Prevent the default link click behavior
        event.preventDefault();
        event.stopPropagation();
        // Get the storeId from the data attribute
        var storeId = $(this).data("storeid");
        var title = $(this).data("title");
          gtag('event', 'somaiya_click_web', {
            'somaiya_click_web_category': 'Link Click',
            'somaiya_click_label': `Product Name:${title}, ${storeId} User No:${mobileNumber} User Name:${fName}+${lName}`,
            'transport_type': 'beacon'
          });
debugger
        // Open the store_products.html page with the storeId as a query parameter
        window.open(`somaiya_detail?storeId=${storeId}`, "_self");
      });
      $(".card .tel").on("click", function (event) {
        // Allow the "Location" link to open in a new tab or window
        event.stopPropagation();
        var title = $(this).data("title");
          gtag('event', 'somaiya_click_web', {
            'somaiya_click_web_category': 'Link Click',
            'somaiya_click_label': `Dial - Product Name:${title} User No:${mobileNumber} User Name:${fName}+${lName}`,
            'transport_type': 'beacon'
          });
debugger
      });
      // Add a click event handler specifically for the "Location" links
      $(".card .location").on("click", function (event) {
        // Allow the "Location" link to open in a new tab or window
        event.stopPropagation();
        var title = $(this).data("title");
          gtag('event', 'somaiya_click_web', {
            'somaiya_click_web_category': 'Link Click',
            'somaiya_click_label': `Location - Product Name:${title} User No:${mobileNumber} User Name:${fName}+${lName}`,
            'transport_type': 'beacon'
          });
debugger
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    },
  });
});
