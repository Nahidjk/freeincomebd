// Local Storage Keys
const USERS_KEY = "users";
const BALANCE_KEY = "balance";

// Admin Login Email (for simplicity)
const ADMIN_EMAIL = "admin@example.com";

// Login Functionality
function login() {
    const email = document.getElementById("email").value;
    if (!email) {
        document.getElementById("loginMessage").textContent = "Please enter an email.";
        return;
    }

    if (email === ADMIN_EMAIL) {
        window.location.href = "admin.html"; // Redirect to Admin Page
    } else {
        // Save user data to Local Storage
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        if (!users.includes(email)) {
            users.push(email);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
        localStorage.setItem(BALANCE_KEY, JSON.stringify({ [email]: 0 }));
        document.getElementById("loginMessage").textContent = `Welcome, ${email}!`;
        document.getElementById("taskSection").style.display = "block";
    }
}

// Task Completion Functionality
function completeTask() {
    const email = document.getElementById("email").value;
    if (!email) return;

    const balanceData = JSON.parse(localStorage.getItem(BALANCE_KEY)) || {};
    balanceData[email] = (balanceData[email] || 0) + 1;
    localStorage.setItem(BALANCE_KEY, JSON.stringify(balanceData));

    document.getElementById("taskMessage").textContent = "Task completed! Balance updated.";
}

// Admin Panel Functionality
function loadAdminData() {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const balanceData = JSON.parse(localStorage.getItem(BALANCE_KEY)) || {};

    const userInfoDiv = document.getElementById("userInfo");
    userInfoDiv.innerHTML = "<h2>User Information</h2>";

    users.forEach((user) => {
        userInfoDiv.innerHTML += `<p>${user}: ${balanceData[user] || 0} tasks completed</p>`;
    });
}

// Clear Data Functionality
function clearData() {
    localStorage.clear();
    alert("All data cleared!");
    location.reload();
}

// Load Admin Data Automatically
if (window.location.pathname.includes("admin.html")) {
    loadAdminData();
}
