// Fetch user data from API
$("#overlay").show();
function fetchUserData() {
    fetch('https://flashweb.iweberp.com/api/firebase_User_AuthData_For_Mis')
        .then(response => response.json())
        .then(userData => {
            // Calculate and display total count of users
            const userCountElement = document.getElementById('userCount');
            if (userCountElement) {
                userCountElement.textContent = `Total Users: ${userData.length}`;
            }
            
            // Process the data
            const sortedUserData = userData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            const groupedUserData = groupByDate(sortedUserData);
            visualizeUserData(groupedUserData);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        })
        .finally(() => {
            $("#overlay").hide(); // Hide overlay regardless of success or failure
        });
}
fetchUserData();

// Function to group users by creation date
function groupByDate(userData) {
    return userData.reduce((acc, user) => {
        const createdAt = new Date(user.createdAt).toDateString();
        if (!acc[createdAt]) {
            acc[createdAt] = [];
        }
        acc[createdAt].push(user);
        return acc;
    }, {});
}

// Function to visualize user data
function visualizeUserData(groupedUserData) {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Clear previous data

    // Iterate over the grouped user data in reverse order
    Object.entries(groupedUserData).reverse().forEach(([date, users]) => {
        const userCount = users.length;
        const dateElement = createAccordionButton(date, userCount);
        const panel = createPanel(users);
        
        // Create a container div to hold the dateElement and its corresponding panel
        const container = document.createElement('div');
        container.appendChild(dateElement);
        container.appendChild(panel);
        
        // Prepend the container to userListElement
        userListElement.append(container);
    });
}

// Function to create accordion button
function createAccordionButton(date, count) {
    const dateElement = document.createElement('button');
    dateElement.classList.add('accordion');
    dateElement.textContent = `${date} (${count})`; // Include count in the button text
    dateElement.setAttribute('data-date', date);

    // Toggle accordion panel on click
    dateElement.addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
    
    return dateElement;
}

// Function to create panel
function createPanel(users) {
    const panel = document.createElement('div');
    panel.classList.add('panel');
    users.forEach(user => {
        const userElement = createUserElement(user);
        panel.appendChild(userElement);
    });
    return panel;
}

// Function to create user element
function createUserElement(user) {
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.innerHTML = `
        <p><strong>Display Name:</strong> ${user.displayName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>UID:</strong> ${user.localId}</p>
        <p><strong>Created At:</strong> ${new Date(user.createdAt)}</p>
    `;
    userElement.addEventListener('click', () => fetchAndDisplayUserDetails(user.localId));
    return userElement;
}

// Function to fetch and display detailed user data
function fetchAndDisplayUserDetails(localId) {
    $("#overlay").show();
    fetch(`https://flashweb.iweberp.com/api/firestore_User_Data_For_Mis?localId=${localId}`)
        .then(response => response.json())
        .then(userDetails => {
            // Display detailed user data
            const matchingUserDetail = userDetails.find(detail => detail.UserUID === localId);
            if (matchingUserDetail) {
                displayUserModal(matchingUserDetail);
            } else {
                console.error('No user detail found with matching UserUID');
                $('#userModal').modal('hide');
            }
        })
        .catch(error => {
            console.error('Error fetching detailed user data:', error);
        })
        .finally(() => {
            $("#overlay").hide();
        });
}

// Function to display user modal
function displayUserModal(userDetails) {
    const userModalBody = document.getElementById('userModalBody');
    userModalBody.innerHTML = `
        ${userDetails.name ? `<p class="m-0"><strong>Name</strong></p><p>${userDetails.name}</p>` : ''}
        ${userDetails.email ? `<p class="m-0"><strong>Email</strong></p><p>${userDetails.email}</p>` : ''}
        ${userDetails.UserUID ? `<p class="m-0"><strong>UID</strong></p><p>${userDetails.UserUID}</p>` : ''}
        ${userDetails.college ? `<p class="m-0"><strong>College</strong></p><p>${userDetails.college}</p>` : ''}
        ${userDetails.course ? `<p class="m-0"><strong>Course</strong></p><p>${userDetails.course}</p>` : ''}
        ${userDetails.gender ? `<p class="m-0"><strong>Gender</strong></p><p>${userDetails.gender}</p>` : ''}
        ${userDetails.phoneNumber ? `<p class="m-0"><strong>Phone Number</strong></p><p>${userDetails.phoneNumber}</p>` : ''}
        ${userDetails.phoneVerified ? `<p class="m-0"><strong>Phone Verified</strong></p><p>${userDetails.phoneVerified}</p>` : ''}
        ${userDetails.state ? `<p class="m-0"><strong>State</strong></p><p>${userDetails.state}</p>` : ''}
        ${userDetails.iumsStudent ? `<p class="m-0"><strong>IUMS Student</strong></p><p>${userDetails.iumsStudent}</p>` : ''}
    `;
    $('#userModal').modal('show');
}

// Date range picker initialization
$(function() {
    $('#daterange').daterangepicker({
        opens: 'left',
        locale: {
            format: 'YYYY-MM-DD'
        }
    }, function(start, end) {
        var formattedStart = formatDate(start);
        var formattedEnd = formatDate(end);

        // Log the formatted date range
        // console.log("A new date selection was made: " + formattedStart + " to " + formattedEnd);

        // Filter the data based on the selected date range
        filterData(start, end);
    });

    // Function to format date as "Mon May 06 2024"
    function formatDate(date) {
        if (!(date instanceof Date)) {
            date = new Date(date); // Ensure date is a Date object
        }

        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        var monthName = monthNames[date.getMonth()];
        var dayOfMonth = date.getDate();
        var year = date.getFullYear();

        return `${dayOfWeek} ${monthName} ${dayOfMonth} ${year}`;
    }

    // Function to filter data based on date range
    function filterData(start, end) {
        let filteredCount = 0;

        $('.accordion').each(function() {
            var date = $(this).data('date');
            var itemDate = moment(date, "ddd MMM DD YYYY");

            if (itemDate.isBetween(start, end, null, '[]')) {
                $(this).show();
                filteredCount += parseInt($(this).text().match(/\((\d+)\)/)[1]); // Add the number of users in this date
            } else {
                $(this).hide();
            }
        });

        // Update the filtered user count
        const filteredUserCountElement = document.getElementById('filteredUserCount');
        if (filteredUserCountElement) {
            filteredUserCountElement.textContent = `Filtered Users: ${filteredCount}`;
        }
    }
});
