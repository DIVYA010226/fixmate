document.addEventListener("DOMContentLoaded", function () {
  const serviceForm = document.getElementById("addServiceForm");
  const serviceNameInput = document.getElementById("serviceName");
  const servicePriceInput = document.getElementById("servicePrice");
  const serviceDurationInput = document.getElementById("serviceDuration");
  const servicesTableBody = document.getElementById("servicesTableBody");

  let defaultServices = [
    { name: "Plumbing", price: "₹500", duration: "2 hours" },
    { name: "Carpentry", price: "₹600", duration: "3 hours" },
    { name: "Electrical", price: "₹550", duration: "2.5 hours" },
    { name: "Painting", price: "₹700", duration: "5 hours" },
    { name: "Cleaning", price: "₹400", duration: "1.5 hours" },
    { name: "Moving Help", price: "₹1000", duration: "6 hours" },
    { name: "Gardening", price: "₹450", duration: "2 hours" },
    { name: "Renovation", price: "₹1200", duration: "10 hours" },
    { name: "AC Service", price: "₹800", duration: "3 hours" },
    { name: "Pest Control", price: "₹650", duration: "4 hours" },
    { name: "Vehicle Wash", price: "₹300", duration: "1 hour" },
    { name: "Handyman", price: "₹500", duration: "3 hours" }
  ];

  // Load from localStorage or use default
  let services = JSON.parse(localStorage.getItem("services")) || defaultServices;

  function renderServices() {
    servicesTableBody.innerHTML = "";
    services.forEach((service, index) => {
      const row = document.createElement("tr");

      if (service.isEditing) {
        row.innerHTML = `
          <td><input type="text" id="editName${index}" value="${service.name}" /></td>
          <td><input type="text" id="editPrice${index}" value="${service.price}" /></td>
          <td><input type="text" id="editDuration${index}" value="${service.duration}" /></td>
          <td>
            <button class="edit-btn" onclick="saveEdit(${index})">Save</button>
            <button class="delete-btn" onclick="cancelEdit(${index})">Cancel</button>
          </td>
        `;
      } else {
        row.innerHTML = `
          <td>${service.name}</td>
          <td>${service.price}</td>
          <td>${service.duration}</td>
          <td>
            <button class="edit-btn" onclick="editService(${index})">Edit</button>
            <button class="duration-btn" onclick="changeDuration(${index})">Change Duration</button>
            <button class="delete-btn" onclick="deleteService(${index})">Delete</button>
          </td>
        `;
      }

      servicesTableBody.appendChild(row);
    });
  }

  serviceForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = serviceNameInput.value.trim();
    const price = servicePriceInput.value.trim();
    const duration = serviceDurationInput.value.trim();

    if (name && price && duration) {
      services.push({ name, price, duration });
      localStorage.setItem("services", JSON.stringify(services));
      renderServices();
      serviceForm.reset();
    }
  });

  window.editService = function (index) {
    services[index].isEditing = true;
    renderServices();
  };

  window.saveEdit = function (index) {
    const editedName = document.getElementById(`editName${index}`).value.trim();
    const editedPrice = document.getElementById(`editPrice${index}`).value.trim();
    const editedDuration = document.getElementById(`editDuration${index}`).value.trim();

    if (editedName && editedPrice && editedDuration) {
      services[index] = {
        name: editedName,
        price: editedPrice,
        duration: editedDuration
      };
      localStorage.setItem("services", JSON.stringify(services));
      renderServices();
    } else {
      alert("Please fill all fields.");
    }
  };

  window.cancelEdit = function (index) {
    services[index].isEditing = false;
    renderServices();
  };

  window.changeDuration = function (index) {
    const newDuration = prompt("Enter new duration for this service:", services[index].duration);
    if (newDuration !== null && newDuration.trim() !== "") {
      services[index].duration = newDuration.trim();
      localStorage.setItem("services", JSON.stringify(services));
      renderServices();
    }
  };

  window.deleteService = function (index) {
    if (confirm("Are you sure you want to delete this service?")) {
      services.splice(index, 1);
      localStorage.setItem("services", JSON.stringify(services));
      renderServices();
    }
  };

  // Initial render
  renderServices();
});
