document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const message = document.getElementById("loginMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent form from submitting normally

    // Get form values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    // Basic validation
    if (username === "" || password === "" || role === "") {
      message.textContent = "All fields are required!";
      message.style.color = "red";
      return;
    }

    // Simulate login check (replace with actual server logic)
    if (username === "admin" && password === "admin123" && role === "admin") {
      message.textContent = "Admin login successful!";
      message.style.color = "green";
      window.location.href = "admin.html";
    } else if (username === "worker" && password === "worker123" && role === "worker") {
      message.textContent = "Worker login successful!";
      message.style.color = "green";
      window.location.href = "worker.html";
    } else if (username === "user" && password === "user123" && role === "user") {
      message.textContent = "User login successful!";
      message.style.color = "green";
      window.location.href = "home.html";
    } else {
      message.textContent = "Invalid login credentials.";
      message.style.color = "red";
    }
  });
});
