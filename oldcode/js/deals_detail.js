// Use JavaScript to retrieve the storeId and productId parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get('storeId');
const productId = urlParams.get('productId');
$(".footer").hide();
$("main").hide();
if (storeId !== null) {
    // The storeId is defined, proceed with fetching data and displaying it
    displayStoreProducts();
} else {
    // Handle the case where storeId is not defined or missing in the URL
    console.error('storeId is not defined in the URL.');
}

// Retrieve user data from local storage
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
// Function to fetch and display store products
async function displayStoreProducts() {
    const productList = document.getElementById('productList');

    try {
        // Make an API request to fetch store-specific product data
        const response = await fetch(`https://flashweb.iweberp.com/api/store_products?storeId=${storeId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        // Display the fetched data
        if (data && data.HyperLocalProduct && data.HyperLocalProduct.length > 0) {
            productList.innerHTML = '<h2 class="col-12 text-center d-none">Products:</h2>';
            data.HyperLocalProduct.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.classList.add('col');
                // console.log(product)
                const off = ((product.productMrp - product.productPrice) / product.productMrp) * 100
                productDiv.innerHTML = `    
        <div class="card h-100 rounded-4 border-0 shadow bg-white">
            <img src="${product.productImage}" class="card-img-top rounded-4 rounded-bottom" height="200px" alt="${product.productName}">
            <div class="card-body  text-center pb-0">
              <h5 class="card-title fw-bold mb-3">${product.productName}</h5>
              <h5 class="card-title fw-bold"><span style="color:#F34333;" class="fs-6 fw-normal me-2">${off.toFixed(0)}% off </span>₹${product.productPrice.toFixed(2)}</h5>
                <div class="d-flex align-items-center justify-content-center">
                    <p class="text-prim mb-2">MRP -&nbsp;</p>
                    <p class="text-prim text-decoration-line-through mb-2"> ₹${product.productMrp.toFixed(2)}</p>
                </div>
                <p class="small card-description">${product.productDescription}</p>
            </div>
            <div class="card-footer border-0 bg-transparent text-center pt-0 pb-4">
                <a href="#" id="grabDealLink" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-prim px-lg-5 fw-bold mx-auto ${product.productName}" style="background-color: #2e3192;">Grab This Deal</a>
            </div>
        </div>
                    
                `;
                productList.appendChild(productDiv);
                $(".footer").show();
                $("main").show();
                $("#overlay").hide();
                if (product.productDescription === null) {
                    // console.log(product.productDescription)
                    $('.card-description').hide();
                } else {

                }
                // Add this code inside the displayStoreProducts() function
                // after creating the product card elements
                // Add a click event listener to the .grab-deal-link within the productDiv
                // Add a click event listener to the .grab-deal-link within the productDiv
                const grabDealLink = productDiv.querySelector('#grabDealLink');
                if (grabDealLink) {
                    grabDealLink.addEventListener('click', (event) => {
                        $("#overlay").show();
                        // Get the product data for the clicked product card
                        const productData = {
                            storeId: product.storeId,
                            productId: product.productId,
                            productName: product.productName,
                            productPrice: product.productPrice,
                        };
                       
                    gtag('event', 'QR_click_web', {
                      'QR_click_web_category': 'Link Click',
                      'QR_click_label': `Product Name:${productData.productName},${productData.storeId} User No:${mobileNumber} User Name:${fName}+${lName}`,
                      'transport_type': 'beacon'
                    });
debugger
                        // Call the API here when the link is clicked, passing the product data
                        callApiForDeal(productData);
                    });
                }
            });
        } else {
            productList.innerHTML = '<p>No products found for this store.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        productList.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    }
}

// Function to call the API for the deal
async function callApiForDeal(productData) {
    try {
        // Extract product data from the passed object
        const { storeId, productId, productName, productPrice } = productData;

        // Make an API request to grab the deal
        const response = await fetch(`https://flashweb.iweberp.com/api/grab_qr?storeId=${storeId}&productId=${productId}&productName=${productName}&productPrice=${productPrice}`);
        // console.log(productData.productName )
        if (!response.ok) {
            throw new Error('API response was not ok.');
        }
        const responseData = await response.json();

        // Extract the AUTO_ID from the API response
        const autoId = responseData.AUTO_ID;
 
        // Handle the API response as needed, including the autoId
        // console.log('API response:', responseData);
        // Get the current date and time
        // Assuming you have the date and time as a string in the following format:
        const dateTimeString = new Date().toLocaleString();

        // Parse the input date and time string
        const dateTime1 = new Date(dateTimeString);

        // Create functions to pad single digits with leading zeros
        function padWithZero(number) {
            return number < 10 ? `0${number}` : number;
        }

        function padMilliseconds(milliseconds) {
            if (milliseconds < 10) {
                return `00${milliseconds}`;
            } else if (milliseconds < 100) {
                return `0${milliseconds}`;
            }
            return milliseconds;
        }

        // Extract date and time components
        const year = dateTime1.getFullYear();
        const month = padWithZero(dateTime1.getMonth() + 1); // Month is zero-based
        const day = padWithZero(dateTime1.getDate());
        const hours = padWithZero(dateTime1.getHours());
        const minutes = padWithZero(dateTime1.getMinutes());
        const seconds = padWithZero(dateTime1.getSeconds());
        const milliseconds = padMilliseconds(dateTime1.getMilliseconds());

        // Format the date and time in the desired format
        const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        // Now, you can use the autoId for further processing
        generateAndDisplayQRCode(autoId, productId, storeId, productName, productPrice, dateTime);
    } catch (error) {
        console.error('Error calling the API:', error);
    }
}
async function generateAndDisplayQRCode(autoId, productId, storeId, productName, productPrice, dateTime) {
    const qrCodeText = `${storeId}|${productId}|${productName}|${productPrice}|${dateTime}|${autoId}`;
    const qrCodeContainer = document.getElementById('qr-code-screen');

    try {
        // Generate QR code with options
        const qrCodeDataUrl = await QRCode.toDataURL(qrCodeText, {
            color: {
                dark: '#666666',  // QR Code color
                light: '#ffffff' // Background color
            }
        });

        // Create an image element for the QR code
        const qrCodeImage = document.createElement('img');
        qrCodeImage.src = qrCodeDataUrl;
        qrCodeImage.className = 'qr-code-image';
        qrCodeImage.className = 'w-100';

        // Clear previous contents
        qrCodeContainer.innerHTML = '';

        // Display the QR code in the container
        qrCodeContainer.appendChild(qrCodeImage);
        qrCodeContainer.style.display = 'block';
        $("#overlay").hide();
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}



// Call the function to display store products
displayStoreProducts();