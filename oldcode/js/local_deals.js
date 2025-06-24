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

  // Make an AJAX request to fetch store data
  $.ajax({
    url: "https://flashweb.iweberp.com/api/local_stores",
    dataType: "json",
    success: function (data) {

      var cardHtml = ""; // Initialize cardHtml here

      for (var i = 0; i < data.length; i++) {
        cardHtml += `
        <div class="col">
          <div class="card h-100 border-0 bg-white shadow rounded-4 ${data[i].storeName}" data-storeid="${data[i].storeId}" data-title="${data[i].storeName}" id="${data[i].storeName}" style="cursor:pointer;">
            <div class="row g-0 h-100 p-3 align-items-center justify-content-center">
              <div class="col-12 mx-auto text-center">
                <img src="${data[i].storeImageUrl}" height="200px" style="object-fit:scale-down;" class="text-center mx-auto rounded-4 w-100" alt="Store Image">
              </div>
              <div class="col-12 d-flex">
                <div class="card-body my-auto pe-0 text-center">
                  <h5 class="card-title text-prim fs-5">${data[i].storeName}</h5>
                  <p class="mb-2"><span class=" fw-normal text-muted"> ${data[i].storeDescription}</span></p>
                  <div class="d-flex mb-2 align-items-center justify-content-center" style="color:#918bf8;">
                    <i class="fa-solid fa-phone fs-5 grow"></i>
                    <a href="tel:${data[i].storePhoneNo}" class="ms-2 position-relative fw-bold text-second tel ${data[i].storeName}" id="${data[i].storePhoneNo}">${data[i].storePhoneNo}</a>
                  </div>
                  <div class="d-flex mb-2 align-items-center justify-content-center" style="color:#F34333;">
                    <i class="fa-solid fa-location-dot fs-5 grow"></i>
                    <a href="${data[i].storeLocation}" target="_blank" class="ms-2 position-relative location fw-bold text-second">Location</a>
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
                    gtag('event', 'store_click_web', {
                      'store_click_web_category': 'Link Click',
                      'store_click_label': `Product Name:${title}, ${storeId} User No:${mobileNumber} User Name:${fName}+${lName}`,
                      'transport_type': 'beacon'
                    });
debugger
        // Open the store_products page with the storeId as a query parameter
        window.open(`store_products?storeId=${storeId}`, "_self");
      });
      $(".card .tel").on("click", function (event) {
        // Allow the "Location" link to open in a new tab or window
        event.stopPropagation();
      });
      // Add a click event handler specifically for the "Location" links
      $(".card .location").on("click", function (event) {
        // Allow the "Location" link to open in a new tab or window
        event.stopPropagation();
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    },
  });
});
