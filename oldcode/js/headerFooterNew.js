// Import the auth object from firebase-auth.js
import { auth }  from "./firebase_auth.js";
import { setupSearch } from './search.js';


function clearCache() {
  if ('caches' in window) {
      caches.keys().then(function(names) {
          for (let name of names) {
              caches.delete(name);
          }
      })
  }
}

// function reloadCSS() {
//   const links = document.getElementsByTagName('link');
//   for (let i = 0; i < links.length; i++) {
//       const link = links[i];
//       if (link.rel === 'stylesheet') {
//           link.href = link.href.split('?')[0] + '?v=' + new Date().getTime();
//       }
//   }
// }

// function reloadImages() {
//   const images = document.getElementsByTagName('img');
//   for (let i = 0; i < images.length; i++) {
//       const img = images[i];
//       img.src = img.src.split('?')[0] + '?v=' + new Date().getTime();
//   }
// }

// function reloadResources() {
//   reloadImages();
// }

// Call this function to clear cache and reload CSS and images
clearCache();

class SpecialHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="header">
  <div id="fixed-navbar">
    <nav class="navbar h-100 py-2">
      <div class="container-xl h-100 align-items-center">

        <div class="h-100 d-flex align-items-center d-lg-none">
          <button class=" navbar-toggler border-0 shadow-none p-0" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <img class="menu-icon" src="./icons/bar.svg" alt="menu icon">
          </button>
        </div>
        
        <div class="text-center h-100 d-flex mx-auto mx-lg-0 me-lg-auto ps-5 ps-lg-0">
          <a href="home" class="d-block w-100 h-100 myIndex">
          <img class="h-100" src="./icons/logo_transparent.png" alt="Logo">
        </a>
        </div>
        <div class="search-user-section d-flex align-items-center">
            <div class="search me-lg-4 px-2 px-lg-0">
              <div class="position-relative d-flex align-items-center">
              <form id="searchForm">
                <input type="text" id="searchHeader" class="form-control border-0 input-field rounded-pill" autocomplete="off" placeholder="Search any offers..." >
                </form>
                <div id="searchResults" class="position-absolute top-100 bg-white shadow p-3 rounded-4 text-third w-100 mt-2" style="max-height:300px; overflow:auto;display:none;"></div>
                <button id="searchButton" class="btn btn-prim position-absolute top-0 bottom-0 end-0 my-1 me-1 rounded-circle shadow p-0 d-flex align-items-center justify-content-center" style="height:38px;width:38px;"><i class="fa-solid fa-search text-white"></i></button>
              </div>
            </div>
            <div id="searchToggle" class="d-lg-none my-1 me-1 rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center" style="height:38px;width:38px;background-color:#f0efff;"><i class="fa-solid fa-search text-second"></i></div>
            <div class="user" id="user">
              <div class="profile-container dropdown-center">
                <div class="my-1 me-1 rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center" style="height:38px;width:38px;background-color:#f0efff;" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa fa-user-alt fs-4 py-2 px-2 text-second"></i>
                </div>
                <ul class="dropdown-menu dropdown-menu-end border-0 shadow rounded-4 text-center py-3" style="width: max-content;">
                  
                  <li class="px-2 pb-2">
                    <a href="profile" class=" text-second d-inline-block" title="Profile">
                      <span class="dropdown-items px-2 fw-bold">Profile</span>
                    </a>
                  </li>
                  
                  <li class="px-2 pb-2">
                    <a href="giftcards" class=" text-second d-inline-block" title="My Giftcard">
                      <span class="dropdown-items px-2 fw-bold">My Giftcards</span>
                    </a>
                  </li>
                  <li class="px-2 pb-2">
                    <a href="my_shared_subs" class=" text-second d-inline-block" title="My Shared Subscriptions">
                      <span class="dropdown-items px-2 fw-bold">My Shared Subscriptions</span>
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li class="px-2 pb-2 text-second"><span class="dropdown-items px-2 fw-bold pb-3" id="uName"></span></li>
                  <li><span class="dropdown-items text-danger px-2 fw-bold" title="Log out" style="cursor:pointer;" id="logoutDropdown"><i class="fa-solid fa-right-from-bracket pe-3"></i>Log out</span></li>
                </ul>
              </div>
            </div>
            <div class="no-user" id="noUser">
              <div class="profile-container">
                <a href="login" class="bg-light my-1 me-1 rounded-circle shadow-sm p-0 d-flex align-items-center justify-content-center" style="height:38px;width:38px">
                  <i class="fa fa-user-alt fs-4 py-2 px-2 text-second"></i>
                </a>
              </div>
            </div>
          </div>
      </div>
        <div class="user-reponsive w-100 bg-white py-1 py-lg-0" id="userResponsive" style="display:none;">
          </div>
    </nav>
    
    
  </div>
  <div class="offcanvas offcanvas-start bg-blue d-lg-none" tabindex="-1" id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header d-flex pb-0 align-items-start border-bottom pb-3 bg-dark-ppl">
            <div class="ps-4">
              <a href="home" class="myIndex">
              <img class="" src="./icons/logo_transparent.png" style="height:110px !important; width: auto !important;" alt="Logo">
            </a>
            </div>
            <a href="javascript:void(0) " class="text-reset p-0 ms-auto" data-bs-dismiss="offcanvas" aria-label="close">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" class="bi bi-x-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </a>
          </div>
          <div class="offcanvas-body pt-0 p-lg-0 justify-content-center" style="">
            <ul class="navbar-nav ps-0 pt-3 navigator">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="profile"><i class="fa-solid fa-user pe-3 fs-6"></i>Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link myIndex d-flex align-items-center" href="home"><i class="fa-solid fa-home pe-3 fs-6"></i>Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="corporate"><i class="fa-solid fa-wand-magic-sparkles pe-3 fs-6"></i>Corporate</a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="recharge"><i class="fa-solid fa-mobile pe-3 fs-6"></i>Recharge & Bills</a>
              </li>
              <li class="nav-item" id="giftcard">
                <a class="nav-link d-flex align-items-center" href="giftcards"><i class="fa-solid fa-gift pe-3 fs-6"></i>My Giftcards</a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="my_shared_subs"><i class="fa-solid fa-share pe-3 fs-6"></i>My Shared Subscriptions</a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="contact-us"><i class="fa-solid fa-address-card pe-3 fs-6"></i>Contact Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="faqs"><i class="fa-solid fa-comments pe-3 fs-6"></i>F.A.Qs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center" href="privacy_policy"><i class="fa-solid fa-shield pe-3 fs-6"></i>Privacy Policy</a>
              </li>
              <li class="nav-item" id="signin">
                <a class="nav-link d-flex align-items-center" href="login"><i class="fa-solid fa-sign-in pe-3 fs-6"></i>Sign In</a>
              </li>
            </ul>
          </div>
          <div class="offcanvas-footer">
              <!-- Display User Data -->
        <div class="d-flex align-items-center justify-content-center flex-column text-second" id="user-profile">
        </div>
        <div class="d-none align-items-center justify-content-center flex-column text-second" id="profile">
          
        </div>
          </div>
        </div>
</header>
        `;
        if (localStorage.getItem('authenticated') === 'true') {
          document.getElementById('signin').style.display = 'none';
          document.getElementById('noUser').style.display = 'none';

          let userDataF = JSON.parse(localStorage.getItem("userDataF"));
          document.getElementById('uName').innerHTML = `${userDataF['name']}`;
          document.getElementById('logoutDropdown').addEventListener('click', function() {
            auth.signOut()
                .then(() => {
                    localStorage.setItem('authenticated', 'false');
                    window.location.href = 'login';
                    // Clear all items in local storage
            localStorage.clear();
                })
                .catch((error) => {
                    console.error('Error during sign-out:', error.message);
                });
          });
        } else {
          // User is not authenticated, redirect to the login page or handle accordingly
          document.getElementById('giftcard').style.display = 'none';
          document.getElementById('user').style.display = 'none';
        }
        // Get all navigation links
        const navLinks = this.querySelectorAll('.nav-link');

        // Determine the current page URL
        const currentPageUrl = window.location.href;

        // Iterate through the links and add the "active" class to the matching link
        navLinks.forEach(link => {
            const linkUrl = link.getAttribute('href');
            if (currentPageUrl.includes(linkUrl)) {
                link.classList.add('active');
            }
        });

        // Setup search logic from separate file
        setupSearch();
    }
}
class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="d-none d-lg-block">
  <div class="footer py-2">
     <div class="container">
      <div class="row border-bottom border-top border-3 pt-5 pb-3">
        <div class="col-3 my-auto">
          <div class="">
            <img src="/icons/logo_transparent.png" class="w-50" alt="">
          </div>
          
        </div>
        <div class="col-3">
          <h5 class="mb-4">Quick Links</h5>
          <ul class="list-unstyled">
            <li class="fw-bold text-prim pb-3"><a href="contact-us" class="fw-bold text-prim pb-3">Contact Us</a></li>
            <li class="fw-bold text-prim pb-3"><a href="privacy_policy" class="fw-bold text-prim pb-3">Privacy Policy</a></li>
            <li class="fw-bold text-prim pb-3"><a href="my_shared_subs" class="fw-bold text-prim pb-3">My Shared Subscriptions</a></li>
            <li class="fw-bold text-prim"><a href="corporate" class="fw-bold text-prim pb-3">Corporate</a></li>
          </ul>
        </div>
        <div class="col-3">
          <h5 class="mb-4">Customer Support</h5>
          <ul class="list-unstyled">
            <li class="fw-bold text-prim pb-3"><a href="mailto:yo@genzdealz.ai"
              class="fw-bold text-prim pb-3">Mail: yo@genzdealz.ai</a></li>
            <li class="fw-bold text-prim pb-3"><a href="tel:18008890695" class="fw-bold text-prim pb-3">Phone: 1800-889-0695</a></li>
            <li class="fw-bold text-prim"><a href="faqs" class="fw-bold text-prim pb-3">FAQs</a></li>
          </ul>
        </div>
        <div class="col-3">
          <h5 class="mb-4 ps-3">Social</h5>
          <ul class="list-unstyled d-flex fs-2 mb-0 ps-3">
          <li class="fw-bold text-prim pb-2 me-3 deal-card"><a href="whatsapp://send?phone=+919322655704" class="fw-bold text-prim pb-3"><i class="fa-brands fa-square-whatsapp" style="color: #00d757;"></i></a></li>
          <li class="fw-bold text-prim pb-2 me-3 deal-card"><a href="https://X.com/AkshayiWeb" class="fw-bold text-prim pb-3"><i class="fa-brands fa-square-x-twitter" style="color: #000000;"></i></a></li>
          <li class="fw-bold text-prim pb-2 me-3 deal-card"><a href="https://www.linkedin.com/company/genzdealz?originalSubdomain=in" class="fw-bold pb-3"><i class="fa-brands fa-linkedin" style="color: #0a66c2;"></i></a></li>
          <li class="fw-bold text-prim me-2 deal-card"><a href="https://www.instagram.com/genzdealz.ai" class="fw-bold text-prim pb-3"><i class="fa-brands fa-square-instagram" style="background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i></a></li>
          </ul>
          <div>
            <div>
              <a href="https://apps.apple.com/in/app/genzdealz-ai/id6504975486" class="position-relative" target="_blank">
                <img src="https://static.vecteezy.com/system/resources/previews/012/871/374/large_2x/app-store-download-button-in-white-colors-download-on-the-apple-app-store-free-png.png" style="width:60%"
                    alt="Get it on App Store">
              </a>
            </div>
            <div>
              <a href="https://play.google.com/store/apps/details?id=iweb.student.marketplace" class="position-relative" target="_blank">
                <img src="https://static.vecteezy.com/system/resources/previews/012/871/364/large_2x/google-play-store-download-button-in-white-colors-download-on-the-google-play-store-free-png.png" style="width:60%"
                    alt="Get it on Google Play">
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center py-5 mb-5">
          <p class="m-0 text-center fw-bold">Copyright @genzdealz.ai - A DPIIT Startup</p>
        </div>
      </div>
     </div>
  </div>
</footer>
  <div class="overlay" id="overlay" >
    <div class="spinner"></div>
  </div>
        `;
        function showOverlay() {
          document.getElementById('overlay').style.display = 'flex';
        }
        
        
        // Simulate a loading process (e.g., AJAX request) that takes 3 seconds
        showOverlay();
    }
}
customElements.define('special-footer', SpecialFooter)
customElements.define('special-header', SpecialHeader)


// Move .search into #userResponsive on mobile
function moveSearchToMobileContainer() {
  const $search = $('.search');
  const $userResponsive = $('#userResponsive');
  const $searchParent = $('.search-user-section');

  if (window.innerWidth <= 991) {
    if (!$userResponsive.find('.search').length) {
      $search.appendTo($userResponsive);
    }
  } else {
    if (!$searchParent.find('.search').length) {
      $search.prependTo($searchParent);
    }
  }
}

// Slide toggle
$('#searchToggle').click(function () {
  $('#userResponsive').slideToggle();
});

// Initial move and on resize
moveSearchToMobileContainer();
$(window).on('resize', moveSearchToMobileContainer);

function getOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Mobile OS detection
  if (/windows phone/i.test(userAgent)) {
      $("#iosApp").hide();
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      $("#iosApp").hide();
      $(".divLogo").addClass("ms-2");
      return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      $("#androidApp").hide();
      $(".divLogo").addClass("ms-2");
      return "iOS";
  }

  // Desktop OS detection
  if (/Win(dows )?NT/.test(userAgent)) {
    $("#iosApp").hide();
      $(".divLogo").addClass("ms-2");
      return "Windows";
  }

  if (/Mac/.test(userAgent) && !/iPhone|iPad|iPod/.test(userAgent)) {
    $("#androidApp").hide();
    $(".divLogo").addClass("ms-2");
      return "macOS";
  }else{
    $("#iosApp").hide();
      $(".divLogo").addClass("ms-2");
  }

  if (/Linux/.test(userAgent)) {
      return "Linux";
  }

  return "unknown";
}

// Call the function to apply the detection logic
var os = getOperatingSystem();
// console.log("Detected OS: " + os);