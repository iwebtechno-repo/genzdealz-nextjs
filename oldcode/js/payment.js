document.cookie = "myCookie=myValue; SameSite=Lax";
$(".footer, main").hide();

function getMobileOperatingSystem() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/windows phone/i.test(userAgent)) return "Windows Phone";
  if (/android/i.test(userAgent)) { $("#iosApp").hide(); return "Android"; }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) { $("#androidApp").hide(); return "iOS"; }
  return "unknown";
}

let mobileOS = getMobileOperatingSystem();

const urlParams = new URLSearchParams(window.location.search);
// const code = urlParams.get('code');
const orderId = urlParams.get('order_id');
// const productId = urlParams.get('productId');
// const billAmount = urlParams.get('billAmount');
const brndName = urlParams.get('brandName');
const image = urlParams.get('image');
const horizontalImage = urlParams.get('horizontalImage');
// const encodedImage = encodeURIComponent(image);
const storeId = urlParams.get("storeId");
const cashback = urlParams.get("cashback");
const baseURL = window.location.origin;
// const brandName = brndName;
function replaceUnderscoresWithSpaces(str) {
  return str.replace(/_/g, " ");
}

// Example usage:
let inputString = brndName;
let brandName = replaceUnderscoresWithSpaces(inputString);
// Retrieve the authToken from local storage
// const authToken = localStorage.getItem("authToken");
// Check if the authToken is available
// if (!authToken) {
//   console.error("Authentication token not available");
//   // Optionally, handle the absence of the token and inform the user
// }
// Retrieve user data from local storage
const userId = localStorage.getItem("userId");
const userDataString =
  localStorage.getItem("userDataF") ||
  localStorage.getItem("userDataA");

if (!userDataString) {
  console.error("User data not available in local storage");
  // Optionally, handle the absence of user data and inform the user
}

// Parse user data from the string
const userData = JSON.parse(userDataString);
const mobileNumber =
  userData?.number || userData.mobile_no || userData.phoneNumber; // Replace with your mobile number or get it dynamically


// Check if there's an order ID in the URL
if (orderId) {
  const storedOrderId = localStorage.getItem('initialOrderId');

  if (storedOrderId) {
    // Compare the current order ID with the stored one
    if (storedOrderId === orderId) {
      // console.log("Same order ID exists:", orderId);
      window.open(`${baseURL}/giftcards`, "_self");
    } else {
      localStorage.setItem('initialOrderId', orderId);
      // console.log("Order ID has changed.");
      proceedWithoutOrderId();
    }
  } else {
    // Store the initial order ID
    localStorage.setItem('initialOrderId', orderId);
    // console.log("Initial order ID stored:", orderId);
    proceedWithoutOrderId();
  }
} else {
  // console.log("No order ID found in the URL.");
}


function proceedWithoutOrderId() {
  // console.log("The page was not refreshed.");
  const myHeaders0 = new Headers();
  myHeaders0.append("order_id", orderId);


  const requestOptions = {
    method: "GET",
    headers: myHeaders0,
    redirect: "follow"
  };

  fetch("https://flashweb.iweberp.com/api/getCashfreePaymentByOrder", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
      return response.json();
    })
    .then((result) => {
      // console.log(result[0]);
      if (Array.isArray(result) && result.length > 0) {
      localStorage.setItem("pgStatus", JSON.stringify(result[0]));
      if (result[0].payment_status === "SUCCESS") {
        // console.log(result[0].payment_status)
        const myHeaders = new Headers();
        myHeaders.append("order_id", orderId);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow"
        };

        fetch("https://flashweb.iweberp.com/api/purchaseGiftCard", requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response}`);
            }
            return response.json();
          })
          .then((result) => {
            if (!result) return;
            let response = result;


            // Check for success === false
            if (response.success === false && response.data?.message && response.data?.amountRequired) {

              $(".footer").show();
                    $("#overlay").hide();
              const message = response.data.message;
              const hasWalletError = message.toLowerCase().includes('wallet');

              const modalHTML = `
                <div class="shadow rounded-4 p-4 bg-white" style="max-width:400px;margin:auto;text-align:center;">
                  <h2 class="fw-bold text-danger">Technical Error</h2>
                  <p class="text-third fw-semibold" style="font-size:16px;">
                    ${hasWalletError
                          ? `${message}<br><br>It seems there's an issue with our wallet. Please contact us at 9322655704 for immediate help.`
                          : `${message}<br><br>Don't worry! We'll refund your money. Please call us at 1800-8890-695 for support.`}
                  </p>
                  <button onclick="redirect()" class="btn btn-prim fw-bold px-3">OK</button>
                </div>
              `;

              const modalContainer = document.createElement('div');
              modalContainer.classList.add("error-modal");
              modalContainer.innerHTML = modalHTML;

              document.body.appendChild(modalContainer);
              window.redirect = function () {
                window.open(`${baseURL}/brands_store_detail?storeId=${storeId}`, "_self");
              }
              return;
            }
            // console.log(response)
            let maxRetries = 20;
            let retryCount = 0;
            const paymentId = response.data.coupon_allocation_id;

            function makeSecondRequest() {
              if (retryCount >= maxRetries) {
                    $(".footer").show();
                    $("#overlay").hide();
                const modalHTML = `
                  <div class="shadow rounded-4 p-4 bg-white" style="max-width:400px;margin:auto;text-align:center;">
                    <h2 class="fw-bold text-danger">Technical Error</h2>
                    <p class="text-third fw-semibold" style="font-size:16px;">
                          It seems there's an issue with giftcard. Please check my giftcard or call us at 1800-8890-695 for support.
                    </p>
                    <button onclick="redirect()" class="btn btn-prim fw-bold px-3">OK</button>
                  </div>
                `;

                const modalContainer = document.createElement('div');
                modalContainer.classList.add("error-modal");
                modalContainer.innerHTML = modalHTML;

                document.body.appendChild(modalContainer);
                window.redirect = function () {
                  window.open(`${baseURL}/giftcards`, "_self");
                }
                return;
              }
              const requestOptions = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  'coupon_allocation_id': paymentId,
                  'mobile_no': `${mobileNumber}`
                   
                },
                redirect: "follow"
              };

              // fetch("https://flashweb.iweberp.com/api/genz_order_check", requestOptions)
              fetch(`https://flashweb.iweberp.com/api/getOrderStatus`, requestOptions)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
                })
                .then((responseData) => {
                  // Check if responseData and responseData.data exist
                  if (responseData && responseData.data) {
                    let data = responseData.data;
                    // console.log(data);
                    if (data.deliveryStatus !== "Done") {
                      // If still processing, retry after 15 seconds
                      retryCount++;
                      setTimeout(makeSecondRequest, 3000);
                    }
                    // Processing completed, handle the completed status
                    let sampleData = data;
                    // console.log(sampleData)
                    let pin = sampleData.pin;
                    const expiryDate = sampleData.expiringAt;

                    // Parse the ISO 8601 timestamp
                    let dynamicDateString = sampleData.createdAt;

                    // Ensure compatibility by removing extra fractional seconds if necessary
                    let cleanedDateString = dynamicDateString.replace(/\.\d{4,}/, '');

                    // Convert the cleaned date string to a Date object
                    let dynamicDate = new Date(cleanedDateString);

                    // Adjust for local timezone if necessary
                    let localDate = new Date(dynamicDate.getTime());

                    // Extract and format parts of the date
                    let hours = localDate.getHours() % 12 || 12;
                    let minutes = localDate.getMinutes().toString().padStart(2, "0");
                    let ampm = localDate.getHours() >= 12 ? 'PM' : 'AM';
                    let day = localDate.getDate().toString().padStart(2, "0");
                    let month = (localDate.getMonth() + 1).toString().padStart(2, "0");
                    let year = localDate.getFullYear();

                    // Custom formatted date
                    let customFormattedDate = `${day}-${month}-${year} • ${hours}:${minutes} ${ampm}`;
                    // console.log(customFormattedDate);
                    // Get the reference to the "appendData" container
                    let appendDataContainer = document.getElementById("appendData");
                    // Create card element
                    let cardElement = document.createElement("div");
                    cardElement.classList.add("success-card");
                    cardElement.innerHTML = `
                    <div class="">
                    <div class="row">
                        <div class="col-12 text-center pb-4">
                            <div class="d-flex justify-content-md-center align-items-center">
                                <img src="${image}" class="rounded-circle shadow me-3" style="width: 50px; height:50px;" alt="">
                                <h4 class="fw-bold" style="color:#1D2F47;">${sampleData.brandName}</h4>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 d-none d-md-block">
                          <div class="h-100">
                            <img src="${horizontalImage}" class="rounded-4 h-100" style="width: -webkit-fill-available; object-fit:cover;" alt="">
                           </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div>
                            <h1 class="card-title fw-bold">₹ ${sampleData.price}</h1>
                            <div class="mb-3 position-relative">
                                <p class="card-text mb-1">Card Number</p>
                                <input type="text" class="form-control" style="color:#4d47c3;" disabled id="cardNumberInput" value="${sampleData.coupon}" placeholder="${sampleData.coupon}">
                                <i class="fas fa-copy position-absolute" style="top: 60%; right: 18px; cursor: pointer;color:#4d47c3;" onclick="copyToClipboard('cardNumberInput')"></i>
                            </div>
                            <div class="mb-0 position-relative pin-container mb-4">
                                <p class="card-text mb-1">Card Pin</p>
                                <input type="text" class="form-control" style="color:#4d47c3;" disabled id="cardPinInput" value="${pin}" placeholder="${pin}">
                                <i class="fas fa-copy position-absolute" style="top: 60%; right: 18px; cursor: pointer;color:#4d47c3;" onclick="copyToClipboard('cardPinInput')"></i>
                            </div>
                            <div>
                                <a href="./giftcards" class="btn btn-prim w-100">View My Giftcards</a>
                            </div>
                                    <div class="px-3 px-md-0 mt-4">
                                      <button type="button" id="share-btn" class="btn shadow d-none rounded-5 border-0 text-white mx-auto d-flex d-lg-none align-items-center w-100 py-2"  style="background: #000000;">
                                      <span class="text-buy text-b fw-bold d-flex m-auto"><i class="fa-solid fa-share-nodes fs-4 me-3"></i> Share Gift Card</span></button>
                                      <div class="dropdown-center position-relative d-none d-lg-none w-75 mx-auto">
                                        <a class="nav-link dropdown-toggle btn shadow w-100 rounded-5 border-0 text-white mb-0 mt-0 mx-auto d-flex py-2 justify-content-center align-items-center"  style="background: #000000;" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                          <span class="text-buy text-b fw-bold d-flex m-auto"><i class="fa-solid fa-share-nodes fs-4 me-3"></i> Share Gift Card</span>
                                        </a>
                                        <div class="dropdown-menu drop-animate bg-white px-1 py-1 shadow w-100">
                                          <div class="d-flex p-2 py-1 align-items-center w-100 justify-content-evenly">
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
                `;

                    // Append the card to the container
                    appendDataContainer.innerHTML = ""; // Clear previous content
                    appendDataContainer.appendChild(cardElement);
                    $(".footer, .main").show();
                                            $("#overlay").hide();
                    
                    if (pin === null || pin === undefined || pin === "") {
                      const pinInput = cardElement.querySelector("#cardPinInput");
                      if (pinInput) {
                        pinInput.value = "******";
                        pinInput.placeholder = "******";
                      }
                    }

                    document.getElementById('share-btn').addEventListener('click', shareDeal);
                    function shareDeal() {
                      const text = `I just grabbed a fantastic deal on ${sampleData.brandName} via GenZDealZ.ai!
      
      Get an extra ${cashback}% off on your next purchase! Don’t miss out: ${baseURL}/brands_store_detail?storeId=${storeId}
      
      Voucher Details:
      * Amount: ₹${sampleData.price}
      * Card Number: ${sampleData.coupon}
      * Card Pin: ${pin}
      
      Start saving more today with GenZDealZ.ai!`;

                      if (navigator.share) {
                        navigator.share({
                          text: text,
                          // url: 'https://genzdealz.ai/brands_store_detail?storeId=472'
                        })
                          .then(() => console.log('Deal shared successfully'))
                          .catch((error) => console.log('Error sharing:', error));
                      } else {
                        alert('Sharing is not supported in this browser.');
                      }
                    }

                    document.getElementById('shareOnWhatsApp').addEventListener('click', shareOnWhatsApp);

                    function shareOnWhatsApp() {
                      const text = `I just grabbed a fantastic deal on ${sampleData.brandName} via GenZDealZ.ai!
      
      Get an extra ${cashback}% off on your next purchase! Don’t miss out: ${baseURL}/brands_store_detail?storeId=${storeId}
      
      Voucher Details:
      * Amount: ₹${sampleData.brandName}
      * Card Number: ${sampleData.coupon}
      * Card Pin: ${pin}
      
      Start saving more today with GenZDealZ.ai!`;

                      const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                      window.open(shareUrl, '_blank');
                    }
                    document.getElementById('shareOnFacebook').addEventListener('click', shareOnFacebook);

                    function shareOnFacebook() {
                      const url = encodeURIComponent(`${baseURL}/brands_store_detail?storeId=${responseData.ID}`);
                      // Optional: You can log or use the text for another purpose
                      const text = `I just grabbed a fantastic deal on ${sampleData.brandName} via GenZDealZ.ai!
      
      Get an extra ${cashback}% off on your next purchase! Don’t miss out: ${baseURL}/brands_store_detail?storeId=${storeId}
      
      Voucher Details:
      * Amount: ₹${sampleData.price}
      * Card Number: ${sampleData.coupon}
      * Card Pin: ${pin}
      
      Start saving more today with GenZDealZ.ai!`;

                      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                      window.open(shareUrl, '_blank');
                    }

                    document.getElementById('shareOnTwitter').addEventListener('click', shareOnTwitter);

                    function shareOnTwitter() {
                      const text = encodeURIComponent(`I just grabbed a fantastic deal on ${sampleData.brandName} via GenZDealZ.ai!
      Get an extra ${cashback}% off on your next purchase! Don’t miss out: ${baseURL}/brands_store_detail?storeId=${storeId}
      
      Voucher Details:
      * Amount: ₹${sampleData.price}
      * Card Number: ${sampleData.coupon}
      * Card Pin: ${pin}`);

                      const shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
                      window.open(shareUrl, '_blank');
                    }

                    document.getElementById('shareOnLinkedIn').addEventListener('click', shareOnLinkedIn);

                    function shareOnLinkedIn() {
                      const url = encodeURIComponent(`${baseURL}/brands_store_detail?storeId=${storeId}`);

                      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                      window.open(shareUrl, '_blank');
                    }


                    // Attach a click event handler to the close button
                    // $("#closeButton").click(function () {
                    //   // Reload the page
                    //   window.open(`${baseURL}/brands_store_detail?storeId=${storeId}&cashback=${cashback}`, "_self");
                    // });


                    // Define the API endpoint
                    // let brandName = brandName;

                    // Split the string at the "?" to separate the brand name and order ID



                    // Show the modal
                    // $('#paymentModal').modal('show');

                    
                  } else {
                    $(".footer").show();
                    $("#overlay").hide();
                    // console.log("No data available in the response");
                    const modalHTML = `
                <div class="shadow rounded-4 p-4 bg-white" style="max-width:400px;margin:auto;text-align:center;">
                    <h2 class="fw-bold text-danger">Technical Error</h2>
                    <p class="text-third fw-semibold" style="font-size:16px;">
                          It seems there's an issue with giftcard. Please check My Giftcard or call us at 1800-8890-695 for support.
                    </p>
                    <button onclick="redirect()" class="btn btn-prim fw-bold px-3">OK</button>
                  </div>
              `;

              const modalContainer = document.createElement('div');
              
              modalContainer.classList.add("error-modal");
              modalContainer.innerHTML = modalHTML;

              document.body.appendChild(modalContainer);
              window.redirect = function () {
                window.open(`${baseURL}/giftcards`, "_self");
              }
                  }
                  // console.log(data);

                })
                .catch((error) => {
                  console.error("Error:", error);
                  retryCount++;
                });
            }

            // Start the initial request
            makeSecondRequest();
            const userDataString = localStorage.getItem('userDataF')
            if (!userDataString) {
              console.error("User data not available in local storage");
              // Optionally, handle the absence of user data and inform the user
            }

            // Parse user data from the string
            const userData = JSON.parse(userDataString);

            // Split the string at the "?" to separate the brand name and order ID
            let [cleanBrandName] = brandName.split("?");

            // const url1 = 'https://flashweb.iweberp.com/api/purchaseHistoryRec';
            const url1 = 'https://flashweb.iweberp.com/api/subpurchaseHistoryRec';
            // const brand_name = storeData.data.brandName; // Get the deal title from the clicked element
            const brand_name = cleanBrandName.trim(); // Get the deal title from the clicked element
            const user_id = userData.name;
            // Debug: Log the titleInsight to ensure it has the expected value
            // console.log('Title Insight:', titleInsight);

            // Check if titleInsight is valid
            if (!brand_name) {
              console.error('brandName is missing');
              return;
            }
            if (!user_id) {
              console.error('name is missing');
              return;
            }
            // Construct the URL with the deal parameter in the query string
            const urlWithParams1 = `${url1}?user_id=${encodeURIComponent(user_id)}&brand_name=${encodeURIComponent(brand_name)}`;

            fetch(urlWithParams1)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.text(); // Get response as text
              })
              .then(text => {
                // console.log('Raw response:', text);

                // Replace NaN values with null to avoid JSON parsing errors
                const cleanedText = text.replace(/NaN/g, 'null');
                return JSON.parse(cleanedText); // Parse the cleaned JSON
              })
              .then(data => {
                // console.log('Parsed data:', data);

                // Function to create card HTML
                function createCardHtml(item) {
                  if (Object.keys(item).length === 0 && item.constructor === Object) {
                    return '';
                  } else {
                    const title = item.Deal || 'No Deal';
                    const brandId = item.Brand_id || 'Unknown';
                    const details = item.Details || '';
                    const imageUrl = item.Image_url || 'default-image.jpg'; // Fallback image
                    const url = item.URL || '#'; // Default to a placeholder link
                    const discount = item.discount !== null ? item.discount : '0'; // Default discount
                    const IsSubspace = item.IsSubspace || false;

                    if (IsSubspace) {
                      return `
                  <div class="d-flex align-items-center flex-column justify-content-center mx-3 show false">
                  <div class="big-b" data-src="${imageUrl}" data-storeid="${brandId}" data-title="${title}" data-cashback="${discount}" id="${title}">
                  <div class="d-flex align-items-center flex-column justify-content-center dod bg-white rounded-4 shadow" style="border-radius: 15px 15px 0 0 !important; width: 16rem;">
                  <img src="${imageUrl}" height="100%" class="rounded-4 h-100 py-2" style="max-width: -webkit-fill-available;" alt="Store Image">
                  </div>
                  <p class="HOVER track-link text-center mb-0 small" style="width: 16rem;"><text>${title}</text></p>
                  </div>
                  </div>`;
                    } else {
                      return `
                  <div class="h-100 px-3">
                  <div class="d-flex res-dod shadow" style="width: 16rem;">
                  <div class="${title} col-12 show false" data-title="${details}">
                  <a target="_blank" class="d-block" id="${title}" href="${url}">
                  <img class="img-fluid dod" src="${imageUrl}" style="border-radius: 15px 15px 0 0 !important;">
                  </a>
                  <a class="${title} HOVER track-link small" id="${title}" target="_blank" href="${url}">
                  <span></span>
                  <text>${title}</text>
                  </a>
                  </div>
                  </div>
                  </div>`;
                    }
                  }
                }

                // Create HTML for "Deep Learning Model Recommendation"
                const dlmRecommendations = data["Deep Learning Model Recommendation"];
                if (Array.isArray(dlmRecommendations) && dlmRecommendations.length > 0) {
                  const dlmHtml = dlmRecommendations.map(createCardHtml).join("");
                  $("#bigBrandz2").append(dlmHtml);
                  $(".genai").show();
                } else {
                  console.error('Error: Deep Learning Model Recommendation is not an array or is missing');
                }

                // Create HTML for "Similar Category Recommendation"
                const scRecommendations = data["Similar Category Recommendation"];
                if (Array.isArray(scRecommendations) && scRecommendations.length > 0) {
                  const scHtml = scRecommendations.map(createCardHtml).join("");
                  $("#bigBrandz3").append(scHtml);
                  $(".same").show();
                } else {
                  console.error('Error: Similar Category Recommendation is not an array or is missing');
                }

                $(".big-deals").show();

                function splashScreen() {
                  let dodImg = $(".dod");
                  if (dodImg.length) {
                    let dodImageWidth = dodImg.width();
                    let height = (dodImageWidth * 9) / 16;
                    dodImg.height(height);
                  }
                }
                var intervalID = setInterval(splashScreen, 0);

                $(".big-b").off("click").on("click", function () {
                  let title = $(this).data("title");
                  let brandId = $(this).data("storeid");
                  let image = $(this).data("src");
                  let cashback = $(this).data("cashback");

                  window.open(`brands_store_detail?storeId=${brandId}`, "_self");
                });
              })
              .catch(error => {
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
          })
          .catch((error) => {
            console.error("Error:", error);
            // Store the error in localStorage
            localStorage.setItem("pgStatus", JSON.stringify({
              payment_status: "CUSTOM_SUCCESS",
              error_details: {
                error_description: error.message || "Unknown error occurred"
              }
            })); 
            window.open(`${baseURL}/brands_store_detail?storeId=${storeId}`, "_self");
          });


      } else {
        
        window.open(`${baseURL}/brands_store_detail?storeId=${storeId}`, "_self");
      }
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        order_id: orderId,
        resp_str: JSON.stringify([result[0]]), // ✅ Convert result to a JSON string inside an array
      });


      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://flashweb.iweberp.com/api/UpdateIwebPaymentStatus", requestOptions)
        .then((response) => response.json()) // ✅ Parse response as JSON
        .then((result) => console.log("API Response:", result))
        .catch((error) => console.error("Error:", error));
    } else {
    // Handle case when result is empty
    localStorage.setItem("pgStatus", JSON.stringify({
      payment_status: "FAILED",
      error_details: {
        error_description: "Payment cancelled or Empty response from server"
      }
    }));
    window.open(`${baseURL}/brands_store_detail?storeId=${storeId}`, "_self");
  }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Store the error in localStorage
      localStorage.setItem("pgStatus", JSON.stringify({
        payment_status: "FAILED",
        error_details: {
          error_description: error?.message || "Unknown error occurred",
        }
      }));
      window.open(`${baseURL}/brands_store_detail?storeId=${storeId}`, "_self");
    });



  window.copyToClipboard = function (inputId) {
    let inputElement = document.getElementById(inputId);

    if (inputElement && inputElement.value) {
      // Use the Clipboard API to copy text to clipboard
      navigator.clipboard.writeText(inputElement.value)
        .then(() => {
          // Provide feedback to the user (optional)
          $(".toast").toast('show');
          $(".toast-body").text("Text copied to clipboard: " + inputElement.value);
        })
        .catch((error) => {
          // Handle any errors
          console.error("Failed to copy text to clipboard: ", error);
          $(".toast").toast('show');
          $(".toast-body").text(error);
        });
    }
  }
}


