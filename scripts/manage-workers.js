document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addWorkerForm");
  const tableBody = document.getElementById("workerTableBody");
  const popup = document.getElementById("workerPopup");
  const closePopupBtn = document.getElementById("closePopup");

  // Get workers from localStorage or preload defaults
  const defaultWorkers = [
    {
      name: "Arun Kumar",
      contact: "9876543210",
      skills: "Plumbing, Electrical",
      salary: "₹25,000/month",
      profile: "Experienced plumber with 5 years of service in Chennai area."
    },
    {
      name: "Priya Ramesh",
      contact: "9123456780",
      skills: "Carpentry, Painting",
      salary: "₹22,000/month",
      profile: "Expert carpenter skilled in home furniture and interior painting."
    },
    {
      name: "Vikram Singh",
      contact: "9988776655",
      skills: "Electrician, AC Repair",
      salary: "₹28,000/month",
      profile: "Certified electrician with AC repair experience, based in Coimbatore."
    }
  ];

  let workers = JSON.parse(localStorage.getItem("workers")) || defaultWorkers;

  // Save to localStorage
  function saveWorkers() {
    localStorage.setItem("workers", JSON.stringify(workers));
  }

  function renderWorkers() {
    tableBody.innerHTML = "";
    workers.forEach((worker, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${worker.name}</td>
        <td>${worker.contact}</td>
        <td>${worker.skills}</td>
        <td>
          <button class="details-btn" data-index="${index}">Details</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  renderWorkers();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("workerName").value.trim();
    const contact = document.getElementById("workerContact").value.trim();
    const skills = document.getElementById("workerSkills").value.trim();

    if (!name || !contact || !skills) {
      alert("Please fill all fields.");
      return;
    }

    workers.push({
      name,
      contact,
      skills,
      salary: "₹20,000/month (To be updated)",
      profile: "New worker, profile details pending."
    });

    saveWorkers(); // ✅ Save to localStorage
    renderWorkers();
    form.reset();
  });

  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("details-btn")) {
      const index = e.target.getAttribute("data-index");
      const worker = workers[index];
      document.getElementById("popupName").textContent = `Name: ${worker.name}`;
      document.getElementById("popupContact").textContent = `Contact: ${worker.contact}`;
      document.getElementById("popupSkills").textContent = `Skills: ${worker.skills}`;
      document.getElementById("popupSalary").textContent = `Salary: ${worker.salary}`;
      document.getElementById("popupProfile").textContent = `Profile: ${worker.profile}`;
      popup.style.display = "block";
    }
    else if (e.target.classList.contains("delete-btn")) {
      const index = e.target.getAttribute("data-index");
      if (confirm("Are you sure you want to delete this worker?")) {
        workers.splice(index, 1);
        saveWorkers(); // ✅ Save updated list
        renderWorkers();
      }
    }
  });

  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});

