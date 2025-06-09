// Sample workers data
const workers = [
  { name: "Alice Johnson", email: "alice@fixmate.com", phone: "123-456-7890" },
  { name: "Bob Smith", email: "bob@fixmate.com", phone: "987-654-3210" },
  { name: "Charlie Lee", email: "charlie@fixmate.com", phone: "555-444-3333" }
];

// Store the selected service globally
let selectedService = "";

// Open the popup and set the service title
function openPopup(serviceName) {
  selectedService = serviceName;
  const popup = document.getElementById("popup");
  document.getElementById("popup-title").textContent = `Book: ${serviceName}`;
  
  // Set today's date in the date input
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;

  popup.style.display = "flex";
}

// Close the popup and reset form
function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("bookingForm").reset();
}

// Handle booking form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const date = document.getElementById("date").value.trim();
    const requirements = document.getElementById("requirements").value.trim();

    // Basic validation
    if (!name || !email || !phone|| !address || !city || !date || !requirements) {
      alert("Please fill out all fields.");
      return;
    }

    // Randomly assign a worker
    const assignedWorker = workers[Math.floor(Math.random() * workers.length)];

    // Construct booking object
    const booking = {
      service: selectedService,
      name,
      email,
      phone,
      address,
      city,
      date,
      requirements,
      datetime: new Date().toLocaleString(),
      worker: assignedWorker
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    // Success alert
    alert(`Thanks, ${name}! Your booking for ${selectedService} is confirmed.\nWorker: ${assignedWorker.name}`);

    // Reset form and close popup
    form.reset();
    closePopup();
  });
});
