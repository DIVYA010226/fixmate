function loadBookings() {
  const container = document.getElementById("bookings-container");
  container.innerHTML = "";

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    container.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  bookings.forEach((booking) => {
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
    `;

    container.appendChild(card);
  });
}

window.onload = loadBookings;
