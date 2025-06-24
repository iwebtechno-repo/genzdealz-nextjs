// Common Firebase initialization and functions section //////-------
import {
  auth, db,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getDoc,
  doc,
  setDoc,
} from "/js/firebase_auth.js";
const userId = localStorage.getItem("userId");
const userDocRef = doc(db, "usersCollection", userId);
const userDocSnapshot = await getDoc(userDocRef);

if (userDocSnapshot.exists()) {
  const userData = userDocSnapshot.data();
  // localStorage.setItem("userDataF", JSON.stringify(userData));
  // Retrieve the userDataF from localStorage
  let userDataF = JSON.parse(localStorage.getItem("userDataF"));

  // Check if userDataF exists in localStorage
  if (userDataF) {
    // Update the phone number and phone verification status
    userDataF.phoneNumber = userData.phoneNumber;
    userDataF.phoneVerified = userData.phoneVerified; // or false, depending on the verification status

    // Store the updated userDataF back into localStorage
    localStorage.setItem("userDataF", JSON.stringify(userDataF));
    // $("#otpModal").modal("hide");
    // proceed();
  } else {
    console.error("userDataF not found in localStorage.");
  }
  //debugger
}

// Cashfree mode section ///////------------
let cashfree = Cashfree({
  mode: "production",
});
// sendVerificationCode();


// Example: Retrieving from from the query parameter ///////--------
const baseURL = window.location.origin;
const urlParams = new URLSearchParams(window.location.search);
let storeId = urlParams.get("storeId");
const brandImage = urlParams.get("image");
// const encodedImage = encodeURIComponent(image);
// const cashback = urlParams.get("cashback");
// Example: Retrieving authToken from localStorage
// const authToken = localStorage.getItem("authToken");

// popover code//////----------
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

// Helper to display toast messages
    const toastContainer = document.getElementById("toastContainer");
    function showToast(message, isError = false) {
        // toastContainer.innerHTML = ""; // Clear previous toasts
        const toast = document.createElement("div");
        toast.className = `toast align-items-center mb-2 text-bg-${isError ? "danger" : "success"} border-0`;
        toast.role = "alert";
        toast.innerHTML = `
<div class="d-flex">
  <div class="toast-body">${message}</div>
  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
`;
        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        toast.addEventListener("hidden.bs.toast", () => toast.remove());
    }

    const storedPayment = JSON.parse(localStorage.getItem("pgStatus"));

if (storedPayment) {
  if (storedPayment.payment_status === "SUCCESS") {
    // Don't show toast, just remove
    localStorage.removeItem("pgStatus");
  }else if (storedPayment.payment_status === "CUSTOM_SUCCESS") {
    showToast(`Error occurred: ${storedPayment.error_details.error_description}`, true);
    localStorage.removeItem("pgStatus");
  } else if (storedPayment.error_details && storedPayment.error_details.error_description) {
    showToast(`Error occurred: ${storedPayment.error_details.error_description}`, true);
    localStorage.removeItem("pgStatus");
  } else {
    showToast(`Payment status: ${storedPayment.payment_status}`, true);
    localStorage.removeItem("pgStatus");
  }
}


// Handle the received store data and update the page content/////-----
$("#stores").html(
  `
<div class="left-section px-0">
  <div class="position-sticky w-100 bg-white py-2 top-fixed search-container top-0" style="z-index: 2;">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="input-wrapper position-relative ">
            <input type="text" id="searchInput" class="form-control border-dark" placeholder="Search" style="padding-left: 30px;">
            <i class="fa-solid fa-search text-black position-absolute"
              style=" top:11px; left: 7px;"></i>
            <i class="fa-solid fa-circle-xmark text-black position-absolute clear-text"
              style="top:11px; right: 7px;"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-1" id="appendData">
    </div>
  </div>
</div>
`
);

// $("#stores").append(flexiPayContainer);



waitForSearchInput(); // Start observing for #searchInput
// Call observeChanges AFTER content is injected
observeChanges();

// Function to adjust left-section height dynamically
function adjustMainHeight() {
  const rightSection = document.querySelector(".right-section");
  const leftSection = document.querySelector(".left-section");
  // console.log(rightSection, leftSection);
  if (rightSection && leftSection) {
    // Get the height of the right section
    const rightSectionHeight = rightSection.offsetHeight;

    // Set the height of the left section
    leftSection.style.height = `${rightSectionHeight}px`;
  }else{
    // Set the height of the left section
    leftSection.style.height = `calc(100vh - 90px)`;;
    }
}

// Function to observe changes dynamically
function observeChanges() {
  const targetNode = document.querySelector("#storeDetail");

  if (targetNode) {
    // Create a MutationObserver instance
    const observer = new MutationObserver(() => {
      // Check if sections exist and adjust height
      adjustMainHeight();
    });

    // Observer configuration
    const config = {
      childList: true, // Listen for addition/removal of child nodes
      subtree: true, // Listen for changes in all descendants
      attributes: true, // Listen for attribute changes
      characterData: true, // Listen for text content changes
    };

    // Start observing dynamic content
    observer.observe(targetNode, config);

    // Adjust initially if sections exist
    adjustMainHeight();
  }
}

// Debounce resize for better performance
let resizeTimeout;
function handleResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(adjustMainHeight, 200);
}

// Adjust on resize with debounce
window.addEventListener("resize", handleResize);

// ***********************************left side section **********************

// Throttle function to limit event firing frequency
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Debounce function to delay execution
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

let currentPage = 1;
let isLoading = false;
let allDataLoaded = false;
let myHeadersLeft;

function loadData(searchValue = "") {
  if (!isLoading && !allDataLoaded) {
    isLoading = true;

    // console.log("🔎 Search value inside loadData:", searchValue); // Check value

    // Add placeholders for loading
    let placeholderHtml = Array(12).fill().map(() => `
      <div class="col placeholder-col" style="height: 100px;">
        <div class="h-100 border-bottom" style="cursor:pointer;">
          <div class="row g-0 h-100 p-3">
            <div class="col-5 col-md-3">
              <p class="placeholder-glow h-100 w-75 rounded-3 shadow ">
                <span class="placeholder col-12 h-100 rounded-3"></span>
              </p>
            </div>
            <div class="col-7 col-md-9 d-flex">
              <div class="card-body my-auto">
                <h5 class="card-title fs-6">
                  <p class="placeholder-glow">
                    <span class="placeholder col-12"></span>
                  </p>
                </h5>
                <h5 class="fs-6 text-muted">
                  <p class="placeholder-glow">
                    <span class="placeholder col-12"></span>
                  </p>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>`).join("");

    $("#appendData").append(placeholderHtml);
    $(".footer").show();
    $("#overlay").hide();
    // Set headers after search input is checked
    myHeadersLeft = new Headers({
      "page_size": "30",
      "page": currentPage.toString(),
      "brand": searchValue // Use passed search value here
    });

    // Fetch API call with headers
    fetch("https://flashweb.iweberp.com/api/getbrandsbyiweb", {
      method: "GET",
      headers: myHeadersLeft,
      redirect: "follow"
    })
      .then((response) => response.json())
      .then((data) => {
        $(".placeholder-col").fadeOut();

        let cardHtml = data.map(item => `
          <div class="col real-col" style="height: 100px;">
            <div class="h-100 deal border-bottom ${item.brandName}" data-src="${item.logoURL}" data-title="${item.brandName}" data-storeid="${item.brand_id}" data-cashback="${item.maxDiscount}" style="cursor:pointer;">
              <div class="row g-0 h-100 p-3">
                <div class="col-lg-3 col-xl-4 col-xxl-3 h-100">
                  <img src="${item.logoURL}" loading="lazy" height="100%" class="rounded-3 shadow h-100" alt="Store Image">
                </div>
                <div class="col-lg-7 col-xl-8 col-xxl-9 d-flex ps-lg-2 ps-xl-0">
                  <div class="card-body my-auto pe-0">
                    <h6 class="card-title fw-bold mb-2">${item.brandName}</h6>
                    <h6 class="card-title text-muted">Flat OFF ${item.maxDiscount}%</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>`).join("");

        $("#appendData").append(cardHtml);

        currentPage++;
        isLoading = false;
        if (data.length === 0) allDataLoaded = true;
        if (data.length === 0) {
          $(".placeholder-col").fadeOut();

        let cardHtml = `
          <div class="col real-col" style="">
            <div class="text-center rounded-4 shadow py-3 text-third mx-2">No deals found</div>
          </div>`;

        $("#appendData").append(cardHtml);
        }
        $(".deal").off("click").on("click", function () {
          let storeId = $(this).data("storeid");
          // Remove .active from all other .deal elements
  $(".deal").removeClass("active");

  // Add .active to the clicked .deal
  $(this).addClass("active");
          $("#storeDetail").html("");
          $("#overlay").show();
          updateBrandDetails(storeId)
        });
        function updateBrandDetails(storeId) {
          let offerData = {}; // Global variable
          const currentDate = new Date().toISOString().split("T")[0]; // Formats as "YYYY-MM-DD"
          // console.log(currentDate);
          async function fetchOfferData() {
            try {
              const response = await fetch("https://flashweb.iweberp.com/api/checkexclusiveoffer", {
                method: 'POST', // Ensure this is POST
                headers: {
                  'userUID': userId,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  brandID: storeId,
                  currentDate: currentDate // Ensure currentDate is defined before using
                })
              });

              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              offerData = data[0]; // Store globally

              if (offerData?.scheme_on_off) { // ✅ Added optional chaining to avoid undefined errors
                document.getElementById("minOrderValue").textContent = `₹${offerData.min_order_value}`;
                document.getElementById("giftcardFlatOff").textContent = `₹${offerData.giftcard_flat_off}`;

                // Show the modal
                const offerModal = new bootstrap.Modal(document.getElementById("offerModal"));
                offerModal.show();
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }

          // ✅ Wait for fetch before logging
          (async function () {
            await fetchOfferData();
            // console.log("Offer Data (After Fetch):", offerData); // Now data is available





            // Detail screen data rendring Code section ////////----------
            const myHeaders = new Headers();
            // myHeaders.append("brand_id", storeId);
            myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("Authorization", "Bearer " + authToken);

            const requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            };
            // Use the promise
            function fetchData(storeId) {
              return new Promise(function (resolve) {
                // fetch("https://flashweb.iweberp.com/api/get_brands_detail", requestOptions)
                fetch(`https://flashweb.iweberp.com/api/getBrandDetails?brand_id=${storeId}`, requestOptions)

                  .then((response) => response.json())
                  .then((brandData) => {
                    resolve(brandData);

                    // ✅ Update the right-section dynamically with the new brand details
                    // updateBrandDetails(brandData);
                  })
                  .catch((error) => console.error(error));
              });
            }
            if (storeId) {
              fetchData(storeId)
              .then(function (storeData) {
                // console.log(storeData)
                if (!storeData.success) {
                  console.error("Deal not available");
                  // Optionally, handle the absence of the token and inform the user
                  return; // Return false to prevent form submission
                }
                // Handle storeData inside this block
                let horizontalImage = storeData.data.horizontalPoster;
                let image = storeData.data.brandLogo;

                const cashback = storeData.data.flexipayDiscount;
                // Split the text into an array using the specified line breaks
                function cleanInstruction(text) {
                  return text
                    .replace(/\\\./g, '.') // Remove backslash before dot
                    .replace(/\s+/g, ' ')   // Replace multiple spaces/newlines with a single space
                    .trim();                // Remove extra spaces at start and end
                }
                
                // Split and clean flexipayInstructions
                const instructionsArray = (storeData.data.flexipayInstructions || "")
                  .split(/\r\n|\r|\n/)
                  .map(cleanInstruction)
                  .filter(Boolean); // Remove empty strings
                
                // Handle the received store data and update the page content/////-----
                $("#storeDetail").html(
                  `
      <div class="position-relative">
        <div class="right-section">
          <h1 class="mb-3 heading text-prim fw-bold res-text"><span><img src="${storeData.data.brandLogo}" width="50px" height="50px" class="rounded-circle me-3 shadow" alt="Store Image"></span>${storeData.data.brandName}</h1>
          <div class="h-100 border-0 ${storeData.data.brandName} position-relative" id="${storeData.data.brandName}">
          
            <div class="row">
              <div class="col-xl-6 text-center text-xl-start">
                <img src="${horizontalImage}" class="w-100 rounded-4 shadow" alt="Store Image">
                <div class="similar-deals big-deals container py-4 d-none d-xl-block">
                  <div class="row justify-content-center big-deals-child">
                    <div class="col-12">
                      <div class="mb-3 mt-2 d-flex justify-content-between align-items-center">
                        <h2 class="text-center mb-0">Similar DealZ</h2>
                      </div>
                    </div>
                  </div>
                          
                  <div class="row gy-3 bigBrandz" id="">
                  </div>
                </div>
                <div class="aiml-deals container py-4 d-none d-xl-block">
                  <div class="row justify-content-center aiml-deals-child">
                    <div class="col-12">
                      <div class="mb-3 mt-2 d-flex justify-content-between align-items-center">
                        <h2 class="text-center mb-0">AIML WebScraped DealZ</h2>
                      </div>
                    </div>
                  </div>
                  <div class="row gy-3 aimlBrandz" id="">
                  </div>
                </div>
              </div>
              <div class="col-xl-6 d-flex">
                <div class="card-body p-0 text-start w-100">
                  <h4 class="card-title fw-bold mb-2 mt-3 mt-xl-0">Product Details</h4>
                  <p class="res-text text-muted d-lg-block">${storeData.data.about || ''}</p>
                  <div class=" d-flex justify-content-center justify-content-lg-start align-items-center">
                    <a href="${storeData.data.website}" target="_blank" class=" btn btn-prim me-3"><i class="fa fa-globe me-2"></i> Visit Website</a>
                    <a id="openAppLink" target="_blank" class="d-inline-block res-text btn btn-prim"><i class="fa-solid fa-mobile-screen-button me-2"></i> Open App</a>
                  </div>
                  <div class="accordion accordion-flush col-12 mt-4 border-bottom" id="accordionFlushExample">
                    <div class="accordion-item mb-4 rounded-3 shadow contact-card">
                      <h2 class="accordion-header rounded-3" id="flush-headingOne">
                        <button class="accordion-button collapsed rounded-3 border-0 text-prim fw-bold fs-6 mb-0 contact-card" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <i class="fa-solid fa-gift me-3"></i> How to redeem gift card?
                        </button>
                      </h2>
                      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body text-prim pt-0">${instructionsArray.join("<br>")}</div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-auto text-center min-max flexipay border-bottom py-4" id="flexipay">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="mt-auto">
                        <span class="fs-5 fw-bold">${storeData.data.flexipayDiscount}% <span class="">Discount</span></span>
                      </div>
                      <div class="mt-auto text-muted small">
                        <span>Min &#8377;${storeData.data.flexipayMin} & </span> 
                        <span>Max &#8377;${storeData.data.flexipayMax}</span>
                      </div>
                    </div>
                    <form id="payForm">
                      <div class="form-floating my-3">
                          <input type="text" id="rupee" name="rupee" class="form-control bg-light-ppl" placeholder="Enter amount for ${storeData.data.brandName}">
                          <label for="rupee" class="text-second">Enter amount for ${storeData.data.brandName}</label>
                      </div>
                      <div><p class="vaidation-message my-3" id="valMsg"> </p></div>
                      <button type="submit" id="pay" class="w-100 btn btn-prim d-flex" disabled>
                        <div class="spinner-border text-white loader d-none mx-auto" style="height: 1.5rem; width: 1.5rem;" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        <span class="text-buy text-white fw-bold d-block mx-auto">Pay</span>
                      </button>
                    </form>
                  </div>
                  <div class="marquee d-none">
                    <div class="marquee-content">
                      <a href="https://bit.ly/3M862Mx" target="_blank" class="text-animate h5" style="color:#cee321">Pay with Aditya Birla UPI App & get ₹30 cashback on your first ₹150+ payment!</a>
                      <a href="https://bit.ly/3M862Mx" target="_blank" class="text-animate h5 d-none d-md-inline" style="color:#cee321">Pay with Aditya Birla UPI App & get ₹30 cashback on your first ₹150+ payment!</a>
                    </div>
                  </div>
                  </div>
              </div>
              <div class=" d-none position-absolute top-0 end-0 w-auto">

                <div class="dropdown-center position-relative">
                  <a class="nav-link dropdown-toggle btn shadow w-100 p-2 rounded-circle border-0 mb-0 mt-0 mx-auto d-flex justify-content-center align-items-center"  style="background: #ffffff; color:#323232;" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="text-buy text-b fw-bold d-block"><i class="fa-solid fa-share-nodes fs-4"></i></span>
                  </a>
                  <div class="dropdown-menu drop-animate bg-white px-1 shadow">
                    <div class="d-flex p-2 py-1 align-items-center">
                      <div><button id="shareOnWhatsApp" class="bg-transparent border-0"><i class="fa-brands fa-whatsapp fs-2" style="color: #00d757;"></i></button></div>
                      <div><button id="shareOnFacebook" class="bg-transparent border-0"><i class="fa-brands fa-facebook fs-2" style="color: #0866ff;"></i></button></div>
                      <div><button id="shareOnTwitter" class="bg-transparent border-0"><i class="fa-brands fa-x-twitter fs-2" style="color: #000000;"></i></button></div>
                      <div><button id="shareOnLinkedIn" class="bg-transparent border-0"><i class="fa-brands fa-linkedin fs-2" style="color: #0a66c2;"></i></button></div>
                      <div class="d-none"><button id="shareOnInstagramDM" class="bg-transparent border-0"><i class="fa-brands fa-instagram fs-1" style="color: #63E6BE;"></i></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="similar-deals big-deals container-fluid py-4 d-xl-none">
        <div class="row justify-content-center big-deals-child">
                      <div class="col-12">
                        <div class="mb-3 mt-2 d-flex justify-content-between align-items-center">
                          <h2 class="text-center mb-0">Similar DealZ</h2>
                        </div>
                      </div>
                    </div>
                            
                    <div class="row gy-3 scroll bigBrandz" id="">
                    </div>
                  </div>
                  <div class="aiml-deals container-fluid py-4 d-xl-none">
                    <div class="row justify-content-center aiml-deals-child">
                      <div class="col-12">
                        <div class="mb-3 mt-2 d-flex justify-content-between align-items-center">
                          <h2 class="text-center mb-0">AIML WebScraped DealZ</h2>
                        </div>
                      </div>
                    </div>
                    <div class="row gy-3 scroll aimlBrandz" id="">
                    </div>
                  </div>
      <div class="col-12 px-3 px-md-2 mt-3 d-none ">
        <button type="button" id="share" class="btn shadow w-100 rounded-5 border-0 text-white mb-1 mx-auto d-flex justify-content-center" style="background: #2e3192;">
          <span class="text-buy text-b fw-bold d-block me-3"><i class="fa-solid fa-share-nodes fs-4"></i></span> Share this Deal
        </button>
      </div>
    `
                );
                // Insert HTML for `flexipay` section ///////------
                const flexiPayContainer = `
    <div class="col-12 col-md-6 mx-auto mt-auto text-center">
        <div class="mt-auto text-center min-max flexipay" id="flexipay">
            <!-- Flexipay details here -->
        </div>
    </div>
`;
                $("#storeDetail").append(flexiPayContainer);

                // Show the modal on page load
                var myModal = new bootstrap.Modal(document.getElementById('downloadModal'));
                // myModal.show();






                // Detect OS and redirect to the appropriate app store
                document.getElementById("downloadBtn").addEventListener("click", function () {
                  let userAgent = navigator.userAgent || navigator.vendor || window.opera;
                  let playStoreLink = "https://play.google.com/store/apps/details?id=iweb.student.marketplace&pcampaignid=web_share";
                  let appStoreLink = "https://apps.apple.com/in/app/genzdealz-ai/id6504975486";

                  if (/android/i.test(userAgent) || /win/i.test(userAgent)) {
                    window.location.href = playStoreLink;
                  } else if (/iPad|iPhone|Mac/i.test(userAgent)) {
                    window.location.href = appStoreLink;
                  } else {
                    alert("Your device may not be supported for app download.");
                  }
                });
                // input value section //////---------
                const rupeeInput = document.getElementById("rupee");
                const valMsg = document.getElementById("valMsg");
                const payButton = document.getElementById("pay");

                // Dynamically fetch `flexipayMin`, `flexipayMax`, and `flexipayDiscount` from storeData
                const getFlexipayMin = () => parseInt(storeData?.data?.flexipayMin ?? 0, 10);
                const getFlexipayMax = () => parseInt(storeData?.data?.flexipayMax ?? 1000, 10);
                const getFlexipayDiscount = () => parseFloat(storeData?.data?.flexipayDiscount ?? 0) || 0;

                rupeeInput.addEventListener("input", () => {
                  const enteredValue = parseFloat(rupeeInput.value.replace(/[^0-9.]/g, ''));
                  const flexipayMin = getFlexipayMin();
                  const flexipayMax = getFlexipayMax();
                  const flexipayDiscount = getFlexipayDiscount();

                  // Clear the validation message if input is blank
                  if (rupeeInput.value === "" || rupeeInput.value <= 1) {
                    valMsg.textContent = "";
                    payButton.disabled = true;
                    return; // Exit early if input is blank
                  }

                  if (enteredValue >= flexipayMin && enteredValue <= flexipayMax) {
                    // Calculate the discounted value without rounding up
                    const discount = calculateDiscount(enteredValue, flexipayDiscount);
                    valMsg.textContent = `Amount to pay ₹${discount}.`;
                    valMsg.style.color = "green";

                    // Enable the pay button
                    payButton.disabled = false;
                  } else {
                    // Show validation error message
                    valMsg.textContent = `Enter an amount between ₹${flexipayMin} and ₹${flexipayMax}.`;
                    valMsg.style.color = "red";

                    // Keep the pay button disabled
                    payButton.disabled = true;
                  }
                });

                /**
                 * Function to calculate discounted value based on the entered amount and discount
                 * @param {number} amount - Entered amount
                 * @param {number} discount - Discount percentage (e.g., 0.1 for 10%)
                 * @returns {string} - Discounted value (without rounding)
                 */
                function calculateDiscount(amount, discount) {
                  function roundToTwo(num) {
                    return (Math.round(num * 100) / 100).toFixed(2);
                  }
                  // Apply discount percentage correctly and avoid rounding
                  const discountedValue = amount - (amount * discount) / 100;
                  return roundToTwo(discountedValue); // Return the discounted value with 2 decimal places
                }
                // Web and app button section /////------------
                // console.log(discountedValue)
                const linkElement = document.getElementById("openAppLink");
                const appIdPattern = /^(com|in|tv|co|fc|fit|)\./;

                let finalUrl = "";
                if (storeData.data.appId && appIdPattern.test(storeData.data.appId)) {
                  finalUrl = `https://play.google.com/store/apps/details?id=${storeData.data.appId}`;
                } else if (storeData.data.website) {
                  finalUrl = storeData.data.website;
                }
                linkElement.href = finalUrl || "#"; // Default to "#" if no valid URL is found

                // Render FlexiPay if enabled///---------
                const flexiPay = storeData.data.flexipay;
                const buyContainer = document.getElementById("flexipay");
                buyContainer.style.display = flexiPay ? "block" : "none";


                // Product or Fixed rate  giftcardcard section //////////------------
                /// Select the marquee element and check if it exists 
                const marqueeElement = document.querySelector(".marquee");
                if (marqueeElement) {
                  // Dynamically insert products after marquee
                  // Dynamically insert products after marquee
                  let products = storeData.data.products; // Assuming `products` is in `storeData.data`
                  // console.log(products)
                  // Sort products by price in ascending order
                  products.sort((a, b) => a.discountedPrice - b.discountedPrice);
                  let productsHTML = '<div class="products-section my-3"><h4 class="fw-semibold">Products</h4></div>';

                  products.forEach((product) => {
                    // Safely handle null or undefined vendorInstructions and productName
                    const instructionsText = product.vendorInstructions || product.productName || "";
                    const instructions = instructionsText.split(/\r\n|\r|\n/)
                    .map(cleanInstruction)
                    .filter(Boolean);

                    // Render the instructions as individual list items
                    const instructionsHTML = instructions
                      .filter(line => line.trim() !== "") // Remove empty lines
                      .map(line => `<li>${line.trim()}</li>`)
                      .join("");
                    productsHTML += `
            <div class="product-item border-bottom">
                <div class="my-3 position-relative">
                  <div class="d-flex justify-content-between align-items-stretch my-3">
                    <div>
                      <h5 class="mb-0 text-nowrap overflow-hidden fw-semibold"><i class="fa-solid fa-gift me-2 text-second"></i> ${product.productName}</h5>
                      <p class="my-2 text-second fw-semibold">Pay : ₹${product.discountedPrice} <span class="text-muted text-decoration-line-through ms-2">₹${product.price}</span></p>
                      <div class="w-100">
                        <button class="dropdown-toggle small w-100 p-0 border-0 rounded-3 fw-semibold text-start bg-transparent" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                          See Details
                        </button>
                        <ul class="dropdown-menu p-3 border-0 shadow-lg">
                        ${instructionsHTML || "<li>No instructions available</li>"}
                        </ul>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <p class="mb-auto text-muted fw-bold ms-auto text-end">${product.discountPercentage}% OFF</p>
                      <button class="btn btn-sm px-4 btn-prim shadow" onclick="purchaseProduct('${product.productId}', ${product.price}, ${product.discountedPrice})">Buy</button>
                    </div>
                  </div>
                </div>
            </div>
        `;
                  });

                  productsHTML += '</div></div>'; // Close the products section
                  // Insert productsHTML after the marquee element
                  marqueeElement.insertAdjacentHTML("afterend", productsHTML);
                  if (products.length === 0) {
                    $(".products-section").hide();
                  }
                } else {
                  console.error("Error: .marquee element not found in the DOM");
                }

                // Share link section ////////------------
                document.getElementById('share').addEventListener('click', shareOnSocialMedia);
                function shareOnSocialMedia() {
                  if (navigator.share) {
                    navigator.share({
                      // title: 'Check out this awesome site!',
                      text: `Check out the ${storeData.data.brandName} deal on GenZDealZ.ai! Save an extra ${cashback}.0% on your next purchase. Don’t miss this exclusive offer: `,
                      url: `${baseURL}/brands_store_detail?storeId=${storeId}`, // current URL
                    })
                      .then(() => console.log('Successfully shared'))
                      .catch((error) => console.log('Error sharing:', error));
                  } else {
                    alert('Sharing is not supported in this browser.');
                  }
                }
                document.getElementById('shareOnWhatsApp').addEventListener('click', shareOnWhatsApp);
                function shareOnWhatsApp() {
                  const url = encodeURIComponent(`${baseURL}/brands_store_detail?storeId=${storeId}`);
                  const text = encodeURIComponent(`Check out the ${storeData.data.brandName} deal on GenZDealZ.ai! Save an extra ${cashback}.0% on your next purchase. Don’t miss this exclusive offer: `);
                  const shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
                  window.open(shareUrl, '_blank');
                }
                document.getElementById('shareOnFacebook').addEventListener('click', shareOnFacebook);
                function shareOnFacebook() {
                  const url = encodeURIComponent(`${baseURL}/brands_store_detail?storeId=${storeId}`);
                  const text = encodeURIComponent(`Check out the ${storeData.data.brandName} deal on GenZDealZ.ai! Save an extra ${cashback}.0% on your next purchase. Don’t miss this exclusive offer: `);
                  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                  window.open(shareUrl, '_blank');
                }
                document.getElementById('shareOnTwitter').addEventListener('click', shareOnTwitter);
                function shareOnTwitter() {
                  const url = encodeURIComponent(`${baseURL}/brands_store_detail?storeId=${storeId}`);
                  const text = encodeURIComponent(`Check out the ${storeData.data.brandName} deal on GenZDealZ.ai! Save an extra ${cashback}.0% on your next purchase. Don’t miss this exclusive offer: `);
                  const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                  window.open(shareUrl, '_blank');
                }
                document.getElementById('shareOnLinkedIn').addEventListener('click', shareOnLinkedIn);
                function shareOnLinkedIn() {
                  const url = encodeURIComponent(`${baseURL}/brands_store_detail?storeId=${storeId}`);
                  // const text = encodeURIComponent(`Check out the ${storeData.data.brandName} deal on GenZDealZ.ai! Save an extra ${cashback}% on your next purchase. Don’t miss this exclusive offer: `);
                  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                  window.open(shareUrl, '_blank');
                }


                $(".footer").show();
                $("#overlay").hide();
                
                const url = 'https://flashweb.iweberp.com/api/sub_get_brands_ML_Recommend';
                const options = {
                  method: 'GET',
                  headers: {
                    'deal_name': storeData.data.brandName
                  }
                };

                fetch(url, options)
                  .then(response => response.json())
                  .then(data => {
                    // console.log(data)
                    // Handle the response data
                    if (Array.isArray(data.data)) {
                      var cardHtml = data.data.map(item => {
                        if (Object.keys(item).length === 0 && item.constructor === Object) {
                          // If item is an empty object, return an empty string to hide the card
                          return '';
                        } else if (item.IsSubspaceDeal) {
                          return `
            <div class="col-5 col-md-4 col-xl-6">
              
              <div class="big-b w-100 shadow d-flex flex-column rounded-4" data-src="${item.image}" data-storeid="${item.brand_id}" data-title="${item.brandName}" data-cashback="${item.discount}" id="${item.brandName}" >
              <div class="d-flex align-items-center flex-column justify-content-center dod bg-white rounded-4" style="border-radius: 15px 15px 0 0 !important;">
              <img src="${item.image}" height="100%" class="rounded-4 h-100 py-2" style="max-width: -webkit-fill-available;" alt="Store Image">
              
              </div>
              <p class=" HOVER track-link text-center mb-0 small w-100"><text> ${item.brandName}</text></p>
              
                </div>
              
            </div>`;
                        } else {
                          return `
          <div class="col-5 col-md-4 col-xl-6">
              <div class="res-dod w-100 shadow d-flex flex-column rounded-4" >
            <div class="${item.title} col-12 show false local-deal" data-title="${item.title}">
              <a target="_blank" class="d-block" id="${item.title}" href="${item.url}">
                <img class="img-fluid dod" src="${item.imagePath}" style="border-radius: 15px 15px 0 0 !important;" >
              </a>
              <a class="${item.title} HOVER track-link small" id="${item.title}" target="_blank" href="${item.url}"><span></span>
            <text> ${item.title}</text>
          </a>
            </div></div></div>`;
                        }
                      }).join("");

                      $(".bigBrandz").append(cardHtml);
                      $(".big-deals").show();
                      
                      $(".local-deal").off("click").on("click", function (event) {
                        // event.preventDefault();
                        var title = $(this).data("title");

                        let userDataF = JSON.parse(localStorage.getItem("userDataF"));
                        gtag('event', 'webscrapped_click_web', {
                          'webscrapped_click_web_category': 'Link Click',
                          'webscrapped_click_label': `Product Name:${title}, User Details- ${userDataF.phoneNumber ? userDataF.phoneNumber : ""} ${userDataF.email ? userDataF.email : ""},Name:${userDataF.name}`,
                          'transport_type': 'beacon'
                        });
                      })
                      $(".big-b").off("click").on("click", function () {
                        var title = $(this).data("title");
                        var brandId = $(this).data("storeid");
                        var image = $(this).data("src");
                        var cashback = $(this).data("cashback");
                        let userDataF = JSON.parse(localStorage.getItem("userDataF"));
                        // var authToken = localStorage.getItem('authToken');
                        //debugger
                        gtag('event', 'webscrapped_click_web', {
                          'webscrapped_click_web_category': 'Link Click',
                          'webscrapped_click_label': `Product Name:${title} ${brandId}, User Details- ${userDataF.phoneNumber ? userDataF.phoneNumber : ""} ${userDataF.email ? userDataF.email : ""},Name:${userDataF.name}`,
                          'transport_type': 'beacon'
                        });
                        window.open(`brands_store_detail?storeId=${brandId}`, "_self");


                      });
                    } else {
                      let similarDeals = document.querySelector(".similar-deals");
                      similarDeals.style.setProperty("display", "none", "important");
                      console.error('Error: Data is not an array');
                    }
                  })
                  .catch(error => {
                    // Handle any errors
                    let similarDeals = document.querySelector(".similar-deals");
                    similarDeals.style.setProperty("display", "none", "important");
                    console.error('Error:', error);
                  });

                const myHeaders = new Headers();
                myHeaders.append("deal_name", storeData.data.brandName);

                const requestOptions = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow"
                };
                // webscrapped deals section //////----------------
                // fetch("https://flashweb.iweberp.com/api/get_deal_ML_Calc", requestOptions)
                fetch('https://flashweb.iweberp.com/api/subspace_aimlwebscrapped', requestOptions)
                  .then(response => response.json())
                  .then(data => {
                    // Handle the response data
                    if (Array.isArray(data.data)) {
                      var cardHtml = data.data.map(item => {
                        if (item.url && item.url.includes("https://genzdealz.ai/sayf_store_detail")) {
                          const newUrl = item.url.replace(
                            "https://genzdealz.ai/sayf_store_detail",
                            `${window.location.origin}/brands_store_detail`
                          );
                          item.url = newUrl;
                        }
                        if (Object.keys(item).length === 0 && item.constructor === Object) {
                          return '';
                        } else {
                          return `
                  <div class="col-5  col-md-4 col-xl-6">
                      <div class="d-flex bg-light res-dod w-100 shadow rounded-4">
                          <div class="${item['Gift title'] ? item['Gift title'] : ''} col-12 show false outer-container dod" data-comp="${item['Company Name'] ? item['Company Name'] : ''}" data-title="${item['Gift title'] ? item['Gift title'] : ''}">
                              <a target="_self" class="d-block position-relative image_wrap dod target-self" id="${item['Gift title'] ? item['Gift title'] : ''}" href="${item.url}">
                                  <img class="img-fluid dod inner-overlay" src="${item['Image URL'] ? item['Image URL'] : ''}" style="border-radius: 15px 15px !important;">
                                  <div class="grad dark_edge"></div>
                                  <div class="image_text_top rounded-2 px-2">
                                      ${item['Company Name'] ? item['Company Name'] : ''}
                                  </div>
                                  <div class="image_text">
                                      <span class="badge text-bg-danger mb-1" style="border-radius: 0px 12px;">${item['Numeric Discount'] ? item['Numeric Discount'] : ''}% Off</span>
                                      <p class="m-0 fw-bold">${item['Gift title'] ? item['Gift title'] : ''}</p>
                                  </div>
                              </a>
                          </div>
                      </div>
                  </div>`;
                        }
                      }).join("");

                      $(".aimlBrandz").append(cardHtml);
                      $(".aiml-deals").show();

                      $(".outer-container").off("click").on("click", function () {
                        var title = $(this).data("title");
                        var company = $(this).data("comp");
                        let userDataF = JSON.parse(localStorage.getItem("userDataF"));

                        gtag('event', 'webscrapped_click_web', {
                          'webscrapped_click_web_category': 'Link Click',
                          'webscrapped_click_label': `Product Name:${title}, Company Name:${company}, user Detail: ${userDataF.name} ${userDataF.email} ${userDataF.phoneNumber}`,
                          'transport_type': 'beacon'
                        });
                      });
                    } else {
                      console.error('Error: Data is not an array');
                      let aimlDeals = document.querySelector(".aiml-deals");
                      aimlDeals.style.setProperty("display", "none", "important");
                    }

                  })
                  .catch(error => {
                    // Handle any errors
                    let aimlDeals = document.querySelector(".aiml-deals");
                    aimlDeals.style.setProperty("display", "none", "important");
                    console.error('Error:', error);
                  });
                // Select all elements with the 'scroll' class
                const scrollElements = document.querySelectorAll(".scroll");
                scrollElements.forEach((scroll) => {
                  let isDown = false;
                  let scrollX;
                  let scrollLeft;

                  // Mouse Down Function
                  scroll.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    isDown = true;
                    scroll.classList.add("active");
                    scrollX = e.pageX - scroll.offsetLeft;
                    scrollLeft = scroll.scrollLeft;
                  });

                  // Mouse Move Function
                  scroll.addEventListener("mousemove", (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const element = e.pageX - scroll.offsetLeft;
                    const scrolling = (element - scrollX) * 2; // Adjust multiplier for scroll speed
                    scroll.scrollLeft = scrollLeft - scrolling;
                  });

                  // Mouse Up Function
                  scroll.addEventListener("mouseup", () => {
                    isDown = false;
                    scroll.classList.remove("active");
                  });

                  // Mouse Leave Function
                  scroll.addEventListener("mouseleave", () => {
                    isDown = false;
                    scroll.classList.remove("active");
                  });
                });
                // Submit the form Section /////////----------
                document.querySelector("#rupee").addEventListener("input", restrictToNumbers);
                function restrictToNumbers() {
                  const input = document.querySelector("#rupee");
                  if (!input) return false; // Exit if input is not found
                  input.value = input.value.replace(/\D/g, ""); // Remove any non-numeric characters
                  return true; // Validation passed
                }

                // Assuming you have a form element with the id "payForm"
                const payForm = document.getElementById("payForm");

                // Add an event listener for the form submission----
                payForm.addEventListener("submit", function (event) {
                  const billAmount = parseFloat($("#rupee").val());
                  // Prevent the default form submission
                  event.preventDefault();
                  // Retrieve the bill amount from the input field
                  const minPrice = parseFloat(storeData.data.flexipayMin);
                  const maxPrice = parseFloat(storeData.data.flexipayMax);
                  if (billAmount !== null && billAmount >= minPrice && billAmount <= maxPrice) {
                    // Log analytics event
                    // analytics.logEvent('brand_detail_click', {
                    //   buy_button_click: `${brandData.brandName}, userDetails: ${userNameForScreen.value}, ${userPhoneNumberForScreen.value}`
                    // });
                    handlePayment();
                  } else {
                    // $(".toast").toast('show');
                    // $(".toast-msg").text(`Please enter amount between ₹${minPrice} & ₹${maxPrice}`);
                    showToast(`Please enter amount between ₹${minPrice} & ₹${maxPrice}`, true);
                    // Show error message
                  }
                });


                // Make the function globally accessible by attaching it to the `window` object
                window.purchaseProduct = function (productId, price, discountedPrice) {
                  // console.log(`Purchasing product with ID: ${productId} for ₹${price} and disc ${discountedPrice}`);
                  // Implement the purchase functionality here
                  handlePayment(productId, price, discountedPrice);
                };


                // Function to handle the form submission ////----------------

                function handlePayment(productId, price, discountedPrice) {
                  // console.log(productId)
                  // debugger
                  const billAmount = parseFloat($("#rupee").val());
                  $(".loader").addClass("d-block");
                  $(".loader").removeClass("d-none");
                  $(".text-buy").removeClass("d-block");
                  $(".text-buy").addClass("d-none");

                  // discountedPrice section -----
                  const amount = parseInt(billAmount, 10);
                  let formattedOrderAmount; // Declare formattedOrderAmount globally

                  async function calculateOrder() {
                    let discountPercentage = (cashback || 0) * 1;
                    let billAmountValue = amount;
                    function roundToTwo(num) {
                      return (Math.round(num * 100) / 100).toFixed(2);
                    }
                    // Calculate the discounted amount
                    let discountedAmount =
                      billAmountValue - (billAmountValue * discountPercentage) / 100;
                      const orderAmount = roundToTwo(discountedAmount);

                    // Format the amount to 2 decimal places
                    formattedOrderAmount = orderAmount; // Always show 2 decimal places
                  }

                  // Call the function and use the resolved value
                  calculateOrder().then(() => {
                    // console.log("Formatted Order Amount:", formattedOrderAmount);
                  });


                  // Retrieve the authToken from local storage
                  // const authToken = localStorage.getItem("authToken");

                  // Check if the authToken is available
                  // if (!authToken) {
                  //   console.error("Authentication token not available");
                  //   // Optionally, handle the absence of the token and inform the user
                  //   return false; // Return false to prevent form submission
                  // }
                  // Retrieve user data from local storage
                  const userDataString =
                    localStorage.getItem("userDataF");

                  if (!userDataString) {
                    console.error("User data not available in local storage");
                    // Optionally, handle the absence of user data and inform the user
                    return false; // Return false to prevent form submission
                  }

                  // Parse user data from the string
                  const userData = JSON.parse(userDataString);


                  // State mapping section //////------
                  const stateMapping = {
                    "Andaman and Nicobar Islands": "AN",
                    "Andhra Pradesh": "AP",
                    "Arunachal Pradesh": "AR",
                    "Assam": "AS",
                    "Bihar": "BR",
                    "Chandigarh": "CH",
                    "Chhattisgarh": "CT",
                    "Dadra and Nagar Haveli": "DN",
                    "Daman and Diu": "DD",
                    "Delhi": "DL",
                    "Goa": "GA",
                    "Gujarat": "GJ",
                    "Haryana": "HR",
                    "Himachal Pradesh": "HP",
                    "Jammu and Kashmir": "JK",
                    "Jharkhand": "JH",
                    "Karnataka": "KA",
                    "Kerala": "KL",
                    "Ladakh": "LA",
                    "Lakshadweep": "LD",
                    "Madhya Pradesh": "MP",
                    "Maharashtra": "MH",
                    "Manipur": "MN",
                    "Meghalaya": "ML",
                    "Mizoram": "MZ",
                    "Nagaland": "NL",
                    "Odisha": "OR",
                    "Puducherry": "PY",
                    "Punjab": "PB",
                    "Rajasthan": "RJ",
                    "Sikkim": "SK",
                    "Tamil Nadu": "TN",
                    "Telangana": "TG",
                    "Tripura": "TR",
                    "Uttar Pradesh": "UP",
                    "Uttarakhand": "UK",
                    "West Bengal": "WB",
                    // Add more state mappings as needed
                  };
                  let state;
                  const stateValue = stateMapping[userData?.state] || userData.state;

                  // Check if stateValue is defined and not empty
                  if (stateValue && stateValue.length > 2) {
                    state = stateValue.split(" ")[1].replace(/\(|\)/g, "");
                    // checkUserAuthStatus()
                  }

                  // Assuming userData is already retrieved from local storage
                  const name = userData?.name;
                  // Function to extract the first and last words from a string
                  function getFirstAndLastWords(fullName) {
                    const words = fullName.split(/\s+/);
                    const firstWord = words[0] || "DefaultFirst";
                    const lastWord = words[words.length - 1] || "DefaultLast";
                    return { firstWord, lastWord };
                  }

                  // Use the chosen userData for first_name and last_name
                  const { firstWord, lastWord } = name
                    ? getFirstAndLastWords(name)
                    : { firstWord: "DefaultFirst", lastWord: "DefaultLast" };

                  let gender = (userData?.gender || userData.gender)?.toUpperCase();

                  // Conditions to check users phone number is verified or not ////------
                  // Check if userData has phoneNumber and verified
                  if (userData && userData.phoneNumber && userData.phoneVerified === true) {
                    // console.log("User has a phone number and verified:", userData.phoneNumber);
                    //debugger
                    proceed();
                  } else if (userData && userData.phoneNumber) {
                    // console.log("User has a phone number but it's not verified.");
                    $('#otpModal').modal('show');
                    $("#verifyOtp").show();

                    const input = document.querySelector("#number");
                    input.value = userData.phoneNumber; // Set input value from userData.phoneNumber
                    function restrictToNumbers() {
                      if (!input) return false; // Exit if input is not found
                      input.value = input.value.replace(/\D/g, ""); // Remove any non-numeric characters
                      return true; // Validation passed
                    }
                    input.addEventListener("input", restrictToNumbers);
                    //debugger
                    sendVerificationCode();
                    // You might want to handle this case differently, like prompting the user to verify their phone number again.
                  } else {
                    // console.log("User does not have a phone number.");
                    $('#otpModal').modal('show');
                    $("#verifyOtp").show();
                    const input = document.querySelector("#number");
                    function restrictToNumbers() {
                      if (!input) return false; // Exit if input is not found
                      input.value = input.value.replace(/\D/g, ""); // Remove any non-numeric characters
                      return true; // Validation passed
                    }
                    input.addEventListener("input", restrictToNumbers);
                    //debugger
                    sendVerificationCode()
                  }

                  // Check in firebase mobile verified code section ///////-------
                  const verifyOtp = document.querySelector("#verifyOtp");
                  async function handleVerification() {
                    // Your asynchronous logic here
                    const userId = localStorage.getItem("userId");
                    const userDocRef = doc(db, "usersCollection", userId);
                    const userDocSnapshot = await getDoc(userDocRef);
                    setDoc(userDocRef, {
                      phoneNumber: number.value,
                    }, { merge: true });
                    $("#verifyOtp").text("Saving...");
                    if (userDocSnapshot.exists()) {
                      const userData = userDocSnapshot.data();
                      // Retrieve the userDataF from localStorage
                      let userDataF = JSON.parse(localStorage.getItem("userDataF"));

                      // Check if userDataF exists in localStorage
                      if (userDataF) {
                        // Update the phone number and phone verification status
                        userDataF.phoneNumber = number.value;

                        // Store the updated userDataF back into localStorage
                        localStorage.setItem("userDataF", JSON.stringify(userDataF));
                        setTimeout(function () {
                          $("#otpModal").modal("hide");
                          // $("#otpModal").modal("hide");
                          // window.location.reload();
                        }, 2000);
                      } else {
                        console.error("userDataF not found in localStorage.");
                      }
                    }

                  }
                  $("#verifyOtp").text("Save");
                  verifyOtp.addEventListener('click', async () => {
                    await handleVerification();
                  });

                  // OTP sending code ////---------
                  function sendVerificationCode() {
                    setTimeout(function () {
                      $(".loader").addClass("d-none");
                      $(".loader").removeClass("d-block");
                      $(".text-buy").removeClass("d-none");
                      $(".text-buy").addClass("d-block");
                    }, 1000);
                    // const auth = getAuth(app);
                    auth.useDeviceLanguage();
                    // Set app verification disabled for testing
                    // auth.settings.appVerificationDisabledForTesting = true;
                    const sendOtpFunc = async () => {
                      try {
                        const sendOtp = document.querySelector("#sendOtp");
                        sendOtp.setAttribute("disabled", "disabled");
                        $(".otp-loader").show();
                        const input = document.querySelector("#number").value;
                        // If phone number is not registered, send OTP using Firebase phone authentication
                        let number = input
                        function getPhoneNumberFromUserInput() {
                          // retrieve the phone number from your HTML input element
                          return "+91" + number;
                        }
                        const phoneNumber = getPhoneNumberFromUserInput();

                        // Check if phoneNumber is valid
                        if (!phoneNumber) {
                          // console.error("Invalid phone number");
                          // $(".toast").toast('show');
                          // $(".toast-msg").text("Invalid phone number");
                          showToast("Invalid phone number", true);
                          return;
                        }
                        // recaptcha code /////
                        function recaptchaVerifierFunc() {
                          // Create a RecaptchaVerifier object with invisible size
                          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                            'size': 'invisible',
                            'callback': (response) => {
                              // reCAPTCHA solved, allow signInWithPhoneNumber.
                              // handleSignInWithPhoneNumber()
                            },
                            'expired-callback': () => {
                              // $(".toast").toast('show');
                              // $(".toast-msg").text("Verification code is expired");
                              showToast("Verification code is expired", true);
                              recaptchaVerifierFunc()
                              return
                              // Reinitialize reCAPTCHA
                              // initializeRecaptcha();
                            }

                          });
                        }
                        recaptchaVerifierFunc();
                        try {
                          // Request Firebase to send verification code to user's phone
                          const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
                          // Handle error while sending OTP
                          $(".otp-field").show();

                          $(".otp-loader").hide();
                          // $(".toast").toast('show');
                          // $(".toast-msg").text("Verification code sent successfully!");
showToast("Verification code sent successfully!", false);
                          const otpInput = document.getElementById('otpInput');
                          otpInput.addEventListener('input', function () {
                            if (this.value.length === 6) {
                              submit();
                            } else {
                              $(".otp-success").hide();
                              $(".otp-error").hide();
                              $(".error-text").text("")
                            }
                          });

                          otpInput.addEventListener('keypress', function (event) {
                            $(".otp-success").hide();
                            $(".otp-error").hide();
                            $(".error-text").text("")
                            if (event.key && !/\d/.test(event.key)) {

                              event.preventDefault();
                            }
                          });
                          let otp;
                          function submit() {
                            otp = otpInput.value;
                            $(".otp-loader").show();
                            // $(".otp-field").hide();
                            $(".otp-success").hide();
                            $(".otp-error").hide();
                            $(".error-text").text("")
                            handleVerification()
                          }
                          // Set up event listener to confirm the code when the button is clicked
                          async function handleVerification() {
                            // submit()
                            try {
                              const verificationCodeInput = otp;
                              let confirmationSuccess = false;
                              // Confirm the verification code
                              await confirmationResult.confirm(verificationCodeInput);
                              // The verification code is confirmed successfully
                              confirmationSuccess = true;
                              // $(".toast").toast('show');
                              // $(".toast-msg").text("Verification code confirmed successfully!");
                              showToast("Verification code confirmed successfully!", false);
                              if (confirmationSuccess) {
                                $("#sendOtp").text("Verified").prop('disabled', true);
                                $(".otp-loader").hide();
                                $(".otp-field").show();
                                $(".otp-success").show();
                                $(".otp-error").hide();
                                $(".error-text").text("")

                                // update in firebase user data //////--------
                                async function updateUserData() {
                                  const userId = localStorage.getItem("userId");
                                  const userDocRef = doc(db, "usersCollection", userId);
                                  const userDocSnapshot = await getDoc(userDocRef);
                                  try {
                                    // Update Firestore document
                                    await setDoc(userDocRef, {
                                      phoneNumber: number,
                                      phoneVerified: true,
                                    }, { merge: true });

                                    // Check if the document exists
                                    if (userDocSnapshot.exists()) {
                                      const userData = userDocSnapshot.data();
                                      // Retrieve the userDataF from localStorage
                                      let userDataF = JSON.parse(localStorage.getItem("userDataF"));

                                      // Check if userDataF exists in localStorage
                                      if (userDataF) {
                                        // Update the phone number and phone verification status
                                        userDataF.phoneNumber = number;
                                        userDataF.phoneVerified = true; // or false, depending on the verification status

                                        // Store the updated userDataF back into localStorage
                                        localStorage.setItem("userDataF", JSON.stringify(userDataF));
                                        $("#otpModal").modal("hide");
                                        proceed();
                                      } else {
                                        console.error("userDataF not found in localStorage.");
                                      }
                                    } else {
                                      console.error("User document does not exist.");
                                    }
                                  } catch (error) {
                                    console.error("Error updating user data:", error);
                                  }
                                }
                                // Call the function
                                updateUserData();
                              }
                              // Clear input fields
                              // inputs.forEach((input) => {
                              //   input.value = "";
                              // });
                              // $("#otpModal").modal("hide");
                            } catch (error) {
                              if (error == "FirebaseError: Firebase: Error (auth/invalid-verification-code).") {
                                $(".otp-loader").hide();
                                $(".otp-field").show();
                                $(".otp-error").show();
                                $(".otp-success").hide();
                                $(".error-text").text("Invalid OTP. Please enter a valid OTP")
                              }
                              console.error("Error confirming verification code:", error);
                            }
                          };

                        } catch (error) {
                          $(".loader").hide();
                          $(".text-signup").show();
                          console.error(`Error sending verification code: ${error}`);
                          if (error == "TypeError: Cannot read properties of undefined (reading 'verify')") {
                            // $(".toast").toast('show');
                            // $(".toast-msg").text(`OTP sending on ${number}`);
                            showToast("Error sending verification code!", true);
                            recaptchaVerifierFunc();
                          }
                          if (error == "Error: reCAPTCHA has already been rendered in this element") {
                            //   $(".toast").toast('show');
                            // $(".toast-body").text(`reCAPTCHA has already been rendered in this element refreshing the page`);
                            showToast(`reCAPTCHA has already been rendered in this element please refresh the page`, true);
                            setTimeout(function () {
                              // $("#otpModal").modal("hide");
                              recaptchaVerifierFunc();
                              // window.location.reload();
                            }, 5000);
                          }
                          if (error == "FirebaseError: Firebase: Error (auth/too-many-requests).") {
                            // $(".toast").toast('show');
                            // $(".toast-msg").text(`Too many requests Please try again Later.`);
                            showToast(`Too many requests Please try again Later.`, true);
                            $("#otpModal").modal("hide");
                            setTimeout(function () {
                              window.location.reload();
                            }, 5000);
                          }
                          // return
                        }
                        // console.log(window.recaptchaVerifier)
                      } catch (error) {
                        console.log(error)
                      }
                    }
                    const sendOtp = document.querySelector("#sendOtp");
                    sendOtp.removeAttribute("disabled");
                    sendOtp.addEventListener('click', sendOtpFunc);
                  }

                  // Proceed with all the user data to signup for cashfree gateway //////////---------
                  async function proceed() {
                    $(".loader").addClass("d-block").removeClass("d-none");
                    $(".text-buy").removeClass("d-block").addClass("d-none");

                    const userDataString = localStorage.getItem("userDataF");
                    if (!userDataString) {
                      console.error("User data not available in local storage");
                      return Promise.reject("User data not available in local storage");
                    }

                    const userData = JSON.parse(userDataString);
                    let mobileNumber = userData?.number || userData.mobile_no || userData.phoneNumber || number || phoneNumber;
                    let fName = userData?.first_name || firstWord;
                    let lName = userData?.last_name || lastWord;
                    const email = userData?.email || userData.email_id || "";

                    try {
                      $("#overlay").hide();
                      // Get Order ID
                      const response = await fetch(`https://flashweb.iweberp.com/api/gen_order_id?mobile_no=${mobileNumber}`);
                      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                      const data = await response.json();
                      const orderId = data.order_id;
                      const baseURL = window.location.origin;

                      const finalPrice = (offerData?.min_order_value ?? 0) <= (amount ?? 0)
                        ? (formattedOrderAmount ?? 0) - (offerData?.giftcard_flat_off ?? 0)
                        : (formattedOrderAmount ?? 0);

                      const finalPrice2 = (offerData?.min_order_value ?? 0) <= (price ?? 0)
                        ? (discountedPrice ?? 0) - (offerData?.giftcard_flat_off ?? 0)
                        : (discountedPrice ?? 0);

                      const orderAmountFinal = !isNaN(finalPrice) ? finalPrice : finalPrice2;
                      const brandId = (productId) ? productId : storeId;
                      const isFlexi = (productId) ? 0 : 1;
                      // proceedWithOrder(orderAmountFinal, brandId, isFlexi, orderId, mobileNumber, fName, lName, baseURL, userData);
                      // console.log(orderAmountFinal);
                      // debugger
                      // Show discount modal
                      const discountModal = new bootstrap.Modal(document.getElementById("discountModal"));
                      const confirmDiscountBtn = document.getElementById("confirmDiscount");
                      const skipDiscountBtn = document.getElementById("skipDiscount");
                      const discountCodeInput = document.getElementById("discountCode");
                      const discountError = document.getElementById("discountError");
                      
                      discountModal.show();
                      discountError.textContent = `Current amount to be paid is ₹${orderAmountFinal}.`;
                      discountError.style.display = "block";
                      discountError.style.color = "green";
                      discountCodeInput?.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          confirmDiscountBtn?.click();
                        }
                      });
                      confirmDiscountBtn.onclick = async function () {
                          $("#overlay").show();
                          const discountCode = discountCodeInput.value.trim().toUpperCase();
                          if (!discountCode) {
                              discountError.textContent = "Please enter a coupon code!";
                              discountError.style.display = "block";
                              discountError.style.color = "red";
                              $("#overlay").hide();
                              return;
                          }

                          try {
                            const brndName = storeData.data.brandName;
                              const response = await fetch("https://flashweb.iweberp.com/api/genwin_check_coupon", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                      UID: userId,
                                      CODE: discountCode,
                                      Min_Order_Value: parseFloat(amount || price),
                                      MODE: "GIFT_CARD",
                                      MODE_DETAILS: brndName,
                                  }),
                              });

                              const data = await response.json();

                              if (data.message === "Coupon code applied" && data.already_purchased === false) {
                                  const newOrderAmount = parseFloat(Number(orderAmountFinal - data.flat_off).toFixed(2));
                                  discountError.textContent = data.message;
                                  discountError.style.color = "green";
                                  $("#overlay").hide();
                                  // debugger
                                    setTimeout(function () {
                                        discountModal.hide();
                                    }, 3000);
                                    
                                    await proceedWithOrder(newOrderAmount, brandId, isFlexi, orderId, mobileNumber, fName, lName, baseURL, userData, discountCode);
                              }else if (data.already_purchased === true) {
                                  $("#overlay").hide();
                                  discountError.textContent = data.message;
                                  discountError.style.color = "red";
                              }else if (data.error) {
                                $("#overlay").hide();
                                discountError.textContent = data.error;
                                discountError.style.color = "red";
                              }
                          } catch (error) {
                            console.error("Error:", error);
                            $("#overlay").hide();
                            discountError.textContent = "Error validating coupon!";
                            discountError.style.display = "block";
                            discountError.style.color = "red";
                        }
                      };

                      skipDiscountBtn.onclick = async function () {
                        await proceedWithOrder(orderAmountFinal, brandId, isFlexi, orderId, mobileNumber, fName, lName, baseURL, userData,"");
                        // Close the modal after proceeding with the order
                        setTimeout(function () {
                          discountModal.hide();
                      }, 3000);
                          // await proceedWithOrder(orderAmountFinal,brandId, orderId, mobileNumber, fName, lName, baseURL, userData);
                      };

                    } catch (error) {
                      // console.error("Error:", error);
                      // $(".toast").toast("show");
                      // $(".toast-msg").text(`Error occurred: ${error.message}`);
                      showToast(`Error occurred: ${error.message}`, true);
                      // console.error("Error occurred:", error.message);
                    }
                  }

                  async function proceedWithOrder(orderAmountFinal, brandId, isFlexi, orderId, mobileNumber, fName, lName, baseURL, userData,discountCode) {
                    try {
                      function replaceSpacesWithUnderscores(str) {
                        return str.replace(/ /g, "_");
                      }

                      const brndName = replaceSpacesWithUnderscores(storeData?.data?.brandName || "");

                      // Cashfree Order API
                      const myHeaders = new Headers({
                        order_id: orderId,
                        order_amount: orderAmountFinal.toString(),
                        order_currency: "INR",
                        customer_id: userId,
                        customer_email: userData.email || userData.email_id,
                        customer_phone: mobileNumber,
                        customer_name: `${fName} ${lName}`,
                        return_url: `${baseURL}/payment?order_id=${encodeURIComponent(orderId)}&storeId=${encodeURIComponent(storeId)}&image=${encodeURIComponent(image)}&horizontalImage=${encodeURIComponent(horizontalImage)}&brandName=${encodeURIComponent(brndName)}`,
                        brand_id: brandId,
                        txn_type: "0",
                        txn_sub_type: isFlexi.toString(),
                        coupon_code: discountCode || "",
                      });
                      const response = await fetch("https://flashweb.iweberp.com/api/createpayorder", {
                        method: "POST",
                        headers: myHeaders,
                        redirect: "follow",
                      });

                      if (!response.ok) {
                        const errorDetails = await response.json().catch(() => ({}));
                        const errorMessage = errorDetails?.errorMsg || response.statusText || `HTTP error! Status: ${response.status}`;

                        if (errorMessage.includes("ensure this value is greater than or equal to 1")) {
                          // $(".toast").toast("show");
                          // $(".toast-msg").text("Discounted amount should be greater than or equal to 1.");
                          showToast("Discounted amount should be greater than or equal to 1.", true);
                          setTimeout(() => window.location.reload(), 5000);
                        } else {
                          throw new Error(errorMessage);
                        }
                      }

                      const responseData = await response.json();

                      if (typeof gtag === "function") {
                        gtag('event', 'sayf_buy_click_web', {
                          sayf_buy_click_web_category: 'Link Click',
                          sayf_buy_click_label: `Product Name:${storeData.data.brandName}, User: ${mobileNumber || ""} ${userData.email || ""}, Name: ${userData.name}`,
                          transport_type: 'beacon',
                        });
                      }
                      // Redirect to payment gateway
                      cashfree.checkout({ paymentSessionId: responseData.payment_session_id, redirectTarget: "_self" });

                      setTimeout(() => {
                        $(".loader").removeClass("d-block").addClass("d-none");
                        $(".text-buy").addClass("d-block").removeClass("d-none");
                      }, 200);
                    } catch (error) {
                      // console.error("Error occurred:", error.message);
                      // $(".toast").toast("show");
                      // $(".toast-msg").text(`Error occurred: ${error.message}`);
                      showToast(`Error occurred: ${error.message}`, true);
                      // console.error("Error occurred:", error.message);
                    }
                  }


                }
              })
              .catch(function (error) {
                console.error("Error:", error);
                $(".toast").toast("show");
                      showToast(`Error occurred: ${error.message}`, true);
                // Additional error handling if needed
              });
            }
            })();
        }
        updateBrandDetails(storeId);
      })
      .catch((error) => {
        $(".placeholder-col").fadeOut();
        showToast(`Error occurred: ${error.message}`, true);
        isLoading = false;
      });

  }
}



// Check scroll for .left-section instead of window
function checkScroll() {
  const leftSection = $(".left-section");
  if (leftSection.scrollTop() + leftSection.innerHeight() >= leftSection[0].scrollHeight - 100) {
    loadData(); // Load more data when near bottom
  }
}



function waitForSearchInput() {
  const targetNode = document.querySelector("#stores");

  if (targetNode) {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.addedNodes.length && $("#searchInput").length > 0) {
          // console.log("✅ Search Input Detected!");
          bindSearchInput();
          observer.disconnect();
          break;
        }
      }
    });

    observer.observe(targetNode, { childList: true, subtree: true });
  } else {
    console.error("#stores not found. Check HTML injection.");
  }
}

function bindSearchInput() {
  $(document).off("input", "#searchInput");
  $(document).off("click", ".clear-text");

  $(document).on("input", "#searchInput", debounce(function () {
    const value = $(this).val().toLowerCase();
    $(".placeholder-col").fadeIn();
    $("#appendData").empty();
    currentPage = 1;
    allDataLoaded = false;

    loadData(value);
  }, 300));

  $(document).on("click", ".clear-text", function () {
    $(this).closest(".input-wrapper").find("input").val("");
        $(".placeholder-col").fadeIn();
        $("#appendData").empty();
        currentPage = 1;
        allDataLoaded = false;
        loadData("");
  });
  
  
}


$(document).ready(function () {
  // Use .left-section scroll instead of window scroll
  $(".left-section").scroll(throttle(checkScroll, 200));
  loadData();
  
});


// Responsive image height adjustment
function cardImgRatio() {
  // Responsive image height adjustment
  if (window.innerWidth < 992) {
    const aimlImg = $(".dod");
  if (aimlImg.length) {
    aimlImg.each(function () {
      const aimlImageWidth = $(this).width();
      const height = (aimlImageWidth * 2) / 3.5;
      $(this).height(height);
    });
  }
  } else {
    const aimlImg = $(".dod");
  if (aimlImg.length) {
    aimlImg.each(function () {
      const aimlImageWidth = $(this).width();
      const height = (aimlImageWidth * 2) / 3.2;
      $(this).height(height);
    });
  }
  }
}

// Run on initial load
cardImgRatio();

// Observe DOM changes
const observer = new MutationObserver(() => {
  cardImgRatio();
});

// Observe the entire body or a specific container where images might be added dynamically
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Also trigger on window resize to adjust image ratios dynamically
$(window).resize(function () {
  cardImgRatio();
});

document.getElementById('discountModal').addEventListener('hidden.bs.modal', function () {
  document.getElementById('discountCode').value = '';
});




// setInterval(() => {
//   if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
//     document.body.innerHTML = "DevTools are disabled!";
//   }
// }, 1000);




