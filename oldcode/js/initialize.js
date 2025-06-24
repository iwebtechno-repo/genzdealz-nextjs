document.cookie = "myCookie=myValue; SameSite=Lax";

var htmlBinding = $(".appendData").html();
$(".footer").hide();
$(".wrapper").hide();
$(".trend-head").hide();
$(".local-deals").hide();
$(".local-deals-child").hide();
$(".big-deals-child").hide();
$(".shared-deals-child").hide();
$("main").hide();
$(".arth").hide();
$(".abcd").hide();
$(".offline-deals").hide();
import {
  auth, db,
  getDoc,
  doc,
  setDoc,
  onAuthStateChanged
} from "/js/firebase_auth.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, get the UID
    const uid = user.uid;

    // You can now use the UID as needed
    // For example, storing it in localStorage
    localStorage.setItem("userId", uid);

    try {
      // Reference to the user's document in Firestore
      const userDocRef = doc(db, "usersCollection", uid);

      // Fetch the user's document
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // Extract the user data from the document
        const userData = userDocSnapshot.data();

        // Retrieve userDataF from localStorage
        let userDataF = JSON.parse(localStorage.getItem("userDataF"));

        if (userDataF) {
          // Update the phone number and phone verification status
          userDataF.arthCode = userData.arthCode;

          // Store the updated userDataF back into localStorage
          localStorage.setItem("userDataF", JSON.stringify(userDataF));
        } else {
          console.error("userDataF not found in localStorage.");
        }
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
    }
  } else {
    // User is signed out
    console.log("No user is signed in.");
  }
});
// const arthClick = document.querySelector("#arthClick");
// arthClick.addEventListener('click', async () => {
//   if (localStorage.getItem('authenticated') === 'true') {
//     $("#arthModal").modal('show');

//     const verifyCode = document.querySelector("#verifyCode");
//     const arthInput = document.querySelector("#arthInput");

//     const debounce = (func, delay) => {
//       let timeoutId;
//       return (...args) => {
//         if (timeoutId) clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => func.apply(this, args), delay);
//       };
//     };

//     const handleInput = () => {
//       $("#arthLoader").hide();
//       $("#verifyCode").show();
//       $(".otp-error").hide();
//       $(".error-text").hide();
//     };

//     $("#arthInput").on("input", debounce(handleInput, 300));

//     async function handleVerificationCode() {
//       $("#arthLoader").show();
//       $("#verifyCode").hide();

//       const inputValue = arthInput.value; // Keep actual input value
//       const inputValueLower = inputValue.toLowerCase(); // Convert to lowercase for comparison

//       if (!inputValue) {
//         setTimeout(() => {
//           $("#arthLoader").hide();
//           $(".otp-error").show();
//           $(".error-text").show().text("Please enter a code.");
//         }, 2000);
//         return;
//       }

//       try {
//         const response = await fetch("https://flashweb.iweberp.com/api/arth_code_url");
//         if (!response.ok) {
//           throw new Error("Network response was not ok " + response.statusText);
//         }

//         const data = await response.json();
//         const arthCodes = data.map(item => item.arthCode.toLowerCase()); // Convert codes to lowercase for comparison
//         const utmEndUsersUrls = data.map(item => item.utmEndUsersUrl);

//         const index = arthCodes.indexOf(inputValueLower);
//         if (index !== -1) {
//           $("#arthLoader").hide();
//           $(".otp-success").show();

//           const redirectUrl = utmEndUsersUrls[index];
//           const userId = localStorage.getItem("userId");
//           const userDocRef = doc(db, "usersCollection", userId);

//           await setDoc(userDocRef, { arthCode: inputValue }, { merge: true }); // Store actual case input value
//           const userDocSnapshot = await getDoc(userDocRef);

//           if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             let userDataF = JSON.parse(localStorage.getItem("userDataF"));

//             if (userDataF) {
//               userDataF.arthCode = userData.arthCode;
//               localStorage.setItem("userDataF", JSON.stringify(userDataF));
//             } else {
//               console.error("userDataF not found in localStorage.");
//             }
//           }
//           arthInput.value = "";
//           window.location.href = redirectUrl;
//         } else {
//           setTimeout(() => {
//             $("#arthLoader").hide();
//             $(".otp-error").show();
//             $(".error-text").show().text("The code you entered is incorrect. Please try again.");
//           }, 2000);
//         }
//       } catch (error) {
//         console.error("Error fetching arthCodes:", error);
//         setTimeout(() => {
//           $("#arthLoader").hide();
//           $(".otp-error").show();
//           $(".error-text").show().text("There was an error verifying the code. Please try again later.");
//         }, 2000);
//       }
//     }

//     verifyCode.addEventListener('click', async () => {
//       await handleVerificationCode();
//     });
//   } else {
//     window.location.href = 'login';
//   }
// });


// const abcdClick = document.querySelector("#abcdClick");
// abcdClick.addEventListener('click', async () => {
//   if (localStorage.getItem('authenticated') === 'true') {
//     $("#abcdModal").modal('show');

//     const verifyCode = document.querySelector("#abcdVerifyCode");
//     const abcdInput = document.querySelector("#abcdInput");

//     const debounce = (func, delay) => {
//       let timeoutId;
//       return (...args) => {
//         if (timeoutId) clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => func.apply(this, args), delay);
//       };
//     };

//     const handleInput = () => {
//       $("#abcdLoader").hide();
//       $("#abcdVerifyCode").show();
//       $(".abcd-otp-error").hide();
//       $(".abcd-error-text").hide();
//     };

//     $("#abcdInput").on("input", debounce(handleInput, 300));

//     async function handleAbcdVerificationCode() {
//       $("#abcdLoader").show();
//       $("#abcdVerifyCode").hide();

//       const inputValue = abcdInput.value; // Keep actual input value
//       const inputValueLower = inputValue.toLowerCase(); // Convert to lowercase for comparison

//       if (!inputValue) {
//         setTimeout(() => {
//           $("#abcdLoader").hide();
//           $(".abcd-otp-error").show();
//           $(".abcd-error-text").show().text("Please enter a code.");
//         }, 2000);
//         return;
//       }

//       try {
//         const response = await fetch("https://flashweb.iweberp.com/api/abcd_code_url");
//         if (!response.ok) {
//           throw new Error("Network response was not ok " + response.statusText);
//         }

//         const data = await response.json();
//         const abcdCodes = data.map(item => item.abcdCode.toLowerCase()); // Convert codes to lowercase for comparison
//         const utmEndUsersUrls = data.map(item => item.utmEndUsersUrl);

//         const index = abcdCodes.indexOf(inputValueLower);
//         if (index !== -1) {
//           $("#abcdLoader").hide();
//           $(".abcd-otp-success").show();

//           const redirectUrl = utmEndUsersUrls[index];
//           const userId = localStorage.getItem("userId");
//           const userDocRef = doc(db, "usersCollection", userId);

//           await setDoc(userDocRef, { abcdCode: inputValue }, { merge: true }); // Store actual case input value
//           const userDocSnapshot = await getDoc(userDocRef);

//           if (userDocSnapshot.exists()) {
//             const userData = userDocSnapshot.data();
//             let userDataF = JSON.parse(localStorage.getItem("userDataF"));

//             if (userDataF) {
//               userDataF.abcdCode = userData.abcdCode;
//               localStorage.setItem("userDataF", JSON.stringify(userDataF));
//             } else {
//               console.error("userDataF not found in localStorage.");
//             }
//           }
//           abcdInput.value = "";
//           window.location.href = redirectUrl;
//         } else {
//           setTimeout(() => {
//             $("#abcdLoader").hide();
//             $(".abcd-otp-error").show();
//             $(".abcd-error-text").show().text("The code you entered is incorrect. Please try again.");
//           }, 2000);
//         }
//       } catch (error) {
//         console.error("Error fetching abcdCodes:", error);
//         setTimeout(() => {
//           $("#abcdLoader").hide();
//           $(".abcd-otp-error").show();
//           $(".abcd-error-text").show().text("There was an error verifying the code. Please try again later.");
//         }, 2000);
//       }
//     }

//     verifyCode.addEventListener('click', async () => {
//       await handleAbcdVerificationCode();
//     });
//   } else {
//     window.location.href = 'login';
//   }
// });





// Function to show the overlay and spinner
// Function to hide the overlay and spinner
// function hideOverlay() {
//   document.getElementById('overlay').style.display = 'none';
// }
// Retrieve user data from local storage
// Retrieve user data from local storage


function retryAjax(ajaxOptions, retries = 3, delay = 2000) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      $.ajax({
        ...ajaxOptions,
        success: resolve,
        error: (jqXHR, textStatus, errorThrown) => {
          if (n <= 0) {
            return reject(errorThrown);
          }
          console.warn(`Retrying AJAX... attempts left: ${n}`, errorThrown);
          setTimeout(() => attempt(n - 1), delay * Math.pow(2, 3 - n)); // exponential backoff
        }
      });
    };
    attempt(retries);
  });
}

async function retryFetch(url, options = {}, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
      return res;
    } catch (err) {
      console.warn(`Retry ${i + 1}/${retries} failed: ${err.message}`);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      } else {
        throw err;
      }
    }
  }
}

async function fetchData() {
  const response = await retryFetch("https://flashweb.iweberp.com/api/stored-procedures");
  const data = await response.json();

  const allContainer = document.getElementById("allData");
  const gadgetsContainer = document.getElementById("coursesJobs");
  const beautyContainer = document.getElementById("beauty");
  const healthContainer = document.getElementById("health");

  data.stored_procedures.forEach(deal => {
    const dealElement = `
          <div class="element col-10 col-sm-7 col-md-6 col-lg-5 col-xl-4 col-xxl-3 show px-3" data-title="${deal.title}" data-url="${deal.url}" title="${deal.category}">
        <div class="shadow rounded-4">
          <div class="aiml-deal" style="height: 27vh;">
            <a target="_blank" class="d-block h-100" id="${deal.title}" href="${deal.url}">
              <img class="img-fluid h-100 d-block" loading="lazy" src="${deal.imagePath}" />
            </a>
          </div>
          <div>
            <a class=" track-link text-black d-block text-center pt-2 fw-semi-bold" id="${deal.title}" target="_blank" href="${deal.url}">
              ${deal.title}
            </a>
            <div id="${deal.title}">
              <div class="card-description small">
                <center>${deal.details}</center>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;

    // Append to "All Data"
    allContainer.innerHTML += dealElement;
    $('.heading').show();
    // Categorize specific data
    if (deal.category.includes("Courses") || deal.category.includes("Jobs")) {
      gadgetsContainer.innerHTML += dealElement;
    } else if (deal.category.includes("Beauty") || deal.category.includes("Fashion")) {
      beautyContainer.innerHTML += dealElement;
    } else if (deal.category.includes("Health") || deal.category.includes("Personal Care")) {
      healthContainer.innerHTML += dealElement;
    }
    function detectPlatform() {
          const ua = navigator.userAgent || navigator.vendor || window.opera;

          // Mobile
          if (/android/i.test(ua)) return "android";
          if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "ios";

          // Desktop OS checks
          if (navigator.userAgent.includes("Mac OS X")) return "mac";
          if (navigator.userAgent.includes("Windows")) return "windows";
          if (navigator.userAgent.includes("Linux")) return "linux";

          return "desktop"; // Fallback
        }

        const platform = detectPlatform();

        const kombuchaLink = 
          platform === "android" || platform === "windows" || platform === "linux"
            ? "https://play.google.com/store/apps/details?id=iweb.student.marketplace"
            : platform === "ios" || platform === "mac"
              ? "https://apps.apple.com/in/app/genzdealz-ai/id6504975486"
              : "https://play.google.com/store/apps/details?id=iweb.student.marketplace"; // general fallback

    // Custom redirects (unchanged)
    const redirects = [
      { id: "#Study\\ Play\\ Win", title: "Study Play Win", link: "./smartab" },
      { id: "#GenZ\\ Life\\ Vitae", title: "GenZ Life Vitae", link: "./life_vitae" },
      { id: "#Become\\ NISM\\ Certified", title: "Become NISM Certified", link: "./nism" },
      { id: "#Become\\ Kitchen\\ Superstar", title: "Become Kitchen Superstar", link: "./kitchen" },
      { id: "#Study\\ Abroad\\ Made\\ Easy", title: "Study Abroad Made Easy", link: "./abroad_application" },
      { id: "#Loans\\ for\\ GenZ", title: "Loans for GenZ", link: "./flex_money" },
      { id: "#iPhone\\ 8\\ DealZ", title: "iPhone 8 DealZ", link: "./iphone" },
      { id: "#Secure\\ My\\ Scholarship", title: "Secure My Scholarship", link: "./secure_scholarship" },
      { id: "#Study\\ Abroad\\ on\\ Scholarship\\ ", title: "Study Abroad on Scholarship ", link: "./secure_scholarship" },
      { id: "#Daily\\ Dose\\ of\\ Kombucha", title: "Daily Dose of Kombucha", link: kombuchaLink },
    ];

    redirects.forEach(({ id, title, link }) => {
      let elements = document.querySelectorAll(id);
      elements.forEach(element => {
        element.href = link;
        let parent = element.closest(`[data-title='${title}']`);
        if (parent) parent.setAttribute("data-url", link);
      });
    });

    $(".element").off("click").on("click", async function (event) {
      event.preventDefault();

      let customElement = document.querySelector('[id="Darwin International conference"]');

      // Function to check if the target is related to the customElement (parent, child, or sibling)
      function isRelatedToCustomElement(target) {
        if (!customElement) return false;

        // Check if the clicked target is the customElement itself
        if (target === customElement) return true;

        // Check if the clicked element is a child of customElement
        if (customElement.contains(target)) return true;

        // Check if the clicked element is a parent of customElement
        if (target.contains(customElement)) return true;

        // Check if the clicked element is a sibling of customElement
        if (target.parentElement === customElement.parentElement) return true;

        return false;
      }

      // If the clicked element (or related) is the customElement, redirect to its original URL
      if (isRelatedToCustomElement(event.target)) {
        let defaultUrl = customElement.getAttribute("href");
        if (defaultUrl) {
          // console.log("Redirecting to:", defaultUrl);
          window.location.href = defaultUrl;
          return;
        } else {
          console.error("Original URL not found.");
          return;
        }
      }

      // Authentication Check
      if (localStorage.getItem("authenticated") !== "true") {
        console.warn("User not authenticated. Redirecting to login.");
        window.location.href = "login";
        return;
      }

      // Retrieve user data from localStorage
      const userDataString = localStorage.getItem("userDataF") || localStorage.getItem("userDataA");
      if (!userDataString) {
        console.error("User data not available in local storage");
        return;
      }

      let userData;
      try {
        userData = JSON.parse(userDataString);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return;
      }

      const mobileNumber = userData?.number || userData.mobile_no || userData.phoneNumber;
      let [firstWord, lastWord] = userData?.name?.split(" ") || ["DefaultFirst", "DefaultLast"];
      let fName = userData?.first_name || firstWord;
      let lName = userData?.last_name || lastWord;

      const title = $(this).data("title");
      const redirectLink = $(this).data("url");

      try {
        const response = await fetch("https://flashweb.iweberp.com/api/sub_get_brands_ML_Recommend", {
          method: "GET",
          headers: { "deal_name": title },
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        if (!Array.isArray(data.data)) {
          console.error("Error: Data is not an array");
          return;
        }

        // Generate and append the HTML for recommended deals
        const cardHtml1 = data.data
          .map((item) => {
            if ($.isEmptyObject(item)) return "";
            return item.IsSubspaceDeal
              ? `
              <div class="h-100 col-lg-6 pb-3">
                  <div class="d-flex align-items-center flex-column justify-content-center show false">
                      <div class="big-b w-100" data-src="${item.image}" data-storeid="${item.brand_id}" data-title="${item.brandName}" data-cashback="${item.discount}" id="${item.brandName}">
                          <div class="d-flex align-items-center flex-column justify-content-center dod bg-white" style="border-radius: 15px 15px 0 0;">
                              <img src="${item.image}" height="100%" loading="lazy" class="rounded-4 h-100 py-2" alt="Store Image">
                          </div>
                          <p class="HOVER track-link text-center mb-0"><text>${item.brandName}</text></p>
                      </div>
                  </div>
              </div>`
              : `
              <div class="h-100 col-lg-6 pb-3">
                  <div class="d-flex">
                      <div class="${item.title} col-12 show false" data-title="${item.details}">
                          <a target="_blank" class="d-block" id="${item.title}" href="${item.url}">
                              <img class="img-fluid dod" src="${item.imagePath}" style="border-radius: 15px 15px 0 0;">
                          </a>
                          <a class="${item.title} HOVER track-link" id="${item.title}" target="_blank" href="${item.url}">
                              <span></span>
                              <text>${item.title}</text>
                          </a>
                      </div>
                  </div>
              </div>`;
          })
          .join("");

        $("#bigBrandz1").append(cardHtml1);

        // Append 'Continue' link
        $("#url").append(`<a href="${redirectLink}" target="_blank" class="fw-bold h5 text-end text-animate">Continue>></a>`);

        $(".big-deals").show();

        // Adjust image height
        function adjustImageHeight() {
          $(".dod").each(function () {
            $(this).height(($(this).width() * 9) / 16);
          });
        }
        setInterval(adjustImageHeight, 100);

        $(".big-b").off("click").on("click", async function () {
          const brandId = $(this).data("storeid");
          window.open(`brands_store_detail?storeId=${brandId}`, "_self");
        });

        $("#RecommendModal").on("hide.bs.modal", function () {
          $("#bigBrandz1, #url, .big-deals #url").empty();
        });
        if (title === "Study Play Win" || title === "Study Abroad Made Easy" || title === "Secure My Scholarship" || title === "Study Abroad on Scholarship"
           || title === "Loans for GenZ" || title === "iPhone 8 DealZ" || title === "Become Kitchen Superstar"
            || title === "Become NISM Certified" || title === "GenZ Life Vitae" || title === "Darwin International conference") {
          $("#RecommendModal").modal("hide");
          window.location.href = redirectLink;
        }
        if (title !== "Study Play Win") {
          $("#RecommendModal").modal("show");
        } else {
          window.location.href = redirectLink;
        }
      } catch (error) {
        console.error("Error:", error);
        window.location.href = redirectLink;
        $(".big-deals").hide();
      }

      $(".insight-container").hide();

      gtag("event", "deal_click_web", {
        deal_click_web_category: "Link Click",
        deal_click_label: `Product Name:${title}, User Details- ${mobileNumber || ""} ${userData.email || ""}, Name:${userData.name}`,
        transport_type: "beacon",
      });
    });
  });
}

fetchData();
retryAjax({
  url: "https://flashweb.iweberp.com/api/trending_categories",
  dataType: "text",
}).then(function (response) {
  try {
    response = response.replace(/:\s*NaN/g, ': null');
    const data = JSON.parse(response);

    let htmlBinding = "";
    let carouselSlidesHTML = data.map(category => `
      <div class="show rounded-4 position-relative trending-deal" data-category="${category.category}">
        <a target="_blank" class="d-block rounded-4 slider-img-link w-100 h-100" href="${category.url || '#'}">
          <img class="img-fluid slider-img h-100 rounded-4" loading="lazy" src="${category.imageUrl}" />
        </a>
      </div>
    `).join("");

    $('.carousel').html(carouselSlidesHTML);
    $(".appendData").html(htmlBinding);

    $('.carousel').slick({
      slidesToShow: 1,
      dots: true,
      centerMode: false,
      cssEase: 'ease-in-out',
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnDotsClick: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      pauseOnFocus: false
    });

    $('.trend-head').show();
    $(".trending-deal").off("click").on("click", async function () {
      const category = encodeURIComponent($(this).data("category"));
      try {
        window.open(`similar_category?category=${category}`, "_self");
      } catch (error) {
        console.error("Error fetching brand details:", error);
      }
    });

    const getOperatingSystem = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/windows phone/i.test(userAgent)) return "Windows Phone";
      if (/android/i.test(userAgent)) return "Android";
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
      if (/Win(dows )?NT/.test(userAgent)) return "Windows";
      if (/Mac/.test(userAgent) && !/iPhone|iPad|iPod/.test(userAgent)) return "macOS";
      if (/Linux/.test(userAgent)) return "Linux";
      return "unknown";
    };
    getOperatingSystem();

    $(".footer, .wrapper, .local-deals, .local-deals-child, .big-deals-child, main, .arth, .abcd, .offline-deals,.shared-deals-child").show();
    $("#overlay").hide();
  } catch (error) {
    console.error("JSON Parse Error:", error);
  }
}).catch(function (error) {
  console.error("Final AJAX error after retries:", error);
});



document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await retryFetch("https://flashweb.iweberp.com/api/big_brands_category");
    const data = await response.json();

    // Group by category
    const categories = {};
    data.forEach(item => {
      if (!categories[item.Category]) {
        categories[item.Category] = [];
      }
      categories[item.Category].push(item);
    });

    const brandContainer = document.getElementById("brandContainer");

    // Iterate through categories and create sections
    for (const [category, brands] of Object.entries(categories)) {
      const categoryCol = document.createElement("div");
      categoryCol.classList.add("col-12", "col-lg-3", "mb-4", "px-3", "px-lg-5");
      // Get only the first 4 brands
      const topBrands = brands.slice(0, 4);
      categoryCol.innerHTML = `
          <div class="category-title text-uppercase mb-3 text-center d-none d-lg-block">${category} BRANDZ</div>
              
              <div class="row g-3 g-lg-4">
                  ${topBrands.map(brand => `
                      <div class="col-3 col-lg-6">
                          <div class="brand-card big-b" data-src="${brand.image}" data-storeid="${brand.storeId}" data-title="${brand.title}" id="${brand.title}">
                              <img src="${brand.image}" class="w-100 rounded-4 shadow" alt="${brand.title}">
                          </div>
                      </div>
                  `).join('')}
              </div>
          `;

      brandContainer.appendChild(categoryCol);
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
          // var authToken = localStorage.getItem('authToken');
          window.open(`brands_store_detail?storeId=${brandId}`, "_self");
        } else {
          window.location.href = 'login';
        }


      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  
});


const requestOptionsShared = {
  method: "GET",
  redirect: "follow"
};

function fetchSharedShowcase(retries = 3, delay = 2000) {
  fetch("https://flashweb.iweberp.com/api/shared-subscription-showcase", requestOptionsShared)
    .then((response) => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then((data) => {
      var cardHtml = data.sharedSubscriptionShowcase.map(item => `
        <div class="col-6 col-sm-5 col-md-4 col-lg-3 col-xl-2">    
        <div class="d-flex justify-content-center align-items-center h-100 align-items-stretch">
          <div class="card custom-card">
            <div class="card-header text-center bg-dark p-3">
              <img src="${item.dp}" alt="${item.name}" class="shared-logo">
            </div>
            <div class="card-body text-center d-flex flex-column justify-content-between align-items-center h-100">
              <div class=""><h6 class="text-white mb-auto">${item.name}</h6></div>
              <div class="">
                <p class="price">₹ ${item.sharedPrice}/${item.duration} ${item.durationType}</p>
                <span class="badge bg-success mb-3">${item.shareLimit} People Sharing</span>
                <button class="btn btn-primary grab-btn" id="grabDeal" data-name="${item.name}">View</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      `).join("");

      $("#sharedSubs").append(cardHtml);
      $(".shared-deals").show();
      $(".grab-btn").off("click").on("click", function () {
        if (localStorage.getItem('authenticated') === 'true') {
          let dealName = $(this).data("name");
          window.open(`shared_subs?dealName=${encodeURIComponent(dealName)}`, "_self");
        } else {
          window.location.href = 'login';
        }
      });
    })
    .catch((error) => {
      console.error("Fetch failed:", error);
      if (retries > 0) {
        console.log(`Retrying... (${3 - retries + 1})`);
        setTimeout(() => fetchSharedShowcase(retries - 1, delay), delay);
      } else {
        $(".placeholder-col").fadeOut();
        $(".real-col").fadeIn();
        console.error("All retries failed.");
        // Optionally show error UI
      }
    });
}

// Call the function
fetchSharedShowcase();



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

  // Mouse Wheel Function for Horizontal Scrolling
  scroll.addEventListener("wheel", (e) => {
    if (scroll.scrollWidth > scroll.clientWidth) {
      e.preventDefault(); // Only prevent default if horizontal scrolling is possible
      const scrollSpeed = 5;
      scroll.scrollLeft += e.deltaY * scrollSpeed;
    }
  });
  scroll.addEventListener("touchstart", (e) => {
    isDown = true;
    scrollX = e.touches[0].pageX - scroll.offsetLeft;
    scrollLeft = scroll.scrollLeft;
  });

  scroll.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const element = e.touches[0].pageX - scroll.offsetLeft;
    const scrolling = (element - scrollX) * 1.5;
    scroll.scrollLeft = scrollLeft - scrolling;
  });

  scroll.addEventListener("touchend", () => {
    isDown = false;
  });

});


// Responsive image height adjustment
function cardImgRatio() {
  const aimlImg = $(".aiml-deal");
  if (aimlImg.length) {
    aimlImg.each(function () {
      const aimlImageWidth = $(this).width();
      const height = (aimlImageWidth * 2) / 3.5;
      $(this).height(height);
    });
  }

  // Responsive image height adjustment
  if (window.innerWidth < 992) {
    const aimlImg = $(".aiml-deal");
  if (aimlImg.length) {
    aimlImg.each(function () {
      const aimlImageWidth = $(this).width();
      const height = (aimlImageWidth * 2) / 3.5;
      $(this).height(height);
    });
  }
    const carouselImg = $(".carousel");
    if (carouselImg.length) {
      carouselImg.each(function () {
        const carouselImageWidth = $(this).width();
        const height = (carouselImageWidth * 9) / 16;
        $(this).height(height);
      });
    }
  } else {
    const aimlImg = $(".aiml-deal");
  if (aimlImg.length) {
    aimlImg.each(function () {
      const aimlImageWidth = $(this).width();
      const height = (aimlImageWidth * 2) / 3.2;
      $(this).height(height);
    });
  }
    const carouselImg = $(".carousel");
    if (carouselImg.length) {
      carouselImg.each(function () {
        const carouselImageWidth = $(this).width();
        const height = (carouselImageWidth * 1) / 2.3;
        // const height = "80vh";
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
