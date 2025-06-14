document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("worker-jobs-container");

  // Get all assignments from localStorage
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  if (assignments.length === 0) {
    container.innerHTML = "<p style='color: gray;'>No jobs have been assigned yet.</p>";
    return;
  }

  // Loop through and display all assignments
  assignments.forEach((assignment) => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";

    jobCard.innerHTML = `
      <h3>Job: ${assignment.job}</h3>
      <p><strong>Assigned To:</strong> ${assignment.worker}</p>
      <p><strong>Contact:</strong> ${assignment.contact}</p>
      <p><strong>Skills:</strong> ${assignment.skills}</p>
      ${assignment.salary ? `<p><strong>Salary:</strong> ${assignment.salary}</p>` : ""}
      ${assignment.profile ? `<p><strong>Profile:</strong> ${assignment.profile}</p>` : ""}
    `;

    container.appendChild(jobCard);
  });
});

