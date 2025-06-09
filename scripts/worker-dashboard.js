// Replace with the logged-in worker's email (you can use session/localStorage in real app)
const loggedInWorkerEmail = localStorage.getItem("workerEmail");

function loadWorkerJobs() {
  const container = document.getElementById("worker-jobs-container");
  container.innerHTML = "";

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const assignedJobs = bookings.filter(
    (booking) => booking.worker.email === loggedInWorkerEmail
  );

  if (assignedJobs.length === 0) {
    container.innerHTML = "<p>No assigned jobs found.</p>";
    return;
  }

  assignedJobs.forEach((job) => {
    const card = document.createElement("div");
    card.classList.add("booking-card");
    card.innerHTML = `
      <h3>${job.service}</h3>
      <div class="booking-details">
        <p><strong>Customer:</strong> ${job.name}</p>
        <p><strong>Phone:</strong> ${job.phone}</p>
        <p><strong>Date & Time:</strong> ${job.datetime}</p>
        <p><strong>Requirements:</strong> ${job.requirements}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

window.onload = loadWorkerJobs;
