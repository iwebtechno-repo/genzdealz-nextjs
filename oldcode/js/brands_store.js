$(".footer, main, .top-fixed, .search-container").show();
$("#overlay").hide();

// Responsive image height adjustment
function screenSize() {
  const isMobile = window.innerWidth < 992;

  if (!isMobile) {
    window.location.href = "brands_store_detail";
  }
}

// Run on initial load
screenSize();

// Observe DOM changes
const observers = new MutationObserver(() => {
  screenSize();
});

// Observe the entire body or a specific container where images might be added dynamically
observers.observe(document.body, {
  childList: true,
  subtree: true,
});

// Also trigger on window resize to adjust image ratios dynamically
$(window).resize(function () {
  screenSize();
});

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
let myHeaders;

function loadData() {
  if (!isLoading && !allDataLoaded) {
    isLoading = true;

    // Add placeholders for loading
    let placeholderHtml = Array(12).fill().map(() => `
      <div class="col placeholder-col">
        <div class="card-container" style="cursor:pointer;">
              <div class="deal-logo">
                  <p class="placeholder-glow rounded-circle h-100">
                    <span class="placeholder col-12 rounded-circle h-100"></span>
                  </p>
              </div>
              <div class="membership-card">
                  <div class="title text-white">
                    <p class="placeholder-glow">
                      <span class="placeholder col-12"></span>
                    </p>
                  </div>
              </div>
              <div class="cashback-banner">
                  <div class="cashback px-2">
                    <p class="placeholder-glow m-0">
                      <span class="placeholder col-12"></span>
                    </p>
                  </div>
              </div>
        </div>
      </div>`).join("");

    $("#appendData").append(placeholderHtml);

    myHeaders = new Headers({
      "page_size": "30",
      "page": currentPage.toString(),
      "brand": $("#searchInput").val().toLowerCase()
    });

    fetch("https://flashweb.iweberp.com/api/getbrandsbyiweb", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    })
      .then((response) => response.json())
      .then((data) => {
        $(".placeholder-col").fadeOut();

        let cardHtml = data.map(item => `
          <div class="col real-col">
            <div class="card-container" data-src="${item.logoURL}" data-title="${item.brandName}" data-storeid="${item.brand_id}" data-cashback="${item.maxDiscount}" style="cursor:pointer;">
              <div class="deal-logo">
                  <img src="${item.logoURL}" class="rounded-circle h-100" alt="${item.brandName}" loading="lazy">
              </div>
              <div class="membership-card">
                  <p class="title text-white" title="${item.brandName}">${item.brandName}</p>
              </div>
              <div class="cashback-banner">
                  <p class="cashback">${item.maxDiscount}% CB</p>
              </div>
            </div>
          </div>`).join("");

        $("#appendData").append(cardHtml);

        currentPage++;
        isLoading = false;
        if (data.length === 0) allDataLoaded = true;

        $(".card-container").off("click").on("click", function () {
          let brandId = $(this).data("storeid");
          window.open(`brands_store_detail?storeId=${brandId}`, "_self");
        });
      })
      .catch((error) => {
        $(".placeholder-col").fadeOut();
        console.error("Failed to load data:", error);
        alert("Failed to load data. Please try again later.");
        isLoading = false;
      });
  }
}

function checkScroll() {
  if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
    loadData();
  }
}

$(document).ready(function () {
  $(window).scroll(throttle(checkScroll, 200));
  console.log($("#searchInput"))
  $("#searchInput").on("input", debounce(function () {
    console.log("Search input changed:", $(
      "#searchInput").val());
    $(".placeholder-col").fadeIn();
    $("#appendData").empty();
    currentPage = 1;
    allDataLoaded = false;
    loadData();
  }, 300));

  loadData();
});
