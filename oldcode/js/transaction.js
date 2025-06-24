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

// Extract the 'data' parameter from the URL
// Get data from local storage
const transactionData = localStorage.getItem("transactionData");

if (!transactionData) {
    console.error("No transaction data found in local storage.");
} else {
    try {
        // Parse the JSON string
        const parsedData = JSON.parse(transactionData);
        // console.log("Retrieved Data:", parsedData);

        // Extract fields with preferred variable names
        const cfOrderId = parsedData.oid; // Cashfree Order ID
        const operatorId = parsedData.opid; // Operator ID
        const planId = parsedData.pid; // Plan ID
        const mNumber = parsedData.num; // Mobile Number
        const planAmount = parsedData.bao; // Old Plan Amount
        const planAmountDiscounted = parsedData.ba; // Discounted Plan Amount
        const operatorName = parsedData.oname; // Operator Name
        const operatorImage = parsedData.oimg; // Operator Image
        const circleName = parsedData.cname; // Circle Name
        const circleId = parsedData.cid; // Circle ID
        const dataBenefit = parsedData.db || "NA"; // Data Benefit
        const validity = parsedData.val || "NA"; // Validity
        const talktime = parsedData.tt || "NA"; // Talktime
        const cashback = parsedData.cb || 0; // Cashback

        // Log the extracted data
        // console.log("Cashfree Order ID:", cfOrderId);
        // console.log("Operator ID:", operatorId);
        // console.log("Plan ID:", planId);
        // console.log("Mobile Number:", mNumber);
        // console.log("Plan Amount (Old):", planAmount);
        // console.log("Plan Amount (Discounted):", planAmountDiscounted);
        // console.log("Operator Name:", operatorName);
        // console.log("Operator Image:", operatorImage);
        // console.log("Circle Name:", circleName);
        // console.log("Circle ID:", circleId);
        // console.log("Data Benefit:", dataBenefit);
        // console.log("Validity:", validity);
        // console.log("Talktime:", talktime);
        // console.log("Cashback:", cashback);




        const baseURL = window.location.origin;
        // const brandName = brndName;
        function replaceUnderscoresWithSpaces(str) {
            return str.replace(/_/g, " ");
        }
        // Helper to display toast messages
        const toastContainer = document.getElementById("toastContainer");
        function showToast(message, isError = false) {
            const toast = document.createElement("div");
            toast.className = `toast align-items-center text-bg-${isError ? "danger" : "success"} border-0`;
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
        // Example usage:
        // let inputString = brndName;
        // let brandName = replaceUnderscoresWithSpaces(inputString);
        // Retrieve the authToken from local storage
        // const authToken = localStorage.getItem("authToken");
        // Check if the authToken is available
        // if (!authToken) {
        //   console.error("Authentication token not available");
        //   // Optionally, handle the absence of the token and inform the user
        // }
        // Retrieve user data from local storage
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
        if (cfOrderId) {
            const storedOrderId = localStorage.getItem('initialOrderId');

            if (storedOrderId) {
                // proceedWithoutOrderId();                                  ////////////////////////// commennt later
                // Compare the current order ID with the stored one
                if (storedOrderId === cfOrderId) {
                    // console.log("Same order ID exists:", orderId);
                    window.open(`${baseURL}/recharge`, "_self");               ////////////////////////// uncommennt later
                } else {
                    localStorage.setItem('initialOrderId', cfOrderId);
                    // console.log("Order ID has changed.");
                    proceedWithoutOrderId();
                }
            } else {
                // Store the initial order ID
                localStorage.setItem('initialOrderId', cfOrderId);
                // console.log("Initial order ID stored:", orderId);
                proceedWithoutOrderId();
            }
        } else {
            // console.log("No order ID found in the URL.");
        }


        function proceedWithoutOrderId() {
            // console.log("The page was not refreshed.");
            const myHeaders0 = new Headers();
            myHeaders0.append("order_id", cfOrderId);


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
                        
                        // API call using fetch
                        const apiURL = "https://flashweb.iweberp.com/api/createBBPSRequestWithPlanId";
                        const requestBody = {
                            operatorId: operatorId,
                            planId: planId,
                            consumerNumber: mNumber,
                        };

                        (async () => {
                            try {
                                const response = await fetch(apiURL, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(requestBody),
                                });

                                if (response.ok) {
                                    const result = await response.json();
                                    // console.log(result);
                                    if (result && result.orderId && result.paymentId) {
                                        let rechargeOrderId = result.orderId;
                                        let rechargePaymentId = result.paymentId;
                                        
                                        // Function to create and display the recharge card dynamically
                                        function createRechargeCard() {
                                            // Clean up the cashback value
                                            const sanitizedCashback = cashback;
                                            function calculateCashback(planAmount, sanitizedCashback) {
                                                // Convert the percentage to a decimal
                                                const cashbackDecimal = sanitizedCashback / 100;

                                                // Calculate the cashback value
                                                const cashbackAmount = planAmount * cashbackDecimal;

                                                // Return the calculated cashback amount
                                                return cashbackAmount;
                                            }
                                            const savedAmount = calculateCashback(planAmount, sanitizedCashback);
                                            // console.log("Cashback Amount: " + savedAmount.toFixed(2));  // Rounds to 2 decimal places

                                            // Create the card structure using template literals
                                            const cardHTML = `
                                                        <div class="card py-0 border-0 rounded-4 bg-white shadow position-relative">
                                                            <div class="card-body p-0 ">
                                                                <h4 class="p-3 m-0">Thank You</h4>
                                                                <div class="d-flex justify-content-between align-items-center p-3">
                                                                    <div class="d-flex">
                                                                        <div class="operator-logo-wrap me-3">
                                                                            <img src="${operatorImage}" alt="${operatorName} Logo" class="operator-logo rounded-circle" style="width: 50px; height: 50px;">
                                                                        </div>
                                                                        <div> 
                                                                            <h5 class="">${mNumber}</h5>
                                                                            <div>
                                                                                <span class="">${operatorName},</span>
                                                                                <span class="">${circleName}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <h4 class="price">₹${planAmount}</h4>
                                                                </div>
                                                                <div class="d-flex justify-content-between align-items-center p-3 pb-4" style="background-color: #00942bb3;">
                                                                    <div>
                                                                        <div class="text-white">
                                                                            <h5 class="">Mobile recharge successful</h5>
                                                                            <p>Check 'My Plans' in your ${operatorName} app.</p>
                                                                        </div>
                                                                        <div class="position-relative d-flex align-items-center" style="z-index: 1;"> 
                                                                            <button class="dropdown-toggle w-auto p-3 py-2 text-white border-0 rounded-4 fw-bold text-center me-3 d-flex justify-content-center" data-bs-auto-close="outside" aria-expanded="false" style="background-color: #2c232394;"
                                                                                type="button" data-bs-toggle="dropdown">
                                                                                View Details
                                                                            </button>
                                                                            <ul class="dropdown-menu p-3 border-0 rounded-3 shadow-lg" style="background-color: #252525; color:#c2c2c2";>
                                                                                <li class="text-nowrap">
                                                                                    <h5 class="text-white">Order Details</h5>
                                                                                </li>
                                                                                <li><hr class="dropdown-divider" style="border-top: 1px solid rgb(255 255 255 / 61%);"></li>
                                                                                <li class="text-nowrap">
                                                                                    <p class="mb-0">Order ID</p>
                                                                                    <p id="copyOrderText">${rechargeOrderId} <i class="fa fa-copy ms-4" style="cursor:pointer;" id="copyOrderButton"></i></p>
                                                                                </li>
                                                                                <li class="text-nowrap">
                                                                                    <p class="mb-0">Payment ID Refrence</p>
                                                                                    <p id="copyPaymentText">${rechargePaymentId} <i class="fa fa-copy ms-4" style="cursor:pointer;" id="copyPaymentButton"></i></p>
                                                                                </li>
                                                                                <li class="text-nowrap d-flex justify-content-between align-items-center">
                                                                                    <p class="mb-0">Amount</p>
                                                                                    <p class="text-success mb-0">₹${planAmount}</p>
                                                                                </li>
                                                                            </ul>
                                                                            <div class="d-inline-block d-lg-none w-auto">
                                                                                <button type="button" id="share" class="btn shadow p-2 w-100 rounded-circle border-0 text-white mx-auto d-flex justify-content-center" style="background-color:#2c232394;">
                                                                                        <i class="fa-solid fa-share-nodes fs-4"></i>
                                                                                </button>
                                                                            </div>
                                                                            
                                                                            <div class=" d-none d-lg-inline-block w-auto">
                                                                                <div class="dropdown-center position-relative">
                                                                                    <a class="nav-link dropdown-toggle btn shadow p-2 rounded-circle border-0 mb-0 mt-0 mx-auto d-flex justify-content-center align-items-center"  style="background-color:#2c232394; width:min-content;" href="#" role="button" data-bs-auto-close="outside" aria-expanded="false" data-bs-toggle="dropdown">
                                                                                        <i class="fa-solid fa-share-nodes fs-4 text-white"></i>
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
                                                                    <div class="operator-logo-wrap ms-3">
                                                                        <dotlottie-player src="https://lottie.host/51a8237a-2938-436a-b629-98e9d11e80a1/IdfDk9jEz1.lottie" background="transparent" speed="0.5" style="width: 110px; height:110px;" loop="1" autoplay></dotlottie-player>
                                                                    </div>
                                                                </div>
                                                                <div class="d-flex justify-content-between align-items-center p-3 rounded-4" style="background-color: #FFF9BD;color: #ff9000;margin-top:-11px;">
                                                                    <div>
                                                                        <div>
                                                                            <h5 class="">Congratulations!</h5>
                                                                            <p>You've saved flat ₹${savedAmount.toFixed(2)} by recharging with GenZDealZ.ai on ${operatorName}.</p>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <div class="operator-logo-wrap ms-3">
                                                                        <img src="/icons/coin.gif" alt="${operatorName} Logo" class="operator-logo rounded-circle" style="width: 90px; height: 90px;">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <dotlottie-player src="https://lottie.host/49e79823-1a8d-433d-a5df-817e6bec29e9/PwyeWpsrhZ.lottie" background="transparent" speed="0.5" class="celeb-animation" style="width: 100%; height: 100%;position: absolute; top:0; left:0;" loop="1" autoplay></dotlottie-player>
                                                        </div>
                                                    `;

                                            // Append the generated HTML to the container
                                            document.getElementById("appendData").innerHTML = cardHTML;
                                            $(".footer, .main").show();
                                            $("#overlay").hide();
                                            // Parse the ISO 8601 timestamp
                                            // Get the current date and time
                                            const now = new Date();

                                            // Extract date components
                                            const year = now.getFullYear();
                                            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                            const day = String(now.getDate()).padStart(2, '0');

                                            // Extract time components
                                            const hours = String(now.getHours()).padStart(2, '0'); // 24-hour format
                                            const minutes = String(now.getMinutes()).padStart(2, '0');

                                            // Combine into the desired format
                                            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
                                            // console.log(formattedDate);
                                            const userUID = localStorage.getItem('userId');
                                            fetch('https://flashweb.iweberp.com/api/previously_recharge_data', {
                                                method: 'POST', // The equivalent of `--data` in curl
                                                headers: {
                                                    'userUID': userUID,
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    "MOBILE_NO": mNumber,
                                                    "OPERATOR_NAME": operatorName,
                                                    "OPERATOR_ID": operatorId,
                                                    "OPERATOR_IMAGE": operatorImage,
                                                    "CIRCLE_NAME": circleName,
                                                    "CIRCLE_ID": circleId,
                                                    "PLAN_ID": planId,
                                                    "AMOUNT": parseFloat(planAmount),
                                                    "DATE_TIME": formattedDate,
                                                    "DATA_TALKTIME_DAY": `${dataBenefit} | ${talktime} | ${validity}`
                                                })
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    console.log('Success:', data);

                                                })
                                                .catch(error => {
                                                    console.error('Error:', error);
                                                });

                                            document.getElementById("copyPaymentButton").addEventListener("click", function () {
                                                // Get the text to copy
                                                const textToCopy = document.getElementById("copyPaymentText").textContent.trim();

                                                // Copy the text to clipboard
                                                navigator.clipboard.writeText(textToCopy).then(() => {
                                                    // alert("Copied to clipboard!");
                                                    showToast("Payent ID copied to clipboard!", false);
                                                }).catch(err => {
                                                    console.error("Failed to copy text: ", err);
                                                });
                                            });
                                            document.getElementById("copyOrderButton").addEventListener("click", function () {
                                                // Get the text to copy
                                                const textToCopy = document.getElementById("copyOrderText").textContent.trim();

                                                // Copy the text to clipboard
                                                navigator.clipboard.writeText(textToCopy).then(() => {
                                                    // alert("Copied to clipboard!");
                                                    showToast("Order ID copied to clipboard!", false);
                                                }).catch(err => {
                                                    console.error("Failed to copy text: ", err);
                                                });
                                            });


                                            // Share link section ////////------------
                                            document.getElementById('share').addEventListener('click', shareOnSocialMedia);
                                            function shareOnSocialMedia() {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        // title: 'Check out this awesome site!',
                                                        text: `Mobile recharge is successful via
GenZDealZ.ai & saved ₹${savedAmount.toFixed(2)} 
Amount: ₹${planAmount}
Mobile Number: ${mNumber}
Operator: ${operatorName},${circleName}
Payment ID: ${rechargePaymentId}
Order Date: ${formattedDate}`,
                                                        url: `${baseURL}`, // current URL
                                                    })
                                                        .then(() => console.log('Successfully shared'))
                                                        .catch((error) => console.log('Error sharing:', error));
                                                } else {
                                                    alert('Sharing is not supported in this browser.');
                                                }
                                            }
                                            document.getElementById('shareOnWhatsApp').addEventListener('click', shareOnWhatsApp);
                                            function shareOnWhatsApp() {

                                                const text = encodeURIComponent(`Mobile recharge is successful via
GenZDealZ.ai & saved ₹${savedAmount.toFixed(2)} 
Amount: ₹${planAmount}
Mobile Number: ${mNumber}
Operator: ${operatorName},${circleName}
Payment ID: ${rechargePaymentId}
Order Date: ${formattedDate}`);
                                                const shareUrl = `https://api.whatsapp.com/send?text=${text}`;
                                                window.open(shareUrl, '_blank');
                                            }
                                            document.getElementById('shareOnFacebook').addEventListener('click', shareOnFacebook);
                                            function shareOnFacebook() {
                                                const url = encodeURIComponent(`${baseURL}`);
                                                const text = encodeURIComponent(`Mobile recharge is successful via
GenZDealZ.ai & saved ₹${savedAmount.toFixed(2)} 
Amount: ₹${planAmount}
Mobile Number: ${mNumber}
Operator: ${operatorName},${circleName}
Payment ID: ${rechargePaymentId}
Order Date: ${formattedDate}`);
                                                const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&text=${text}`;
                                                window.open(shareUrl, '_blank');
                                            }
                                            document.getElementById('shareOnTwitter').addEventListener('click', shareOnTwitter);
                                            function shareOnTwitter() {
                                                const text = encodeURIComponent(`Mobile recharge is successful via
GenZDealZ.ai & saved ₹${savedAmount.toFixed(2)} 
Amount: ₹${planAmount}
Mobile Number: ${mNumber}
Operator: ${operatorName},${circleName}
Payment ID: ${rechargePaymentId}
Order Date: ${formattedDate}`);
                                                const shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
                                                window.open(shareUrl, '_blank');
                                            }
                                            document.getElementById('shareOnLinkedIn').addEventListener('click', shareOnLinkedIn);
                                            function shareOnLinkedIn() {
                                                const url = encodeURIComponent(`${baseURL}`);
                                                const text = encodeURIComponent(`Mobile recharge is successful via
GenZDealZ.ai & saved ₹${savedAmount.toFixed(2)} 
Amount: ₹${planAmount}
Mobile Number: ${mNumber}
Operator: ${operatorName},${circleName}
Payment ID: ${rechargePaymentId}
Order Date: ${formattedDate}`);
                                                // const text = encodeURIComponent(`Check out the ${storeData.data.brandName} deal on GenZDealZ.ai! Save an extra ${cashback}% on your next purchase. Don’t miss this exclusive offer: `);
                                                const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`;
                                                window.open(shareUrl, '_blank');
                                            }


                                            function createBigBrands() {

                                                const requestOptions = {
                                                    method: "GET",
                                                    redirect: "follow"
                                                };

                                                // fetch("https://flashweb.iweberp.com/api/brand_showcase", requestOptions)
                                                fetch("https://flashweb.iweberp.com/api/new_brand_showcase", requestOptions)
                                                    .then((response) => response.json())
                                                    .then((data) => {

                                                        var cardHtml = data.map(item => `
                                  <div class="h-100 item">
                                  <div class="h-75 big-b d-flex" style="width: 12rem;" data-src="${item.logoURL}" data-storeid="${item.brandId}" data-title="${item.brandName}" id="${item.brandName}" >
                                  
                                    <img src="${item.logoURL}" height="100%" class="rounded-start rounded-end h-100 w-75 alt="Store Image">
                                  </div>
                                  </div>
                                `).join("");

                                                        $("#bigBrandz").append(cardHtml);
                                                        $(".big-deals").show()
                                                        $(".big-b").off("click").on("click", function () {
                                                            if (localStorage.getItem('authenticated') === 'true') {
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

                                                                var title = $(this).data("title");
                                                                var brandId = $(this).data("storeid");
                                                                var image = $(this).data("src");
                                                                var cashback = $(this).data("cashback");
                                                                gtag('event', 'local_deal_click_web', {
                                                                    'local_deal_click_web_category': 'Link Click',
                                                                    'local_deal_click_label': `Product Name:${title} ${brandId}, User Details- ${mobileNumber ? mobileNumber : ""} ${userData.email ? userData.email : ""},Name:${userData.name}`,
                                                                    'transport_type': 'beacon'
                                                                });
                                                                window.open(`brands_store_detail?storeId=${brandId}`, "_self");
                                                            } else {
                                                                window.location.href = 'login';
                                                            }


                                                        });
                                                    })
                                                    .catch((error) => {
                                                        $(".placeholder-col").fadeOut();
                                                        $(".real-col").fadeIn();
                                                        console.error(error);
                                                        isLoading = false;
                                                    });
                                                // Select all elements with the 'scroll' class
                                                const scrollContainer = document.querySelector("#bigBrandz");
                                                const leftArrow = document.querySelector(".left-arrow");
                                                const rightArrow = document.querySelector(".right-arrow");
                                                const SCROLL_AMOUNT = 700; // Adjust the amount of scroll per click
                                                let isDragging = false;
                                                let startX, scrollLeft;

                                                // Arrow button functionality
                                                leftArrow.addEventListener("click", () => {
                                                    scrollContainer.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
                                                });

                                                rightArrow.addEventListener("click", () => {
                                                    scrollContainer.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
                                                });

                                                // Drag-to-scroll functionality
                                                scrollContainer.addEventListener("mousedown", (e) => {
                                                    isDragging = true;
                                                    scrollContainer.classList.add("active");
                                                    startX = e.pageX - scrollContainer.offsetLeft;
                                                    scrollLeft = scrollContainer.scrollLeft;
                                                });

                                                scrollContainer.addEventListener("mousemove", (e) => {
                                                    if (!isDragging) return;
                                                    e.preventDefault();
                                                    const x = e.pageX - scrollContainer.offsetLeft;
                                                    const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
                                                    scrollContainer.scrollLeft = scrollLeft - walk;
                                                });

                                                scrollContainer.addEventListener("mouseup", () => {
                                                    isDragging = false;
                                                    scrollContainer.classList.remove("active");
                                                });

                                                scrollContainer.addEventListener("mouseleave", () => {
                                                    isDragging = false;
                                                    scrollContainer.classList.remove("active");
                                                });

                                                // Optional: Hide arrow buttons when scrolling reaches the ends
                                                const toggleArrowVisibility = () => {
                                                    leftArrow.style.visibility = scrollContainer.scrollLeft > 0 ? "visible" : "hidden";
                                                    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                                                    rightArrow.style.visibility = scrollContainer.scrollLeft < 0 ? "hidden" : "visible";
                                                };

                                                scrollContainer.addEventListener("scroll", toggleArrowVisibility);
                                                toggleArrowVisibility(); // Initialize arrow visibility

                                                const scrollContainerMain = document.querySelector(".scroll-container");

                                                // Disable double-click or hold-select for text
                                                scrollContainerMain.addEventListener("mousedown", (e) => {
                                                    e.preventDefault();
                                                });
                                            };
                                            createBigBrands();
                                        }

                                        // Call the function to create the recharge card dynamically
                                        createRechargeCard();
                                    } else {
                                        $(".footer").show();
                                        $("#overlay").hide();
                                        // Parse the 'details' string to an object
                                        const parsedDetails = JSON.parse(result.details);
                                        const message = parsedDetails.message;
                                        const modalHTML = `
                                            <div class="shadow rounded-4 p-4 bg-white" style="max-width:400px;margin:auto;text-align:center;">
                                            <h2 class="fw-bold text-danger">Technical Error</h2>
                                            <p class="text-third fw-semibold" style="font-size:16px;">
                                                ${`<br><br>${message}.<br> Please contact us at 9322655704 for immediate help.`}
                                            </p>
                                            <button onclick="redirect()" class="btn btn-prim fw-bold px-3">OK</button>
                                            </div>
                                        `;

                                        const modalContainer = document.createElement('div');
                                        modalContainer.classList.add("error-modal");
                                        modalContainer.innerHTML = modalHTML;

                                        document.body.appendChild(modalContainer);
                                        window.redirect = function () {
                                            window.open(`${baseURL}/recharge`, "_self");
                                        }
                                    }

                                } else {
                                    $(".footer").show();
                                    $("#overlay").hide();

                                    const errorResponse = await response.json();
                                    const detailsObj = JSON.parse(errorResponse.details || "{}");
                                    const errorMessage = detailsObj.message || "Something went wrong";

                                    const modalHTML = `
                                        <div class="shadow rounded-4 p-4 bg-white" style="max-width:400px;margin:auto;text-align:center;">
                                            <h2 class="fw-bold text-danger">Error</h2>
                                            <p class="text-third fw-semibold" style="font-size:16px;">
                                                ${errorMessage}<br><br>Status: ${response.status}
                                            </p>
                                            <button onclick="redirect()" class="btn btn-prim fw-bold px-3">OK</button>
                                        </div>
                                    `;

                                    const modalContainer = document.createElement('div');
                                    modalContainer.classList.add("error-modal");
                                    modalContainer.innerHTML = modalHTML;

                                    document.body.appendChild(modalContainer);

                                    window.redirect = function () {
                                        window.open(`${baseURL}/recharge`, "_self");
                                    };
                                }
                            } catch (error) {
                                // console.error("Fetch error:", error);
                                $(".footer, main").show();
                                $(".overlay").hide();
                                const modalHTML = `
                                    <div class="shadow rounded-4 p-4 bg-white" style="max-width:400px;margin:auto;text-align:center;">
                                        <h2 class="fw-bold text-danger">Network Error</h2>
                                        <p class="text-third fw-semibold" style="font-size:16px;">
                                            ${error.message || "Something went wrong"}
                                        </p>
                                        <button onclick="redirect()" class="btn btn-prim fw-bold px-3">OK</button>
                                    </div>
                                `;

                                const modalContainer = document.createElement('div');
                                modalContainer.classList.add("error-modal");
                                modalContainer.innerHTML = modalHTML;
                                document.body.appendChild(modalContainer);

                                window.redirect = function () {
                                    window.open(`${baseURL}/recharge`, "_self");
                                };
                            }

                        })();
                        $(".footer, main").show();
                        $(".overlay").hide();
                    }else {
                        window.open(`${baseURL}/recharge`, "_self");
                    }

                    const myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");

                            const raw = JSON.stringify({
                                order_id: cfOrderId,
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
                            window.open(`${baseURL}/recharge`, "_self");
                        }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // Store the error in localStorage
                    localStorage.setItem("pgStatus", JSON.stringify({
                        payment_status: "FAILED",
                        error_details: {
                        error_description: error.message || "Unknown error occurred"
                        }
                    }));

                    window.open(`${baseURL}/recharge`, "_self");
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
    } catch (error) {
        console.error("Error parsing transaction data:", error.message);
        
    }
}



