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
    // Retrieve user data from local storage
    const userDataString = localStorage.getItem('userDataF') || localStorage.getItem('userDataA');

    if (!userDataString) {
        console.error("User data not available in local storage");
        // Optionally, handle the absence of user data and inform the user
    }

    // Parse user data from the string
    const userData = JSON.parse(userDataString);
    const mobileNumber = userData?.number || userData.mobile_no || userData.phoneNumber;  // Replace with your mobile number or get it dynamically
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

    // Make an AJAX request to fetch store data
    $.ajax({
        url: "https://flashweb.iweberp.com/api/vsd_designoicky_store",
        dataType: "json",
        success: function (data) {
            var cardHtml = ""; // Initialize cardHtml here
            for (var i = 0; i < data.length; i++) {
                var storeImageHtml = `<img src="${data[i].storeImageUrl}" width="100%" height="200px" class="rounded-start rounded-end" alt="Store Image">`;
                var additionalDiv = '';
                if (data[i].storeImageUrl.includes(',')) {
                    var storeImageUrls = data[i].storeImageUrl.split(',');
                    var carouselItemsHtml = '';
                    for (var j = 0; j < storeImageUrls.length; j++) {
                        carouselItemsHtml += `<div><img src="${storeImageUrls[j]}" width="100%" height="200px" class="rounded-start rounded-end" alt="Store Image"></div>`;
                    }
                    storeImageHtml = `<div class="slick-slider h-100 m-0 p-0">${carouselItemsHtml}</div>`;
                    additionalDiv = `<h5 class="card-title text-white fs-6 mb-2">For more details click here</h5>`;
                }

                cardHtml += `
                    <div class="col">
                        <div class="card h-100 border-0 shadow-sm  contact-card ${data[i].storeName}" data-storeurl="${data[i].storeUrl}" id="${data[i].storeName}" style="cursor:pointer;">
                            <div class="row g-0 p-3">
                                <div class="col-12 mx-auto" style="height:200px;">
                                    ${storeImageHtml}
                                </div>
                                <div class="col-12 d-flex">
                                    <div class="card-body my-auto py-0">
                                        <h5 class="card-title text-white product-name fs-5 mb-2 pt-2">${data[i].storeName}</h5>
                                        ${additionalDiv}
                                        <div class="d-flex w-100 ">
                                        <div class="me-3">
                                        <h5 class="card-title text-white fs-6 mb-0">Price</h5>
                                        <p class="mb-2"><span class=" fw-normal text-white-50"> ${data[i].storeDescription}</span></p>
                                        </div>
                                        <div>
                                        <h5 class="card-title text-white fs-6 mb-0">Phone No.</h5>
                                        <p class="mb-1"><span class=" fw-normal"><a href="tel:${data[i].storePhoneNo}" class="card-title tel fw-bold ${data[i].storeName}" id="${data[i].storePhoneNo}" style="color: #00cbff;">${data[i].storePhoneNo}</a></span></p>
                                        </div>
                                        </div>
                                        
                                        <h5 class="card-title text-white fs-6 d-flex align-items-center mb-1">👇 DM Here For Order  </h5>
                                        <a href="https://ig.me/m/vritti_kotian" target="_blank" class="card-title text-white text-black my-auto mx-2 insta-dm"><img src="./icons/instagram_icon.png" width="30px" height="30px" class="rounded-start rounded-end" alt="Store Image"></a><a href="whatsapp://send?phone=+919833465356" target="_blank" class="card-title text-white wa fw-bold my-auto" id="" style="color: #4b9cdb;"><img src="./icons/whatsapp_icon.png" width="30px" height="30px" class="rounded-start rounded-end" alt="Store Image"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }

            $("#appendData").html(cardHtml);
            $("main").show();
            $(".footer").show();
            $("#overlay").hide();
            // Initialize Slick Slider
            $('.slick-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                arrows: false,
                dots: false,
                fade: true,
                cssEase: 'linear'
            });
            
            // Add a click event handler to the cards
            $(".card").on("click", function (event) {
                event.preventDefault();
                event.stopPropagation();

                var storeUrl = $(this).data("storeurl");
                var storeName = $(this).find('.card-title text-white.product-name').text();

                // Tracking the click event using gtag
                gtag('event', 'resin_click_web', {
                    'resin_click_web_category': 'Link Click',
                    'resin_event_label': `Product Name:${event.currentTarget.id} User No:${mobileNumber} User Name:${fName}+${lName}`,
                    'transport_type': 'beacon'
                });
debugger
                // Check if the store has multiple images
                if ($(this).find('.slick-slider').length > 0) {
                    // If it does, extract images and open a modal popup
                    var carouselItems = $(this).find('.slick-slider .slick-slide');
                    var imagesHtml = "";
                    carouselItems.each(function () {
                        var imageSrc = $(this).find('img').attr('src');
                        imagesHtml += `<div class="col"><img src="${imageSrc}" class="img-fluid rounded-3" alt="Slide Image"></div>`;
                    });
                    $('#imageModal .modal-body .row').html(imagesHtml);
                    $('#imageModal .modal-title').text(storeName); // Set modal title to store name
                    $('#imageModal').modal('show');
                } else if (storeUrl !== null) {
                    // If not, open the storeUrl if available
                    window.open(storeUrl);
                } else {
                    // Handle the case when storeUrl is null (optional)
                    // For example, you can display an error message or perform some other action.
                }
            });
            // Add a click event handler specifically for the "Location" links
            $(".card .tel").on("click", function (event) {
                gtag('event', 'resin_click_web', {
                    'resin_click_web_category': 'Link Click',
                    'resin_event_label': `Dial - Product Name:${event.currentTarget.offsetParent.id} Product Tel:${event.currentTarget.id} User No:${mobileNumber} User Name:${fName}+${lName}`,
                    'transport_type': 'beacon'
                });
                // Allow the "Location" link to open in a new tab or window
                event.stopPropagation();
            });
            $(".card .insta-dm").on("click", function (event) {
                gtag('event', 'resin_click_web', {
                    'resin_click_web_category': 'Link Click',
                    'resin_event_label': `Insta-DM - Product Name:${event.currentTarget.offsetParent.id} Product InstaDM:${event.currentTarget.href} User No:${mobileNumber} User Name:${fName}+${lName}`,
                    'transport_type': 'beacon'
                });
                // Allow the "Location" link to open in a new tab or window
                event.stopPropagation();
            });
            $(".card .wa").on("click", function (event) {
                gtag('event', 'resin_click_web', {
                    'resin_click_web_category': 'Link Click',
                    'resin_event_label': `WA - Product Name:${event.currentTarget.offsetParent.id} Product WA DM:${event.currentTarget.href} User No:${mobileNumber} User Name:${fName}+${lName}`,
                    'transport_type': 'beacon'
                });
                // Allow the "Location" link to open in a new tab or window
                event.stopPropagation();
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        },
    });

});
