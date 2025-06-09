document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const message = document.getElementById("loginMessage");

  // Dummy credentials for testing
  const credentials = {
    admin: { username: "admin", password: "admin123" },
    worker: { username: "worker", password: "worker123" },
    user: { username: "user", password: "user123" }
  };

  if (
    credentials[role] &&
    username === credentials[role].username &&
    password === credentials[role].password
  ) {
    message.style.color = "lightgreen";
    message.textContent = "Login successful. Redirecting...";

    setTimeout(() => {
      window.location.href = `${role}.html`;
    }, 1000);
  } else {
    message.style.color = "lightcoral";
    message.textContent = "Invalid username, password, or role.";
  }
});


