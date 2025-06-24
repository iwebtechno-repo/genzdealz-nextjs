let baseUrl = window.location.origin;
const urlParams = new URLSearchParams(window.location.search);
let category = urlParams.get("category");
fetch(`https://flashweb.iweberp.com/api/get_category_data?category=${encodeURIComponent(category)}`)
  .then(response => response.json())
  .then(data => {
    if (data.M_BRAND && data.M_BRAND.length > 0) {
      displayBrands(data.M_BRAND);
    }
    if (data.home_screen && data.home_screen.length > 0) {
      displayAiml(data.home_screen);
    }
    $(".overlay").hide();
  })
  .catch(error => console.error("Error fetching data:", error));



function displayAiml(aiml) {

  const aimlSection = document.getElementById("aimlSection");
  aimlSection.innerHTML = `<div class="mb-0 mt-5 d-flex justify-content-between align-items-center">
              <h4 class="fw-bold mb-0 text-prim">GenZ AIML ${category} DealZ</h4>
            <a href="./similar_category?category=All" class="text-prim d-flex align-items-center">View All <span><img src="images/icon/arrow-right.png" alt=""></span></a>
            </div>`;
  aiml.forEach(ad => {
    const card = document.createElement("div");
    card.classList.add('col-12', 'col-sm-7', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-3');
    card.innerHTML = `
        <div class="deal-card login-check" data-title="${ad.title}" data-url="${ad.url}" title="${ad.category}">
        <div class="shadow rounded-4">
          <div class="aiml-deal w-100" style="height: 230px;">
            <a target="_blank" class="d-block w-100 h-100" id="${ad.title}" href="${ad.url}">
              <img class="img-fluid w-100 h-100 d-block" loading="lazy" src="${ad.imagePath}" />
            </a>
          </div>
          <div>
            <a class=" track-link text-black d-block text-center pt-2 fw-semi-bold" id="${ad.title}" target="_blank" href="${ad.url}">
              ${ad.title}
            </a>
            <div id="${ad.title}">
              <div class="card-description small">
                <center>${ad.details}</center>
              </div>
            </div>
          </div>
        </div>
      </div>
            
        `;
    aimlSection.appendChild(card);
    // Responsive image height adjustment
    function cardImgRatio() {
      var aimlImg = $(".aiml-deal");
      if (aimlImg.length) {
        aimlImg.each(function () {
          var aimlImageWidth = $(this).width();
          var height = (aimlImageWidth * 2) / 3;
          $(this).height(height);
        });
      }
    }
    cardImgRatio();

    
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
    ];

    redirects.forEach(({ id, title, link }) => {
      let elements = document.querySelectorAll(id);
      elements.forEach(element => {
        element.href = link;
        let parent = element.closest(`[data-title='${title}']`);
        if (parent) parent.setAttribute("data-url", link);
      });
    });
    $(".login-check").off("click").on("click", async function (event) {
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
      window.open(`${redirectLink}`, "_blank");
      


      gtag("event", "deal_click_web", {
        deal_click_web_category: "Link Click",
        deal_click_label: `Product Name:${title}, User Details- ${mobileNumber || ""} ${userData.email || ""}, Name:${userData.name}`,
        transport_type: "beacon",
      });
    });
  });

}
function displayBrands(brands) {
  const brandSection = document.getElementById("brandSection");
  brandSection.innerHTML = `<div class="mb-0 mt-5 d-flex justify-content-between align-items-center">
              <h4 class="fw-bold mb-0 text-prim">GenZ Big BrandZ ${category} DealZ</h4>
            <a href="./brands_store" class="text-prim d-flex align-items-center">View All <span><img src="images/icon/arrow-right.png" alt=""></span></a>
            </div>`;
  brands.forEach(deal => {
    const card = document.createElement("div");
    card.classList.add('col-12', 'col-sm-7', 'col-md-6', 'col-lg-5', 'col-xl-4', 'col-xxl-3', 'show');
    card.innerHTML = `
        <div class="deal-card position-relative" data-title="${deal.BrandName}" data-url="${deal.LogoURL}">
            <span class="position-absolute top-0 end-0 badge bg-danger px-2 small rounded-5">${deal.MaxDiscount}% Off</span>
            <div class="shadow rounded-4">
                <div class="aiml-deal w-100" style="height: 230px;">
                    <a target="_self" class="d-block w-100 h-100" id="${deal.BrandName}" href="${baseUrl}/brands_store_detail?storeId=${deal.BrandId}">
                        <img class="img-fluid w-100 h-100 d-block rounded-4 shadow-sm" style="object-fit:scale-fill;" loading="lazy" src="${deal.HorizontalPoster}" />
                    </a>
                </div>
                <div class="text-center px-3">
                    <a target="_self" class="fs-6 track-link text-black d-flex align-items-center text-center py-3 fw-bold" id="${deal.BrandName}" href="${baseUrl}/brands_store_detail?storeId=${deal.BrandId}">
                        <img class="rounded-circle me-3 shadow" width="40px" height="40px" style="object-fit:scale-down;" loading="lazy" src="${deal.LogoURL}" /> ${deal.BrandName}
                    </a>
                </div>
            </div>
      </div>
            
        `;
    brandSection.appendChild(card);
    // Responsive image height adjustment
    function cardImgRatio() {
      var aimlImg = $(".aiml-deal");
      if (aimlImg.length) {
        aimlImg.each(function () {
          var aimlImageWidth = $(this).width();
          var height = (aimlImageWidth * 2) / 3;
          $(this).height(height);
        });
      }
    }
    cardImgRatio();
  });
}