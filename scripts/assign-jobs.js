document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("assignForm");
  const tableBody = document.getElementById("assignmentsBody");
  const workerSelect = document.getElementById("workerSelect");
  const jobSelect = document.getElementById("jobSelect");

  const popup = document.getElementById("jobDetailsPopup");
  const closePopupBtn = document.getElementById("closePopup");

  // Load workers and services from localStorage
  const workers = JSON.parse(localStorage.getItem("workers")) || [];
  const services = JSON.parse(localStorage.getItem("services")) || [];

  // Load assignments from localStorage or initialize empty array
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  // Populate workers dropdown
  workerSelect.innerHTML = '<option value="">--Select Worker--</option>';
  workers.forEach((worker, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = worker.name;
    workerSelect.appendChild(option);
  });

  // Populate jobs/services dropdown
  jobSelect.innerHTML = '<option value="">--Select Job--</option>';
  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = service.name;
    jobSelect.appendChild(option);
  });

  // Render assignments in table
  function renderAssignments() {
    tableBody.innerHTML = "";
    assignments.forEach((assignment, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${assignment.job}</td>
        <td>${assignment.worker}</td>
        <td>${assignment.contact}</td>
        <td>${assignment.skills}</td>
        <td>
          <button class="details-btn" data-index="${index}">Details</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Show popup with assignment details
  function showPopup(index) {
    const assignment = assignments[index];
    document.getElementById("popupJob").textContent = `Job: ${assignment.job}`;
    document.getElementById("popupWorker").textContent = `Worker: ${assignment.worker}`;
    document.getElementById("popupContact").textContent = `Contact: ${assignment.contact}`;
    document.getElementById("popupSkills").textContent = `Skills: ${assignment.skills}`;
    // Optional: if salary and profile exist
    document.getElementById("popupSalary").textContent = assignment.salary ? `Salary: ${assignment.salary}` : "";
    document.getElementById("popupProfile").textContent = assignment.profile ? `Profile: ${assignment.profile}` : "";
    popup.style.display = "block";
  }

  // Hide popup
  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup when clicking outside popup content
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // Form submission to add assignment
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const workerIndex = workerSelect.value;
    const job = jobSelect.value;

    if (workerIndex === "" || job === "") {
      alert("Please select both worker and job.");
      return;
    }

    const worker = workers[workerIndex];

    assignments.push({ 
      worker: worker.name, 
      job, 
      contact: worker.contact || "N/A", 
      skills: worker.skills || "N/A",
      salary: worker.salary || "",
      profile: worker.profile || ""
    });

    localStorage.setItem("assignments", JSON.stringify(assignments));
    renderAssignments();
    form.reset();
  });

  // Handle clicks for Details and Delete buttons
  tableBody.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    if (e.target.classList.contains("details-btn")) {
      showPopup(index);
    } else if (e.target.classList.contains("delete-btn")) {
      if (confirm("Are you sure you want to delete this assignment?")) {
        assignments.splice(index, 1);
        localStorage.setItem("assignments", JSON.stringify(assignments));
        renderAssignments();
      }
    }
  });

  // Initial render
  renderAssignments();
});
