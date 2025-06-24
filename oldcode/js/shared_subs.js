
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
localStorage.removeItem("transactionData");
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
const urlParams = new URLSearchParams(window.location.search);
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
async function loadData() {
  return new Promise((resolve, reject) => {
    // Add placeholders for loading
    let placeholderHtml = Array(18).fill().map(() => `
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 placeholder-col">    
        <div class="d-flex justify-content-center align-items-center h-100 align-items-stretch ">
    <div class="card custom-card">
        <div class="card-header text-center bg-dark p-3">
            <p class="placeholder-glow shared-logo rounded bg-black" style="width: 100px; height: 100px;">
                <span class="placeholder col-12 h-100 rounded"></span>
              </p>
        </div>
        <div class="card-body text-center d-flex flex-column justify-content-between align-items-center h-100">
          <div class="w-100">
            <h6 class="card-title bg-white mb-auto">
                  <p class="placeholder-glow">
                    <span class="placeholder col-12"></span>
                  </p>
                </h6>
            </div>
            <div class=" w-100">
            <p class="price placeholder-glow d-block"><span class="placeholder col-12"></span></p>
            <span class="badge bg-success mb-3 d-block placeholder-glow"><span class="placeholder col-12"></span></span>
            <button class="btn btn-primary grab-btn placeholder-glow w-50"><span class="placeholder col-12"></span></button>
          </div>
        </div>
    </div>
</div>
</div>


      `).join("");

    $("#appendData").append(placeholderHtml);

    fetch("https://flashweb.iweberp.com/api/shared-subscriptions", {
      method: "GET",
      redirect: "follow"
    })
      .then((response) => response.json())
      .then((data) => {
        $(".placeholder-col").fadeOut(500, function () {
        });

        let cardHtml = data.sharedSubscriptions.map(item => `
          <div class="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 real-col">    
            <div class="d-flex justify-content-center align-items-center h-100 align-items-stretch ">
              <div class="card custom-card" >
                  <div class="card-header text-center bg-dark p-3">
                      <img src="${item.dp}" loading="lazy" alt="${item.name}" class="shared-logo">
                  </div>
                  <div class="card-body text-center d-flex flex-column justify-content-between align-items-center h-100">
                    <div class="">
                      <h6 class="text-white mb-auto">${item.name}</h6>
                      </div>
                      <div class="">
                      <p class="price">₹ ${item.sharedPrice}/${item.duration} ${item.durationType}</p>
                      <span class="badge bg-success mb-3">${item.shareLimit} People Sharing</span>
                      <button class="btn btn-primary grab-btn" id="grabDeal" data-all='${JSON.stringify(item).replace(/"/g, "&quot;")}'" data-name="${item.name}" data-image="${item.dp}" data-duration="${item.duration} ${item.durationType}" data-sharing="${item.shareLimit} people" data-price="₹ ${item.sharedPrice}">Grab It</button>
                    </div>
                  </div>
              </div>
            </div>
        </div>`).join("");

        let newCard = $(cardHtml).hide(); // Create the new element and hide it
        $("#appendData").append(newCard); // Append the hidden element
        newCard.fadeIn(2000); // Fade it in over 500 milliseconds

        $(document).on("click", ".grab-btn", function () {
          let dealData = JSON.parse($(this).attr("data-all")); // Retrieve and parse full object

          $("#dealModalBody").html(`<div class="modal-body">
          <div class="d-flex justify-content-center align-items-center w-100">
            <img id="dealImage" src="${dealData.dp}" alt="Deal Image" class="w-50 mb-3">
          </div>
          <h5 class="text-white" id="dealName">${dealData.name}</h5>
          <div class="d-flex justify-content-between align-items-center w-100">
            <p class="text-white-50">Duration</p>
            <p class="text-white" id="dealDuration">${dealData.duration} ${dealData.durationType}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center w-100">
            <p class="text-white-50">People Sharing</p>
            <p class="text-white" id="dealSharing">${dealData.shareLimit} people</p>
          </div>
          <div class="d-flex justify-content-between align-items-center w-100">
            <p class="text-white-50">Amount to Pay</p>
            <p class="text-success" id="dealPrice">₹ ${dealData.sharedPrice}</p>
          </div>
          <div class="buy-button">
            <div class="d-flex justify-content-center align-items-center w-100">
              <button id="buyButton" class="btn shadow w-100 rounded-5 border-0 text-white mx-auto d-flex px-md-4 fw-bold" style="background: #2e3192;">
                <div class="spinner-border text-white loader d-none mx-auto" style="height: 1.5rem; width: 1.5rem;" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <span class="text-buy text-b fw-bold d-block mx-auto">Buy Now</span>
              </button>
            </div>
          </div>
        </div>`)

          $("#dealModal").modal("show"); // Show Bootstrap Modal



          let buyButton = document.getElementById("buyButton");
          let noticeBtn = document.getElementById("noticeBtn");
          buyButton.addEventListener("click", function () {
            $("#noticeModal").modal("show"); // Show Bootstrap Modal
            noticeBtn.addEventListener("click", function () {
              $("#noticeModal").modal("hide"); // Show Bootstrap Modal
              handlePayment();
            });
          });

          
          // Function to handle recharge logic
          function handlePayment() {
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
              // $("#dealModal").modal("hide"); // Show Bootstrap Modal
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
              // $("#dealModal").modal("hide"); // Show Bootstrap Modal
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
                    console.error("Invalid phone number");
                    showToast("Invalid phone number", true);
                    $(".toast").toast('show');
                    $(".toast-msg").text("Invalid phone number");
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
                        showToast("Verification code is expired", true);
                        $(".toast").toast('show');
                        $(".toast-msg").text("Verification code is expired");
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
                    showToast("Verification code sent successfully!", false);
                    $(".toast").toast('show');
                    $(".toast-msg").text("Verification code sent successfully!");

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
                        showToast("Verification code confirmed successfully!", false);
                        $(".toast").toast('show');
                        $(".toast-msg").text("Verification code confirmed successfully!");

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
                      showToast(`OTP sending on ${number}`, false);
                      $(".toast").toast('show');
                      $(".toast-msg").text(`OTP sending on ${number}`);
                      recaptchaVerifierFunc();
                    }
                    if (error == "Error: reCAPTCHA has already been rendered in this element") {
                      //   $(".toast").toast('show');
                      // $(".toast-body").text(`reCAPTCHA has already been rendered in this element refreshing the page`);
                      setTimeout(function () {
                        // $("#otpModal").modal("hide");
                        recaptchaVerifierFunc();
                        // window.location.reload();
                      }, 5000);
                    }
                    if (error == "FirebaseError: Firebase: Error (auth/too-many-requests).") {
                      showToast(`Too many requests Please try again Later.`, true);
                      $(".toast").toast('show');
                      $(".toast-msg").text(`Too many requests Please try again Later.`);
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


            async function proceed() {
              $(".loader").addClass("d-block");
              $(".loader").removeClass("d-none");
              $(".text-buy").removeClass("d-block");
              $(".text-buy").addClass("d-none");

              const userDataString = localStorage.getItem("userDataF");
              if (!userDataString) {
                console.error("User data not available in local storage");
                return Promise.reject("User data not available in local storage");
              }

              const userData = JSON.parse(userDataString);
              let mobileNumber = userData?.number || userData.mobile_no || userData.phoneNumber || number || phoneNumber;
              let fName = userData?.first_name || firstWord;
              let lName = userData?.last_name || lastWord;

              try {
                // Get Order ID
                const orderIdResponse = await fetch(`https://flashweb.iweberp.com/api/gen_order_id?mobile_no=${mobileNumber}`);
                if (!orderIdResponse.ok) {
                  throw new Error(`HTTP error! Status: ${orderIdResponse.status}`);
                }
                const orderData = await orderIdResponse.json();
                const orderId = orderData.order_id;
                const baseURL = window.location.origin;

                function replaceSpacesWithUnderscores(str) {
                  return str.replace(/ /g, "_");
                }

                // Store transaction data
                const urlData = {
                  oid: orderId,
                  dealData: dealData,
                };
                localStorage.setItem("transactionData", JSON.stringify(urlData));

                let orderAmountFinal = dealData.sharedPrice;
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
                    const response = await fetch("https://flashweb.iweberp.com/api/genwin_check_coupon", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        UID: userId,
                        CODE: discountCode,
                        Min_Order_Value: parseFloat(orderAmountFinal),
                        MODE: "SHARED_SUB",
                        MODE_DETAILS: dealData.name,
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
                      
                      await proceedWithOrder(newOrderAmount, discountCode);
                    } else if (data.already_purchased === true) {
                      $("#overlay").hide();
                      discountError.textContent = data.message;
                      discountError.style.color = "red";
                    } else if (data.error) {
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
                  await proceedWithOrder(orderAmountFinal, "");
                  // Close the modal after proceeding with the order
                  setTimeout(function () {
                    discountModal.hide();
                  }, 3000);
                  // await proceedWithOrder(orderAmountFinal,brandId, orderId, mobileNumber, fName, lName, baseURL, userData);
                };
                async function proceedWithOrder(newOrderAmount, discountCode) {
                  // Prepare return URL
                  const returnURL = `${baseURL}/shared_subs_transaction`;

                  // Prepare payment headers
                  const paymentHeaders = new Headers();
                  paymentHeaders.append("order_id", orderId);
                  paymentHeaders.append("order_amount", newOrderAmount.toString());
                  paymentHeaders.append("order_currency", "INR");
                  paymentHeaders.append("customer_id", userId);
                  paymentHeaders.append("customer_email", userData?.email || userData.email_id);
                  paymentHeaders.append("customer_phone", mobileNumber);
                  paymentHeaders.append("customer_name", `${fName} ${lName}`);
                  paymentHeaders.append("return_url", returnURL);
                  paymentHeaders.append("brand_id", dealData.planId);
                  paymentHeaders.append("txn_type", "1");
                  paymentHeaders.append("txn_sub_type", "0");
                  paymentHeaders.append("coupon_code", discountCode || "");

                  const paymentOptions = {
                    method: "POST",
                    headers: paymentHeaders,
                    redirect: "follow",
                  };

                  const paymentResponse = await fetch("https://flashweb.iweberp.com/api/createpayorder", paymentOptions);

                  if (!paymentResponse.ok) {
                    const errorDetails = await paymentResponse.json().catch(() => ({}));
                    const errorMessage = errorDetails?.errorMsg || paymentResponse.statusText || `HTTP error! Status: ${paymentResponse.status}`;

                    if (
                      errorMessage.includes("ensure this value is greater than or equal to 1") &&
                      errorMessage.includes("value is not a valid integer")
                    ) {
                      showToast("Discounted amount should be greater than or equal to 1.", true);
                      $(".toast").toast("show");
                      $(".toast-msg").text("Discounted amount should be greater than or equal to 1.");

                      setTimeout(function () {
                        window.location.reload();
                      }, 5000);
                    } else {
                      throw new Error(errorMessage);
                    }
                  }

                  const responseData = await paymentResponse.json();

                  // Google Analytics Code (commented out)
                  // var title = storeData.data.brandName;
                  // gtag('event', 'sayf_buy_click_web', {
                  //   'sayf_buy_click_web_category': 'Link Click',
                  //   'sayf_buy_click_label': `Product Name:${title} ${storeData.data.id}, User Details- ${mobileNumber ? mobileNumber : ""} ${userData.email ? userData.email : ""},Name:${userData.name}`,
                  //   'transport_type': 'beacon'
                  // });

                  // Proceed to Cashfree checkout
                  let checkoutOptions = {
                    paymentSessionId: responseData.payment_session_id,
                    redirectTarget: "_self",
                  };
                  cashfree.checkout(checkoutOptions);

                  setTimeout(function () {
                    $(".loader").removeClass("d-block");
                    $(".loader").addClass("d-none");
                    $(".text-buy").addClass("d-block");
                    $(".text-buy").removeClass("d-none");
                  }, 200);
                }
              } catch (error) {
                console.error("Error:", error.message || error);
              }

              return false;
            }

            // Add further processing logic here if needed
            showToast("Processing started.", false);
          }
        });

        // resolve only after everything is rendered
        resolve();
      })
      .catch((error) => {
        $(".placeholder-col").fadeOut(500);
        console.error("Failed to load data:", error);
        alert("Failed to load data. Please try again later.");
        reject(error);
      });
  });
}


let isDataLoaded = false;

function filterDeals(searchText) {
  if (!isDataLoaded) {
    console.warn("Tried to filter before data loaded");
    return;
  }

  $(".real-col").each(function () {
    let dealName = $(this).find("h6").text().toLowerCase();
    $(this).toggle(dealName.includes(searchText));
  });
}
$(document).ready(async function () {
  $(".placeholder-col").fadeIn(500);

  await loadData(); // ✅ This now truly waits for data to be rendered
  isDataLoaded = true;

  $(".footer, main, .top-fixed, .search-container").show();
  $("#overlay").hide();

  // Only after data is in DOM
  if (urlParams.has("dealName")) {
    let searchText = urlParams.get("dealName").toLowerCase();
    console.log("searchText", searchText);
    $("#searchInput").val(searchText);
    filterDeals(searchText);
    history.replaceState(null, "", window.location.origin + window.location.pathname);
  }

  $(document).on("input", "#searchInput", function () {
    // $(".placeholder-col").fadeIn(500);
    let searchText = $(this).val().toLowerCase();
    filterDeals(searchText);
  });
  $(document).on("click", ".clear-text", async function () {
    $(".placeholder-col").fadeIn(500);
    $(this).siblings("input").val(""); // Clear the related input field
    await loadData(); // Reload the data
    $(".real-col").fadeIn(500);
    $(".footer, main, .top-fixed, .search-container").show();
    $("#overlay").hide();
  });
  document.getElementById('discountModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('discountCode').value = '';
  });
});

