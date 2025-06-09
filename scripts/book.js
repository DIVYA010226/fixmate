 // Function to load bookings from localStorage and display them
function loadBookings() {
  const container = document.getElementById("bookings-container");
  container.innerHTML = "";

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    container.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  bookings.forEach((booking, index) => {
    const card = document.createElement("div");
    card.classList.add("booking-card");

    card.innerHTML = `
      <h3>${booking.service}</h3>
      <div class="booking-details">
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Mobile:</strong> ${booking.phone}</p>
        <p><strong>Requirements:</strong> ${booking.requirements}</p>
        <p><strong>Date & Time:</strong> ${booking.datetime}</p>
        <p><strong>Assigned Worker:</strong> ${booking.worker.name}</p>
        <p><strong>Contact:</strong> ${booking.worker.email} | ${booking.worker.phone}</p>
      </div>
      <button class="submitFeedbackBtn" data-index="${index}">Submit Feedback</button>
    `;

    container.appendChild(card);
  });

  // Attach event listeners to feedback buttons
  document.querySelectorAll(".submitFeedbackBtn").forEach(button => {
    button.addEventListener("click", openFeedbackPopup);
  });
}

// Clear all bookings from localStorage and reload page
function clearBookings() {
  if (confirm("Are you sure you want to clear all bookings?")) {
    localStorage.removeItem("bookings");
    localStorage.removeItem("feedbacks"); // optional: clear feedbacks too if you want
    loadBookings();
  }
}

// Popup handlers
const feedbackPopup = document.getElementById("feedbackPopup");
const closeFeedbackPopupBtn = document.getElementById("closeFeedbackPopup");
const feedbackForm = document.getElementById("feedbackForm");
const bookingIndexInput = document.getElementById("bookingIndex");
const feedbackMessageInput = document.getElementById("feedbackMessage");

function openFeedbackPopup(event) {
  const index = event.target.getAttribute("data-index");
  bookingIndexInput.value = index;
  feedbackMessageInput.value = ""; // clear previous input
  feedbackPopup.style.display = "flex";
}

closeFeedbackPopupBtn.addEventListener("click", () => {
  feedbackPopup.style.display = "none";
});

// Handle feedback form submit
feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const index = bookingIndexInput.value;
  const message = feedbackMessageInput.value.trim();

  if (!message) {
    alert("Please enter your feedback.");
    return;
  }

  // Get existing feedback array or initialize
  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  // Store feedback along with booking index info
  feedbacks.push({ bookingIndex: index, message });

  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  alert("Thank you for your feedback!");
  feedbackPopup.style.display = "none";
});

// Load bookings on page load
window.onload = loadBookings; 



