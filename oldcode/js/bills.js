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
if (!userId) {
    console.error("userId not found in localStorage.");
    // Handle the error, e.g., redirect to login or show an error message
} else {
    const userDocRef = doc(db, "usersCollection", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        localStorage.setItem("userDataF", JSON.stringify(userData));
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
        //
    }
}

// Cashfree mode section ///////------------
let cashfree = Cashfree({
    mode: "production",
});
// sendVerificationCode();
// Helper to display toast messages
    const toastContainer = document.getElementById("toastContainer");
    function showToast(message, isError = false) {
        // toastContainer.innerHTML = ""; // Clear previous toasts
        const toast = document.createElement("div");
        toast.className = `toast align-items-center mb-2 text-bg-${isError ? "danger" : "success"} border-0`;
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
const rightContainer = document.getElementById('rightContainer');
const offcanvasBody = document.getElementById('offcanvasBody');
const offcanvasElement = document.getElementById('bottomOffcanvas');
const resHistoryContainer = document.getElementById('resHistoryContainer');
const historyContainer = document.getElementById('historyContainer');
let offcanvas;
const isMobile = window.innerWidth < 992;


let offerData = {}; // Global variable

async function fetchOfferData() {
    try {
        const response = await fetch("https://flashweb.iweberp.com/api/genz_exclusive_offer");
        const data = await response.json();
        offerData = data[0]; // Store globally
        if (offerData.scheme_on_off === true) {
            document.getElementById("minOrderValue").textContent = `₹${offerData.min_order_value}`;
            document.getElementById("rechargeFlatOff").textContent = `₹${offerData.recharge_flat_off}`;

            // Show the modal
            const offerModal = new bootstrap.Modal(document.getElementById("offerModal"));
            offerModal.show();
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// ✅ Wait for fetch before logging
(async function () {
    await fetchOfferData();
    // console.log("Offer Data (After Fetch):", offerData); // Now data is available


    // Function to move rightContainer
    function moveRightContainer() {

        if (isMobile) {
            // Move rightContainer to offcanvasBody if not already moved
            if (!offcanvasBody.contains(rightContainer)) {
                offcanvasBody.appendChild(rightContainer);
                rightContainer.classList.remove('d-none', 'd-lg-block'); // Make it visible
            }
            if (!resHistoryContainer.contains(historyContainer)) {
                resHistoryContainer.appendChild(historyContainer);
                // rightContainer.classList.remove('d-none', 'd-lg-block'); // Make it visible
            }
        } else {
            // Move rightContainer back to its original location if screen size is larger
            const originalParent = document.querySelector('.col-lg-8.col-xl-9');
            const originalParentHis = document.querySelector('.h-100.mt-2.his');
            if (originalParent && !originalParent.contains(rightContainer)) {
                originalParent.appendChild(rightContainer);
                rightContainer.classList.add('d-none', 'd-lg-block'); // Hide it for large screens
            }

            if (originalParentHis && !originalParentHis.contains(historyContainer)) {
                originalParent.appendChild(historyContainer);
                // rightContainer.classList.add('d-none', 'd-lg-block'); // Hide it for large screens
            }
        }
    }

    // Function to show offcanvas
    function showOffcanvas() {
        if (!offcanvas) {
            // Initialize offcanvas with no backdrop
            offcanvas = new bootstrap.Offcanvas(offcanvasElement, { backdrop: false });
        }
        offcanvas.show(); // Show the offcanvas
    }

    // Run moveRightContainer on page load and resize
    moveRightContainer();
    window.addEventListener('resize', moveRightContainer);


    // Example: Retrieving from from the query parameter ///////--------
    const baseURL = window.location.origin;

    // Function to fetch BBPS Options Code Only
    async function fetchBBPSOptions() {
        // Define the API URL
        const apiUrl = "https://flashweb.iweberp.com/api/getBBPSOptionsCodeOnly";

        // Show a loading message (if applicable)
        // console.log("Fetching data...");

        // Fetching data from the API
        fetch(apiUrl)
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Convert response to JSON
            })
            .then(data => {
                // Handle the data returned by the API
                // console.log("Data fetched successfully:", data);
                // You can process the data here (e.g., update UI or state)
            })
            .catch(error => {
                // Handle any errors that occur during the fetch
                console.error("Error occurred while fetching data:", error.message);
            })
            .finally(() => {
                // Code to execute after fetch is complete, regardless of success or failure
                // console.log("Fetch operation completed.");
            });
    }

    // Call the function
    fetchBBPSOptions();
    // Recharge code for operator and circle 

    

    // DOM Elements
    const mNumberInput = document.getElementById("mNumber");
    const circleMenu = document.getElementById("circleMenu");
    const operatorMenu = document.getElementById("operatorMenu");
    const circleDropdown = document.getElementById("circleDropdown");
    const operatorDropdown = document.getElementById("operatorDropdown");
    // const checkPlansBtn = document.getElementById("checkPlansBtn");
    // const historyContainer = document.getElementById("historyContainer");
    const allPlansContainer = document.getElementById("allPlansContainer");

    let selectedCircle = null;
    let selectedCircleName = null;
    let selectedOperator = null;
    let selectedOperatorName = null;
    let selectedOperatorImage = null;
    let selectedOperatorDiscount = null;
    let debounceTimeout;

    // Debounce helper
    function debounce(func, delay) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(func, delay);
    }

    let circles = []; // To store all circle data
    let operators = []; // To store all operator data
    // let circlesLoaded = false;
    // let operatorsLoaded = false;
    // Load circles and store them
    function loadCircles() {
        $("#overlay").show();

        circleMenu.innerHTML = `
        <input type="text" id="circleSearch" class="form-control mb-2" placeholder="Search circles..." />
        <div id="circleList"></div>
    `;

        fetch("https://flashweb.iweberp.com/api/getBBPSCircles")
            .then((response) => response.json())
            .then((data) => {
                if (data.success !== false) {
                    circles = data.sort((a, b) => a.name.localeCompare(b.name));
                    $("#overlay").hide();

                    // Render the initial circle menu
                    renderCircleMenu(circles);

                    // Add search functionality
                    const searchInput = document.getElementById("circleSearch");
                    searchInput.addEventListener("input", () => filterCircles(searchInput.value));
                } else {
                    $("#overlay").hide();
                    showToast(data.message || "Failed to fetch circles!", true);
                }
            })
            .catch((error) => {
                $("#overlay").hide();
                console.error("Error fetching circles:", error);
                showToast("Error fetching circles.", true);
            });
    }

    function renderCircleMenu(filteredCircles) {
        const circleList = document.getElementById("circleList");
        circleList.innerHTML = filteredCircles
            .map(
                (circle) =>
                    `<button class="dropdown-item text-prim" data-id="${circle.id}" data-name="${circle.name}">${circle.name}</button>`
            )
            .join("");
    }

    function filterCircles(query) {
        const filteredCircles = circles.filter((circle) =>
            circle.name.toLowerCase().includes(query.toLowerCase())
        );

        // Update the list of circles without affecting the search input
        renderCircleMenu(filteredCircles);
    }


    // Load operators and store them
    function loadOperators() {
        $("#overlay").show();

        // Initialize operator menu with search input and operator list
        operatorMenu.innerHTML = `
        <input type="text" id="operatorSearch" class="form-control mb-2" placeholder="Search operators..." />
        <div id="operatorList"></div>
        `;

        // Fetch operators
        fetch("https://flashweb.iweberp.com/api/getBBPSOperatorsByOptionCode?optionCode=PREPAID")
            .then((response) => response.json())
            .then((data) => {
                if (data.success !== false) {
                    operators = data; // Store operators for filtering or validation

                    // Hide the loading overlay
                    $("#overlay").hide();

                    // Render all operators initially
                    renderOperatorMenu(operators);

                    // Add search functionality
                    const searchInput = document.getElementById("operatorSearch");
                    searchInput.addEventListener("input", () =>
                        filterOperators(searchInput.value)
                    );
                } else {
                    $("#overlay").hide();
                    showToast(data.message || "Failed to fetch operators!", true);
                }
            })
            .catch((error) => {
                $("#overlay").hide();
                console.error("Error fetching operators:", error);
                showToast("Error fetching operators.", true);
            });
    }

    // Render operator menu
    function renderOperatorMenu(filteredOperators) {
        const operatorList = document.getElementById("operatorList");

        operatorList.innerHTML = filteredOperators
            .map((operator) => {
                const discountPercentage = (operator.discountPercentage / 1000).toFixed(2);
                return `
                <button class="dropdown-item text-prim d-flex align-items-center" 
                    data-id="${operator.id}" 
                    data-discount="${discountPercentage}" 
                    data-name="${operator.name}" 
                    data-image="${operator.image}">
                    <span class="me-2">
                        <img src="${operator.image}" height="20px" width="20px" class="rounded-circle" alt="${operator.name}">
                    </span>
                    <span>${operator.name}</span>
                    <small class="ms-auto me-2 bg-gradient rounded-pill py-1 px-3">
                        ${discountPercentage}% Off
                    </small>
                </button>`;
            })
            .join("");
    }

    // Filter operators based on search query
    function filterOperators(query) {
        const filteredOperators = operators.filter((operator) =>
            operator.name.toLowerCase().includes(query.toLowerCase())
        );

        // Render the filtered operators
        renderOperatorMenu(filteredOperators);
    }


    // Wait for both to load before validating
    Promise.all([loadCircles(), loadOperators()])
        .then(() => {
            // console.log("Circles and Operators loaded successfully.");
            $("#overlay").hide();
        })
        .catch(error => {
            $("#overlay").hide();
            console.error("Error loading Circles or Operators:", error);
        });
    // Validate fetched operator and circle
    function validateAndFetchOperator(input) {
        // if (!circlesLoaded || !operatorsLoaded) {
        //     console.warn("Circles or Operators not loaded yet.");
        //     return;
        // }
        const value = input.value;
        // Fetch operator details when the mobile number reaches 10 digits
        if (value.length === 10) {
            $("#overlay").show();
            fetch(`https://flashweb.iweberp.com/api/fetchMobileOperator?mobileNumber=${value}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success !== false) {
                        // console.log("Fetched operator details:", data);
                        // Check if the fetched circleId and operatorId exist in the loaded data
                        const normalize = str => str?.toLowerCase().replace(/[\s/]+/g, ' ').trim();
                        // Pre-normalize circles once when they are loaded to avoid repeated calls to normalize() inside find()
                        const normalizedCircles = circles.map(c => ({
                            ...c,
                            normalizedName: normalize(c.name)
                        }));
                        // 🧪 Check if circles are loaded
                        if (!normalizedCircles || !normalizedCircles.length) {
                            console.warn("Circles not loaded yet.");
                            showToast("Circle list not loaded yet.", true);
                            $("#overlay").hide();
                            return;
                        }

                        // 🪵 Debug logs
                        console.log("API returned circle:", `"${data.circle}"`);
                        console.log("API returned circleId:", data.circleId);
                        console.log("Normalized API circle:", `"${normalize(data.circle)}"`);

                        // ✅ Try exact match first
                        let matchedCircle = normalizedCircles.find(circle =>
                            (data.circleId && circle.id === data.circleId) ||
                            (!data.circleId && circle.normalizedName === normalize(data.circle))
                        );

                        // 🔁 Optional: fallback to partial match if exact match fails
                        if (!matchedCircle && data.circle) {
                            matchedCircle = normalizedCircles.find(circle =>
                                circle.normalizedName.includes(normalize(data.circle))
                            );
                            if (matchedCircle) {
                                console.warn("Used fallback partial match for circle:", matchedCircle.name);
                            }
                        }

                        // ✅ Match operator
                        const matchedOperator = operators.find(operator =>
                            operator.id === data.operatorId || operator.name.toLowerCase() === data.operator.toLowerCase()
                        );

                        if (!matchedCircle) {
                            console.warn("No matching circle found for:", data.circle);
                            showToast(`Could not match circle "${data.circle}"`, true);
                        }

                        console.log("Matched Circle:", matchedCircle, "Matched Operator:", matchedOperator);
                        // console.log("Matched Circle:", matchedCircle, "Matched Operator:", matchedOperator);
                        if (matchedCircle && matchedOperator) {
                            // Replace dropdown content with matched data
                            operatorDropdown.innerHTML = `
          <span class="me-2">
            <img src="${matchedOperator.image}" height="20px" width="20px" class="rounded-circle">
          </span>
          ${matchedOperator.name} <small class="ms-auto me-3 bg-gradient rounded-pill py-1 px-3">${matchedOperator.discountPercentage / 1000}% Off</small>`;
                            operatorDropdown.disabled = true;
                            operatorMenu.classList.remove("show")

                            circleDropdown.innerText = matchedCircle.name;
                            circleDropdown.disabled = true;
                            circleMenu.classList.remove("show")
                            // Update selected values
                            selectedCircle = matchedCircle.id;
                            selectedCircleName = matchedCircle.name;
                            selectedOperator = matchedOperator.id;
                            selectedOperatorName = matchedOperator.name;
                            selectedOperatorImage = matchedOperator.image;
                            selectedOperatorDiscount = matchedOperator.discountPercentage / 1000;

                            // Enable the "Check Plans" button
                            updatecheckPlansBtnState();
                            $("#overlay").hide();
                        } else {
                            $("#overlay").hide();
                            showToast("Fetched operator or circle doesn't match available options!", true);
                        }
                    } else {
                        $("#overlay").hide();
                        showToast(data.errorMsg || "Failed to fetch operator details!", true);
                    }
                })
                .catch((error) => {
                    $("#overlay").hide();
                    console.error("Error fetching operator details:", error);
                    showToast("Error fetching operator details.", true);
                });
        } else {
            operatorDropdown.disabled = false;
            circleDropdown.disabled = false;
        }
    }

    function positionMenu(menu, trigger) {
        const rect = trigger.getBoundingClientRect();
        const menuHeight = menu.offsetHeight;
        const spaceBelow = window.innerHeight - rect.bottom;

        if (spaceBelow < menuHeight + 20) {
            menu.classList.add("drop-up");
        } else {
            menu.classList.remove("drop-up");
        }
    }


    // Select circle
    function selectCircle(id, name) {
        selectedCircle = id;
        selectedCircleName = name;
        circleDropdown.innerText = name;
        circleMenu.classList.remove("show");
        updatecheckPlansBtnState();
    }

    // Select operator
    function selectOperator(id, name, image, discount) {
        selectedOperator = id;
        selectedOperatorName = name;
        selectedOperatorImage = image;
        selectedOperatorDiscount = discount;

        operatorDropdown.innerHTML = `
<span class="me-2">
  <img src="${image}" height="20px" width="20px" class="rounded-circle">
</span>
${name || "Select Operator"} 
 <small class="ms-auto me-3 bg-gradient rounded-pill py-1 px-3">${discount}% Off</small>`;
        operatorMenu.classList.remove("show");
        updatecheckPlansBtnState();
    }
    checkPlansBtn.addEventListener('click', function () {
        const isMobile = window.innerWidth < 992;

        if (isMobile) {
            showOffcanvas(fetchPlansAndRender());
        } else {
            fetchPlansAndRender();
        }
    });
    // Update "Check Plans" button state
    function updatecheckPlansBtnState() {
        checkPlansBtn.disabled = !(selectedCircle && selectedOperator);
        const planDetailsContainer = document.getElementById("planDetailsContainer");
        planDetailsContainer.innerHTML = "";
        planDetailsContainer.style.display = "none";
    }
    // Update "Check Plans" button state
    async function fetchPlansAndRender() {
        $("#overlay").show();
        const planTabs = document.getElementById("planTabs");
        const plansContent = document.getElementById("plansContent");
        const planDetailsContainer = document.getElementById("planDetailsContainer");
        const apiURL = `https://flashweb.iweberp.com/api/getMobilePlansByOperatorAndCircle?operatorId=${selectedOperator}&circleId=${selectedCircle}`;

        try {
            // Reset and hide selected plan details
            planDetailsContainer.innerHTML = "";
            planDetailsContainer.style.display = "none";

            // Fetch data from the API
            const response = await fetch(apiURL);
            if (!response.ok) throw new Error("Failed to fetch plans");

            const data = await response.json();

            if (!data || data.length === 0) {
                $("#overlay").hide();
                showToast("No plans available.", true);
                historyContainer.style.display = "block";
                allPlansContainer.style.display = "none";
                if (isMobile) {
                    offcanvas.hide();
                }
                return;
            }

            historyContainer.style.display = "none";
            allPlansContainer.style.display = "flex";

            // Group plans by type
            const groupedPlans = data.reduce((acc, plan) => {
                if (!acc[plan.type]) acc[plan.type] = [];
                acc[plan.type].push(plan);
                return acc;
            }, {});

            // Clear existing tabs and content
            planTabs.innerHTML = "";
            plansContent.innerHTML = "";

            // Populate tabs and content
            Object.keys(groupedPlans).forEach((type, index) => {
                const sectionId = `section-${type.replace(/\s+/g, "-").toLowerCase()}`;
                planTabs.innerHTML += `
                <li id="tab-${sectionId}">
                    <a class="nav-link fs-6 fw-bold ${index === 0 ? "active-section" : ""}" href="#${sectionId}">
                        ${type}
                    </a>
                </li>`;
                plansContent.innerHTML += `
                <div class="section container-fluid" id="${sectionId}">
                    
                    <div class="row align-items-stretch">
                        <div class="col-12 mb-1 text-start section-header"><h5>${type}</h5></div>
                        ${groupedPlans[type]
                        .map(plan => renderPlanCard(plan, selectedOperatorDiscount, $("#overlay").show()))
                        .join("")}
                    </div>
                </div>`;

                // Function to check screen size and show offcanvas

                // showOffcanvas();
                $("#overlay").hide();
            });

            // Attach scroll and navigation event handlers
            setupScrollNavigation();

            // Attach search event handler
            function debounce(func, delay) {
                let timeout;
                return (...args) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func(...args), delay);
                };
            }

            // Apply debounce to the search input event
            const searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("input", debounce(() => filterPlans(groupedPlans), 300));



        } catch (error) {
            $("#overlay").hide();
            console.error("Error fetching plans:", error);
            showToast("Please select Circle and Operator.", true);
        }
    }

    function renderPlanCard(plan, selectedOperatorDiscount) {
        $("#overlay").hide();
        const { id, price, dataBenefit, talktime, validity, desc } = plan;
        const discountedPrice = (price - (price * selectedOperatorDiscount) / 100).toFixed(2);
        const escapedDesc = desc
            ? desc.replace(/[^\x00-\x7F]/g, "") // Remove weird non-ASCII characters
                .replace(/\s+/g, " ")           // Remove extra spaces
                .trim()
            : "";
        return `
        <div class="col-lg-6 col-xl-4 mb-3 plan-card" data-price="${price}" data-desc="${desc}" data-validity="${validity}">
            <div class="card rounded-4 shadow bg-white border-0 h-100">
                <div class="card-body position-relative pb-0" onclick="renderSelectedPlan('${id}', ${selectedOperatorDiscount}, ${discountedPrice}, ${price}, '${dataBenefit}', ${talktime}, '${validity}', '${escapedDesc}')" style="cursor:pointer;">
                    <small class="bg-danger rounded-pill py-0 px-2 position-absolute text-white" style="top:-10px; right:-5px;font-size:12px;">${selectedOperatorDiscount}% Off</small>
                    <div class="d-flex align-items-center mb-2 justify-content-between">
                        <div>
                            <h5 class="card-text mb-0 text-second fw-bold">₹${discountedPrice}</h5>
                            <small class="card-title text-decoration-line-through text-muted">₹${price}</small>
                        </div>
                        <div style="display: ${dataBenefit ? 'block' : 'none'};">
                            <p class="card-text text-prim mb-0 fw-bold">${dataBenefit || "N/A"}</p>
                            <small class="card-title text-muted">Data</small>
                        </div>
                        <div style="display: ${talktime > 0 ? 'block' : 'none'};">
                            <p class="card-text text-prim mb-0 fw-bold">${talktime || "N/A"}</p>
                            <small class="card-title text-muted">Talktime</small>
                        </div>
                        <div style="display: ${validity !== "- days" && validity !== "NA days" ? 'block' : 'none'};">
                            <p class="card-text text-prim mb-0 fw-bold">${validity}</p>
                            <small class="card-title text-muted">Validity</small>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent border-0 pt-0 pb-3">
                    <div class="position-relative" style="display: ${desc ? 'block' : 'none'};">
                        <button class="dropdown-toggle w-100 p-3 py-2 border-0 rounded-4 fw-bold text-center shadow text-white btn-prim" type="button" data-bs-toggle="dropdown">
                            See Plan Details
                        </button>
                        <ul class="dropdown-menu p-3 border-0 rounded-3 shadow">
                            ${escapedDesc || "No Plan Details available"}
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;



    }

    window.renderSelectedPlan = function (
        planId,
        selectedOperatorDiscount,
        price,
        oldPrice,
        dataBenefit,
        talktime,
        validity,
        escapedDesc
    ) {


        $("#overlay").show();
        $(".recharge-form").hide(); // You can also use .slideToggle() or .fadeToggle()
        // $("#toggleIcon").toggleClass("fa-angle-down fa-angle-up");
        // const rechargeForm = document.getElementsByClassName("recharge-form");
        const mNumber = document.getElementById("mNumber").value;
        // console.log("operator:", selectedOperator, "planId:", planId, "mNumber:", mNumber);
        if (isMobile) {
            offcanvas.hide();
        }
        const planDetailsContainer = document.getElementById("planDetailsContainer");
        planDetailsContainer.style.display = "block";
        planDetailsContainer.innerHTML = `
            <div class="col-12"><h5>Selected Plan Details</h5></div>
            <div class="col-12 mb-3">
                <div class="card rounded-4 shadow bg-white border-0">
                    <div class="card-body position-relative pb-0">
                        <small class="bg-danger rounded-pill py-0 px-2 position-absolute text-white" style="top:-10px; right:-5px;font-size:12px;"">
                            ${selectedOperatorDiscount || 0}% Off
                        </small>
                        <div class="d-flex align-items-center mb-2 justify-content-between">
                            <div>
                                <h5 class="card-text mb-0 text-second fw-bold">₹${price}</h5>
                                <small class="card-title text-decoration-line-through text-muted">₹${oldPrice}</small>
                            </div>
                            <div style="display: ${dataBenefit && dataBenefit !== "null" ? 'block' : 'none'};">
                                <p class="card-text text-prim mb-0 fw-bold">${dataBenefit || "N/A"}</p>
                                <small class="card-title text-muted">Data</small>
                            </div>
                            <div style="display: ${talktime > 0 ? 'block' : 'none'};">
                                <p class="card-text text-prim mb-0 fw-bold">${talktime || "N/A"}</p>
                                <small class="card-title text-muted">Talktime</small>
                            </div>
                            <div style="display: ${validity !== "- days" && validity !== "NA days" ? 'block' : 'none'};">
                                <p class="card-text text-prim mb-0 fw-bold">${validity}</p>
                                <small class="card-title text-muted">Validity</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-0 pt-0 pb-3">
                    <div class="position-relative" style="display: ${escapedDesc ? 'block' : 'none'};">
                            <button class="dropdown-toggle w-100 p-3 py-2 border-0 rounded-4 text-center shadow text-white btn-prim" type="button" data-bs-toggle="dropdown">
                                See Plan Details
                            </button>
                            <ul class="dropdown-menu p-3 border-0 rounded-3 shadow">
                                ${escapedDesc.replace(/\n/g, "<br>") || "No Plan Details available"}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center mt-3 pb-lg-3 mb-4 mb-lg-0">
                <button id="rechargeButton" class="btn w-100 p-3 py-2 border-0 rounded-4 text-center mx-auto d-flex fw-bold shadow text-white btn-prim" disabled>
                    <div class="spinner-border text-white loader d-none mx-auto" style="height: 1.5rem; width: 1.5rem;"
                        role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div><span class="text-buy text-b fw-bold d-block mx-auto">Recharge</span>
                </button>
            </div>`;

        // Add event listener for enabling Recharge button based on mNumber length
        const rechargeButton = document.getElementById("rechargeButton");
        const mNumberInput = document.getElementById("mNumber");
        setTimeout(function () {
            $("#overlay").hide();
            $("#planDetailsContainer").show();
        }, 1000);
        $("#planDetailsContainer").hide();
        if (mNumberInput.value.length === 10) {
            rechargeButton.disabled = false;
        } else {
            rechargeButton.disabled = true;
        }
        // mNumberInput.addEventListener("input", () => {
        // });

        // Add click event to Recharge button
        rechargeButton.addEventListener("click", () => {
            const mNumberValue = mNumberInput.value.trim();

            // Validate inputs
            if (
                mNumberValue.length === 10 &&
                selectedOperator &&
                planId
            ) {
                // Check authentication
                if (localStorage.getItem("authenticated") !== "true") {
                    window.location.href = "login";
                } else {

                    // Run another function
                    handleRecharge(mNumberValue,
                        selectedOperatorDiscount,
                        selectedCircle,
                        selectedCircleName,
                        selectedOperatorName,
                        selectedOperatorImage,
                        mNumber,
                        selectedOperator,
                        planId,
                        price,
                        oldPrice,
                        dataBenefit,
                        talktime,
                        validity,
                        escapedDesc);
                }
            } else {
                showToast("Invalid input. Please ensure the mobile number is correct.", true);
            }
        });
    };

    // Function to handle recharge logic
    function handleRecharge(mNumberValue, selectedOperatorDiscount,
        selectedCircle,
        selectedCircleName,
        selectedOperatorName,
        selectedOperatorImage,
        mNumber, selectedOperator, planId, price, oldPrice, dataBenefit, talktime, validity, escapedDesc) {

        // console.log("Recharge process started");
        // console.log("Mobile Number Value:", mNumberValue);
        // console.log("selected Operator Discount:", selectedOperatorDiscount);
        // console.log("Selected Circle ID:", selectedCircle);
        // console.log("Selected Circle Name:", selectedCircleName);
        // console.log("Selected Operator Name:", selectedOperatorName);
        // console.log("Selected Operator Image:", selectedOperatorImage);
        // console.log("Mobile Number:", mNumber);
        // console.log("Operator ID:", selectedOperator);
        // console.log("Plan ID:", planId);
        // console.log("Price:", price);
        // console.log("Old Price:", oldPrice);
        // console.log("Data Benefit:", dataBenefit);
        // console.log("Talktime:", talktime);
        // console.log("Validity:", validity);
        // console.log("Description:", escapedDesc.replace(/\n/g, "<br>"));


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
            //
            proceed();
        } else if (userData && userData.phoneNumber) {
            $("#overlay").hide();
            $(".footer, main").show();
            // console.log("User has a phone number but it's not verified.");
            $('#otpModal').modal('show');
            $("#verifyOtp").show();

            const input = document.querySelector("#number");
            input.value = userData.phoneNumber; // Set input value from userData.phoneNumber
            function restrictToNumbers() {
                if (!input) return false; // Exit if input is not found
                input.value = input.value.replace(/\D/g, ""); // Remove any non-numeric characters
                return true; // Validation passed
            }
            input.addEventListener("input", restrictToNumbers);
            //
            sendVerificationCode();
            // You might want to handle this case differently, like prompting the user to verify their phone number again.
        } else {
            $("#overlay").hide();
            $(".footer, main").show();
            // console.log("User does not have a phone number.");
            $('#otpModal').modal('show');
            $("#verifyOtp").show();
            const input = document.querySelector("#number");
            function restrictToNumbers() {
                if (!input) return false; // Exit if input is not found
                input.value = input.value.replace(/\D/g, ""); // Remove any non-numeric characters
                return true; // Validation passed
            }
            input.addEventListener("input", restrictToNumbers);
            //
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
                        otpInput.value = ""; // Clear the input field
                        otpInput.focus(); // Set focus to the input field
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
            $(".loader").addClass("d-block").removeClass("d-none");
            $(".text-buy").removeClass("d-block").addClass("d-none");

            const userDataString = localStorage.getItem("userDataF");
            if (!userDataString) {
                console.error("User data not available in local storage");
                return Promise.reject("User data not available in local storage");
            }
            const userData = JSON.parse(userDataString);
            let mobileNumber = userData?.number || userData.mobile_no || userData.phoneNumber || number || phoneNumber;
            let fName = userData?.first_name || firstWord;
            let lName = userData?.last_name || lastWord;

            // console.log(fName, lName, userData);
            try {
                $("#overlay").hide();


                // Get Order ID
                const response = await fetch(`https://flashweb.iweberp.com/api/gen_order_id?mobile_no=${mobileNumber}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                const orderId = data.order_id;
                const baseURL = window.location.origin;

                // Store transaction data in local storage
                const urlData = {
                    oid: orderId,
                    opid: selectedOperator,
                    num: mNumberValue,
                    cid: selectedCircle,
                    cname: selectedCircleName,
                    oname: selectedOperatorName,
                    oimg: selectedOperatorImage,
                    pid: planId,
                    ba: price,
                    bao: oldPrice,
                    db: dataBenefit || "NA",
                    tt: talktime || "NA",
                    val: validity || "NA",
                    cb: selectedOperatorDiscount
                };

                localStorage.setItem("transactionData", JSON.stringify(urlData));

                // Generate return URL
                const returnURL = `${baseURL}/transaction`;
                if (returnURL.length > 500) {
                    console.error("The URL exceeds the 500-character limit!");
                    showToast("The URL exceeds the 500-character limit!", true);
                    return;
                }

                // Discount handling
                let finalPrice = offerData.min_order_value <= oldPrice
                    ? price - offerData.recharge_flat_off
                    : price;
                // console.log(finalPrice);
                const discountModal = new bootstrap.Modal(document.getElementById("discountModal"));
                const confirmDiscountBtn = document.getElementById("confirmDiscount");
                const skipDiscountBtn = document.getElementById("skipDiscount");
                const discountCodeInput = document.getElementById("discountCode");
                const discountError = document.getElementById("discountError");

                let orderAmount = parseFloat(Number(finalPrice).toFixed(2));
                // const discountAmount = 80;

                discountModal.show();
                discountError.textContent = `Current recharge amount to be paid is ₹${orderAmount}.`;
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
                    if (discountCode === "") {
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
                                "UID": userId,
                                "CODE": discountCode,
                                "Min_Order_Value": orderAmount,
                                "MODE": "RECHARGE",
                                "MODE_DETAILS": selectedOperatorName
                            })
                        });

                        const data = await response.json();

                        if (data.message === "Coupon code applied") {
                            //    let flatOff = data.flatOff;
                            orderAmount -= data.flat_off;
                            // alert("Discount applied! New order amount: ₹" + orderAmount);

                            discountError.textContent = `Current recharge amount to be paid is ₹${parseFloat(Number(orderAmount).toFixed(2))}.`;
                            discountError.style.display = "block";
                            discountError.style.color = "green";
                            $("#overlay").hide();
                            setTimeout(function () {
                                discountModal.hide();
                            }, 3000);
                            
                            await proceedWithOrder(orderAmount, orderId, mobileNumber, fName, lName, returnURL, userData, planId, discountCode);
                        } else if (data.error === "Buy 150 or more") {
                            $("#overlay").hide();
                            discountError.textContent = "Recharge with 150 or more!";
                            discountError.style.display = "block";
                            discountError.style.color = "red";
                        }
                        else {
                            $("#overlay").hide();
                            discountError.textContent = data.error;
                            discountError.style.display = "block";
                            discountError.style.color = "red";
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        $("#overlay").hide();
                        discountError.textContent = data.error;
                        discountError.style.display = "block";
                        discountError.style.color = "red";
                    }
                };

                skipDiscountBtn.onclick = async function () {
                    await proceedWithOrder(orderAmount, orderId, mobileNumber, fName, lName, returnURL, userData, planId, "");
                };

            } catch (error) {
                console.error("Error:", error);
            }
        }

        async function proceedWithOrder(finalPrice, orderId, mobileNumber, fName, lName, returnURL, userData, planId, discountCode) {
            try {

                const myHeaders = new Headers({
                    order_id: orderId,
                    order_amount: Number(finalPrice).toFixed(2),
                    order_currency: "INR",
                    customer_id: userId,
                    customer_email: userData.email || userData.email_id,
                    customer_phone: mobileNumber,
                    customer_name: `${fName} ${lName}`,
                    return_url: returnURL,
                    txn_type: "2",
                    txn_sub_type: "0",
                    brand_id: planId,
                    coupon_code: discountCode || "",
                });
                const response = await fetch("https://flashweb.iweberp.com/api/createpayorder", {
                    method: "POST",
                    headers: myHeaders,
                    redirect: "follow",
                });
                if (!response.ok) {
                    const errorDetails = await response.json().catch(() => ({}));
                    const errorMessage = errorDetails?.errorMsg || response.statusText || `HTTP error! Status: ${response.status}`;

                    if (errorMessage.includes("ensure this value is greater than or equal to 1")) {
                        $(".toast").toast("show");
                        $(".toast-msg").text("Discounted amount should be greater than or equal to 1.");
                        setTimeout(() => window.location.reload(), 5000);
                    } else {
                        throw new Error(errorMessage);
                    }
                }

                const responseData = await response.json();
                console.log(responseData)
                //   if (typeof gtag === "function") {
                //     gtag('event', 'sayf_buy_click_web', {
                //       sayf_buy_click_web_category: 'Link Click',
                //       sayf_buy_click_label: `Product Name:${storeData.data.brandName}, User: ${mobileNumber || ""} ${userData.email || ""}, Name: ${userData.name}`,
                //       transport_type: 'beacon',
                //     });
                //   }
                //   debugger
                // Redirect to payment gateway
                cashfree.checkout({ paymentSessionId: responseData.payment_session_id, redirectTarget: "_self" });

                setTimeout(() => {
                    $(".loader").removeClass("d-block").addClass("d-none");
                    $(".text-buy").addClass("d-block").removeClass("d-none");
                }, 200);

            } catch (error) {
                console.error("Error occurred:", error.message);
                $(".toast").toast("show");
                $(".toast-msg").text(`Error occurred: ${error.message}`);
                console.error("Error occurred:", error.message);
            }
        }

        // Add further processing logic here if needed
        showToast("Recharge processing started.", false);
    }

    function filterPlans(groupedPlans) {
        // console.log(groupedPlans);
        const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
        const allPlanCards = document.querySelectorAll(".plan-card");
        const allSections = document.querySelectorAll(".section");
        const allTabs = document.querySelectorAll("#planTabs li");

        if (!searchValue) {
            // Reset visibility when search input is empty
            allPlanCards.forEach((card) => (card.style.display = ""));
            allSections.forEach((section) => (section.style.display = ""));
            allTabs.forEach((tab) => (tab.style.display = ""));
            return;
        }

        let anyVisible = false;

        allSections.forEach((section) => {
            const sectionId = section.id;
            const cards = section.querySelectorAll(".plan-card");
            let sectionVisible = false;

            cards.forEach((card) => {
                const cardPrice = card.getAttribute("data-price");
                // console.log(searchValue, cardPrice);
                // Check for matches in price, description, or validity 
                if (
                    cardPrice.includes(searchValue) || // Partial match
                    Math.abs(parseFloat(cardPrice) - parseFloat(searchValue)) <= 50 // Closest match
                ) {
                    card.style.display = "";
                    sectionVisible = true;
                    anyVisible = true;
                } else {
                    card.style.display = "none";
                }
            });

            // Set section and tab visibility
            section.style.display = sectionVisible ? "" : "none";
            const tab = document.querySelector(`#tab-${sectionId}`);
            if (tab) {
                tab.style.display = sectionVisible ? "" : "none";
            }
        });

        if (!anyVisible) {
            showToast("No matching plans found.", true);
        }
    }
    function setupScrollNavigation() {
        const navigationLinks = document.querySelectorAll("#planTabs .nav-link");
        const plansContent = document.getElementById("plansContent");
        const sections = document.querySelectorAll(".section");

        // Smooth scroll to section on navigation click
        navigationLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const relativeOffset = targetSection.offsetTop;
                    plansContent.scrollTo({
                        top: relativeOffset,
                        behavior: "smooth",
                    });
                }
            });
        });

        // Debounce function to limit scroll event calls
        function debounce(func, wait = 20) {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        // Highlight active link on scroll inside #plansContent
        plansContent.addEventListener("scroll", debounce(() => {
            const scrollPosition = plansContent.scrollTop + 10; // Small padding offset
            let activeLink = null;

            sections.forEach((section) => {
                const offset = section.offsetTop;
                const height = section.offsetHeight;

                if (scrollPosition >= offset && scrollPosition < offset + height) {
                    activeLink = section.getAttribute("id");
                }
            });

            navigationLinks.forEach((link) => {
                const linkTarget = link.getAttribute("href").substring(1);
                if (linkTarget === activeLink) {
                    link.classList.add("active-section");
                } else {
                    link.classList.remove("active-section");
                }
            });
        }));
    }


    // Call this function after tabs and content are rendered
    // function fetchPlansAndRenderWithScroll() {
    //     fetchPlansAndRender();
    // }

    // Attach to "Check Plans" button
    // checkPlansBtn.addEventListener("click", fetchPlansAndRenderWithScroll);




    // Initialize dropdowns on page load
    const resHeight = document.getElementsByClassName("res-height")[0];

    // Toggle circle menu
    circleDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = circleMenu.classList.toggle("show");
        resHeight.style.overflow = isOpen ? "visible" : "auto";
        positionMenu(circleMenu, circleDropdown);
    });

    // Toggle operator menu
    operatorDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = operatorMenu.classList.toggle("show");
        resHeight.style.overflow = isOpen ? "visible" : "auto";
        positionMenu(operatorMenu, operatorDropdown);
    });

    // Close menus when clicking outside
    document.addEventListener("click", (e) => {
        if (!circleDropdown.contains(e.target) && !circleMenu.contains(e.target)) {
            circleMenu.classList.remove("show");
        }

        if (!operatorDropdown.contains(e.target) && !operatorMenu.contains(e.target)) {
            operatorMenu.classList.remove("show");
        }

        // If both are hidden, reset overflow
        if (!circleMenu.classList.contains("show") && !operatorMenu.classList.contains("show")) {
            resHeight.style.overflow = "auto";
        }
    });


    document.addEventListener("DOMContentLoaded", () => {

        loadCircles();
        loadOperators();
    });

    // Event delegation for dynamic dropdown items
    circleMenu.addEventListener("click", (event) => {

        if (event.target.matches(".dropdown-item")) {
            const { id, name } = event.target.dataset;
            selectCircle(id, name);

        }
    });
    document.getElementById("operatorList").addEventListener("click", (event) => {
        const button = event.target.closest("button.dropdown-item");

        if (button) {
            const id = button.getAttribute("data-id");
            const name = button.getAttribute("data-name");
            const image = button.getAttribute("data-image");
            const discount = button.getAttribute("data-discount");

            selectOperator(id, name, image, discount);
        }
    });


    const numberCount = document.getElementById('numberCount');

    // Function to update the character count
    function updateCount() {
        const currentLength = mNumberInput.value.length;
        numberCount.textContent = `${currentLength}/10`;
    }

    // Debounced validation for mobile number input
    mNumberInput.addEventListener("input", () => {
        debounce(() => {
            validateAndFetchOperator(mNumberInput);
            updateCount();  // Update count as the user types
        }, 300);
    });




    // Previously Recharged data section //////
    async function getPreviouslyRechargeData() {
        $("#overlay").show();
        let userDataF = JSON.parse(localStorage.getItem("userDataF"));
        let userName = '';
        if (userDataF) {
            userName = userDataF.name;
        }

        // const userUID = "XP5uJF4fY8YbmcZ4Flh6BAtmRim2";
        const userUID = localStorage.getItem('userId');
        // console.log("User UID:", userUID);
        const rechargeUrl = 'https://flashweb.iweberp.com/api/get_previously_recharge_data';
        const operatorUrl = 'https://flashweb.iweberp.com/api/getBBPSOperatorsByOptionCode?optionCode=PREPAID';

        try {
            $("#overlay").show();
            // Fetch operator data
            const operatorResponse = await fetch(operatorUrl);
            const operatorData = await operatorResponse.json();
            if (!operatorData || operatorData.success === false) {
                throw new Error('Failed to fetch operators!');
            }

            // Fetch recharge data
            const rechargeResponse = await fetch(rechargeUrl, {
                headers: { 'userUID': userUID },
            });
            const rechargeData = await rechargeResponse.json();
            if (!rechargeData || rechargeData.success === false) {
                throw new Error(rechargeData.message || 'No recharge data found!');
            }

            if (rechargeData.success !== false) {
                const prevHeading = document.getElementsByClassName('prev-heading');
                if (prevHeading.length > 0) {
                    prevHeading[0].innerText = 'Recharge History';
                }
                const rechargeContainer = document.getElementById('previousRecharges');
                rechargeContainer.innerHTML = ''; // Clear previous content
                rechargeData.data.forEach(recharge => {
                    const amount = recharge.AMOUNT.replace(/\.\d+/, ""); // Remove decimal points
                    const operator = operatorData.find(op => op.id === recharge.OPERATOR_ID);
                    const discountPercentage = operator ? operator.discountPercentage / 1000 : 0; // Convert to percentage
                    const discountedPrice = (amount - (amount * discountPercentage) / 100).toFixed(2);
                    // const formattedDate = formatDate(recharge.DATE_TIME);
                    const formattedDate = recharge.DATE_TIME;

                    // Ensure DATA_TALKTIME_DAY is a string and split by '|' if concatenated
                    const talkTimeValues = String(recharge.DATA_TALKTIME_DAY || '').trim();
                    let uniqueArray; // Declare variable to hold unique patterns

                    function filterRepeatingValues(input) {
                        if (!input) return ''; // Handle empty or undefined input

                        // Split the input into individual patterns using '|' as a delimiter
                        const patterns = input.split('|').map(item => item.trim());

                        // Use a Set to store unique values
                        const uniquePatterns = new Set(patterns);
                        uniqueArray = Array.from(uniquePatterns);
                        // return Array.from(uniquePatterns)
                        // console.log('Unique Patterns:', uniquePatterns);
                        // Convert the Set back to an array and join the unique values
                        return Array.from(uniquePatterns).join(' | ');
                    }

                    // Call the function with the dynamic input
                    const filteredResult = filterRepeatingValues(talkTimeValues);
                    // console.log('Unique Patterns:', uniqueArray);
                    let data = uniqueArray[0] + " |";
                    let tt = uniqueArray[1] + " |";
                    let val = uniqueArray[2];
                    // console.log(data);
                    if (data === "null |") {
                        data = "";
                    }
                    if (tt === "null |" || tt <= 0) {
                        tt = "";
                    }
                    if (val === "null") {
                        val = "";
                    } else if (val === "- days") {
                        val = "Unlimited";
                    }
                    // if (Array.isArray(uniqueArray)) {
                    //     uniqueArray.forEach((value, index) => {
                    //         console.log(`Value at index ${index}: ${value}`);
                    //     });
                    // } else {
                    //     console.error('uniquePatterns is not an array!');
                    // }
                    // Log the result if needed
                    // console.log('Filtered Result:', filteredResult);
                    // console.log(filteredResult)
                    // Use the result outside the function
                    // console.log("Filtered Result:", filteredResult);

                    const mNumberValue = recharge.MOBILE_NO;
                    const selectedOperatorDiscount = discountPercentage;
                    const selectedCircle = recharge.CIRCLE_ID;
                    const selectedCircleName = recharge.CIRCLE_NAME;
                    const selectedOperatorName = recharge.OPERATOR_NAME;
                    const selectedOperatorImage = recharge.OPERATOR_IMAGE;
                    const mNumber = recharge.MOBILE_NUMBER;
                    const selectedOperator = recharge.OPERATOR_ID;
                    const planId = recharge.PLAN_ID;
                    const price = discountedPrice;
                    const oldPrice = recharge.AMOUNT;
                    const dataBenefit = filteredResult;
                    const talktime = filteredResult;
                    const validity = filteredResult;
                    const escapedDesc = recharge.DESCRIPTION;
                    // (mNumberValue, selectedOperatorDiscount,
                    //     selectedCircle,
                    //     selectedCircleName,
                    //     selectedOperatorName,
                    //     selectedOperatorImage,
                    //     mNumber, selectedOperator, planId, price, oldPrice, dataBenefit, talktime, validity, escapedDesc)
                    const rechargeCard = document.createElement('div');
                    rechargeCard.classList.add('col-12', 'col-md-6', 'col-xl-4');
                    rechargeCard.innerHTML = `
                  <div class="card rounded-4 shadow bg-white border-0 h-100">
                    <div class="card-body position-relative">
                      <div class="row">
                        <div class="col-7">
                          <div class="d-flex align-items-center mb-2">
                            <img src="${recharge.OPERATOR_IMAGE}" height="40px" width="40px" class="rounded-circle shadow me-3" alt="operator">
                            <h4 class="m-0">${recharge.OPERATOR_NAME}</h4>
                          </div>
                        </div>
                        <div class="col-5 text-end">
                          <h2>₹${amount}</h2>
                        </div>
                        <div class="col-12 pe-0 text-start">
                          <p class="mb-1 small">${data} ${tt} ${val} </p>
                          <p class="small mb-1">✅ Paid | ${formattedDate}</p>
                        </div>
                        <div class="col-12 text-end d-flex py-1">
                          <button class="btn btn-prim shadow rounded-5 border-0 text-white mt-auto mx-auto w-100 repeat-recharge" id="repeatRecharge">Repeat ₹${discountedPrice}</button>
                        </div>
                      </div>
                    </div>
                  </div>`;
                    rechargeContainer.prepend(rechargeCard);
                    $("#overlay").hide();
                    $(".footer, main").show();
                    // Add click listener for the repeat recharge button
                    rechargeCard.querySelector('.repeat-recharge').addEventListener('click', () => {
                        $("#overlay").show();
                        handleRecharge(
                            mNumberValue,
                            selectedOperatorDiscount,
                            selectedCircle,
                            selectedCircleName,
                            selectedOperatorName,
                            selectedOperatorImage,
                            mNumber,
                            selectedOperator,
                            planId,
                            price,
                            oldPrice,
                            dataBenefit,
                            talktime,
                            validity,
                            escapedDesc
                        );

                    });
                });


            } else {
                $("#overlay").show();

                const rechargeContainer = document.getElementById('previousRecharges');
                rechargeContainer.innerHTML = ''; // Clear previous content

                const rechargeCard = document.createElement('div');
                rechargeCard.classList.add('col-12');
                rechargeCard.innerHTML = `
              <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center">
                        <div class="text-center text-lg-start px-xl-5">
                            <h2 class="text-uppercase text-third fw-bold">Recharge or Pay Bills</h2>
                            <h3 class="text-uppercase text-black fw-bold">on the GenZDealZ.ai !</h3>
                            <p class="fw-bold pe-xl-5">Hi ${userName}, Enjoy an instant discount of up to <span class="text-third">5.5%</span> on every recharge when you pay via the app. Don't miss out on savings!</p>
                        </div>
                        <div class="text-start px-xl-5 d-flex">
                            <div class="" id="iosApp">
                                <a href="https://apps.apple.com/in/app/genzdealz-ai/id6504975486" id="iwebAndroidApp" class="position-relative" target="_blank">
                                    <img class="w-100" src="https://static.vecteezy.com/system/resources/previews/012/871/374/large_2x/app-store-download-button-in-white-colors-download-on-the-apple-app-store-free-png.png"
                                        alt="Get it on App Store">
                                </a>
                            </div>
                            <div class="" id="androidApp">
                                <a href="https://play.google.com/store/apps/details?id=iweb.student.marketplace" id="iwebAndroidApp" class="position-relative" target="_blank" style="z-index: 3;">
                                    <img class="w-100" src="https://static.vecteezy.com/system/resources/previews/012/871/364/large_2x/google-play-store-download-button-in-white-colors-download-on-the-google-play-store-free-png.png"
                                        alt="Get it on Google Play">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 text-lg-start">
                        <div class="recharge-img my-lg-3 my-3">
                            <img src="./images/recharge.png" class="" alt="Recharge Image">
                        </div>
                    </div>
                </div>
              </div>`;
                rechargeContainer.appendChild(rechargeCard);
                setTimeout(function () {
                    $("#overlay").hide();
                    $(".footer, main").show();
                }, 1000);
            }
        } catch (error) {
            console.error("Error fetching Previous Recharges:", error);

            // showToast(error, true);
            if (error == "Error: No recharge data found for the given userUID") {
                const rechargeContainer = document.getElementById('previousRecharges');
                rechargeContainer.innerHTML = ''; // Clear previous content

                const rechargeCard = document.createElement('div');
                rechargeCard.classList.add('col-12');
                rechargeCard.innerHTML = `
              <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center">
                        <div class="text-center text-lg-start px-xl-5">
                            <h2 class="text-uppercase text-third fw-bold">Recharge or Pay Bills</h2>
                            <h3 class="text-uppercase text-black fw-bold">on the GenZDealZ.ai !</h3>
                            <p class="fw-bold pe-xl-5">Hi ${userName}, Enjoy an instant discount of up to <span class="text-third">5.5%</span> on every recharge when you pay via the app. Don't miss out on savings!</p>
                        </div>
                        <div class="text-start px-xl-5 d-flex">
                            <div class="" id="iosApp">
                                <a href="https://apps.apple.com/in/app/genzdealz-ai/id6504975486" id="iwebAndroidApp" class="position-relative" target="_blank">
                                    <img class="w-100" src="https://static.vecteezy.com/system/resources/previews/012/871/374/large_2x/app-store-download-button-in-white-colors-download-on-the-apple-app-store-free-png.png"
                                        alt="Get it on App Store">
                                </a>
                            </div>
                            <div class="" id="androidApp">
                                <a href="https://play.google.com/store/apps/details?id=iweb.student.marketplace" id="iwebAndroidApp" class="position-relative" target="_blank" style="z-index: 3;">
                                    <img class="w-100" src="https://static.vecteezy.com/system/resources/previews/012/871/364/large_2x/google-play-store-download-button-in-white-colors-download-on-the-google-play-store-free-png.png"
                                        alt="Get it on Google Play">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 text-lg-start">
                        <div class="recharge-img my-lg-3 my-3">
                            <img src="./images/recharge.png" class="" alt="Recharge Image">
                        </div>
                    </div>
                </div>
              </div>`;
                rechargeContainer.appendChild(rechargeCard);

                $("#overlay").hide();
                $(".footer, main").show();
            }
            $("#overlay").hide();
            $(".footer, main").show();
        }
        if (!userUID || userUID === "null") {
            showToast("User not logged in!", true);
            const rechargeContainer = document.getElementById('previousRecharges');
            rechargeContainer.innerHTML = ''; // Clear previous content

            const rechargeCard = document.createElement('div');
            rechargeCard.classList.add('col-12');
            rechargeCard.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center">
                        <div class="text-center text-lg-start px-xl-5">
                            <h2 class="text-uppercase text-third fw-bold">Recharge or Pay Bills</h2>
                            <h3 class="text-uppercase text-black fw-bold">on the GenZDealZ.ai !</h3>
                            <p class="fw-bold pe-xl-5">Login to enjoy an instant discount of up to <span class="text-third">5.5%</span> on every recharge when you pay via the app. Don't miss out on savings!</p>
                        </div>
                        <div class="text-start px-xl-5 d-flex">
                            <div class="" id="iosApp">
                                <a href="https://apps.apple.com/in/app/genzdealz-ai/id6504975486" id="iwebAndroidApp" class="position-relative" target="_blank">
                                    <img class="w-100" src="https://static.vecteezy.com/system/resources/previews/012/871/374/large_2x/app-store-download-button-in-white-colors-download-on-the-apple-app-store-free-png.png"
                                        alt="Get it on App Store">
                                </a>
                            </div>
                            <div class="" id="androidApp">
                                <a href="https://play.google.com/store/apps/details?id=iweb.student.marketplace" id="iwebAndroidApp" class="position-relative" target="_blank" style="z-index: 3;">
                                    <img class="w-100" src="https://static.vecteezy.com/system/resources/previews/012/871/364/large_2x/google-play-store-download-button-in-white-colors-download-on-the-google-play-store-free-png.png"
                                        alt="Get it on Google Play">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 text-lg-start">
                        <div class="recharge-img my-lg-3 my-3">
                            <img src="./images/recharge.png" class="" alt="Recharge Image">
                        </div>
                    </div>
                </div>
            </div>
                        `;
            rechargeContainer.appendChild(rechargeCard);

            $("#overlay").hide();
            $(".footer, main").show();
        }

    }

    // Helper function to format the date
    function formatDate(dateString) {
        const [year, day, month] = dateString.split(" ")[0].split("-");
        const time = dateString.split(" ")[1];
        return new Date(`${year}-${month}-${day}T${time}`).toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }

    getPreviouslyRechargeData();

})();


$("#rechargeHeader").click(function () {
    $(".recharge-form").slideToggle(); // You can also use .slideToggle() or .fadeToggle()
    $("#toggleIcon").toggleClass("fa-angle-down fa-angle-up");
});

document.getElementById('discountModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('discountCode').value = '';
});