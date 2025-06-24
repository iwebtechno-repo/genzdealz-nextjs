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
    <nav class="navbar navbar-light bg-light h-100 py-0">
      <div class="container-xl h-100">

        <div class=" h-100 d-flex w-25">
          <button class=" navbar-toggler border-0 shadow-none p-0 d-block" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <img class="menu-icon" src="./icons/bar.svg" alt="menu icon">
          </button>
          <div class="text-center h-100 align-items-center justify-content-md-center d-none">
            <a href="home" class="myIndex">
            <img class="h-100 genz-logo" height="102px" src="./icons/logo_transparent.png" alt="Logo">
          </a>
          </div>
          <!-- <a class="navbar-brand" href="#"><img src="./icons/header.png" class="img-fluid logo" alt=""></a> -->
        </div>
        
        <div class="text-center h-100 d-flex align-items-center justify-content-center w-50">
          <a href="home" class="d-block w-100 h-100 myIndex">
          <img class="h-100" src="./icons/logo_transparent.png" alt="Logo">
        </a>
        </div>
        <div class="d-flex align-items-center my-lg-0 text-white text-decoration-none w-25 justify-content-end">
          
          <div class="storeApps">
            <div class="showing h-100 align-items-center">
              <div class="px-0 my-auto align-items-center" id="iosApp">
              <a href="https://apps.apple.com/in/app/genzdealz-ai/id6504975486" id="iwebAndroidApp"
                  class="position-relative" target="_blank" style="z-index: 3;">
                  <img class="thestorelogos img-fluid d-none d-md-block"
                    src="https://static.vecteezy.com/system/resources/previews/012/871/374/large_2x/app-store-download-button-in-white-colors-download-on-the-apple-app-store-free-png.png"
                    alt="Get it on App Store">
                    <img class="thestorelogos img-fluid p-icon d-md-none"
                    src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                    alt="Get it on App Store">
                </a>
              
              </div>
              <div class="px-0 my-auto" id="androidApp" style="align-items: center;">
                <a href="https://play.google.com/store/apps/details?id=iweb.student.marketplace" id="iwebAndroidApp"
                  class="position-relative" target="_blank" style="z-index: 3;">
                  <img class="thestorelogos img-fluid d-none d-md-block"
                    src="https://static.vecteezy.com/system/resources/previews/012/871/364/large_2x/google-play-store-download-button-in-white-colors-download-on-the-google-play-store-free-png.png"
                    alt="Get it on Google Play">
                    <img class="thestorelogos img-fluid p-icon d-md-none"
                    src="./icons/p-store-icon.svg"
                    alt="Get it on Google Play">
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
    
    <!-- <div class="row h-100 justify-content-center showing">
      <div class="d-none d-md-block col-md-4 col-lg-4 h-100"></div>

      <div class="divLogo col-7 col-sm-6 col-md-4 col-lg-3 h-100 my-auto">
        <div class="text-center h-100 d-flex align-items-center justify-content-md-center">
          <img class="h-100" src="./icons/logo_transparent.png" alt="Logo">
        </div>
      </div>

      <div class="storeApps col-5 col-sm-5 col-md-4 col-lg-4">
        <div class=" row showing h-100 align-items-center">
        <div class="col-12 col-md-6 px-0" id="iosApp"></div>
        <div class="col-12 col-md-6 px-0 my-auto" id="androidApp" style="align-items: center;">
          <a href="https://play.google.com/store/apps/details?id=iweb.student.marketplace" id="iwebAndroidApp"
            class="position-relative" target="_blank" style="z-index: 3;">
            <img class="thestorelogos img-fluid"
              src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
              alt="Get it on Google Play">
          </a>
        </div>
      </div>
      </div>
    </div> -->
  </div>
  <div class="offcanvas offcanvas-start bg-blue" tabindex="-1" id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header d-flex pb-0 align-items-start border-bottom pb-3">
            <div class="ps-3">
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
          <div class="offcanvas-body pt-0 p-lg-0 justify-content-center bg-prim-new" style="">
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
              <li class="nav-item" id="giftcard">
                <a class="nav-link d-flex align-items-center" href="recharge"><i class="fa-solid fa-mobile pe-3 fs-6"></i>Recharge & Bills</a>
              </li>
              <li class="nav-item" id="giftcard">
                <a class="nav-link d-flex align-items-center" href="giftcards"><i class="fa-solid fa-gift pe-3 fs-6"></i>My Giftcards</a>
              </li>
              <li class="nav-item" id="giftcard">
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
          <div class="offcanvas-footer bg-prim-new">
              <!-- Display User Data -->
        <div class="d-flex align-items-center justify-content-center flex-column text-white" id="user-profile">
        </div>
        <div class="d-none align-items-center justify-content-center flex-column text-white" id="profile">
          
        </div>
          </div>
        </div>
</header>
        `;
        if (localStorage.getItem('authenticated') === 'true') {
          document.getElementById('signin').style.display = 'none';
        } else {
          // User is not authenticated, redirect to the login page or handle accordingly
          document.getElementById('giftcard').style.display = 'none';
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
    }
}
class SpecialFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="" id="footer">
    <div class="footer bg-light text-black text-center py-2">
      <p class="m-0 text-center fw-bold">Copyright @genzdealz.ai - A DPIIT Startup</p>
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