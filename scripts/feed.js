const feedbackContainer = document.getElementById('feedbackContainer');

function loadFeedback() {
  // Get feedbacks array from localStorage
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

  feedbackContainer.innerHTML = '';

  if (feedbacks.length === 0) {
    feedbackContainer.innerHTML = '<p>No feedback has been submitted yet.</p>';
    return;
  }

  feedbacks.forEach(fb => {
    // Find corresponding booking info
    const booking = bookings[fb.bookingIndex];
    const bookingInfo = booking ? `${booking.service} for ${booking.name}` : 'Booking removed';

    const feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('feedback-item');

    feedbackDiv.innerHTML = `
      <div class="feedback-title">${bookingInfo}</div>
      <div class="feedback-message">"${fb.message}"</div>
    `;

    feedbackContainer.appendChild(feedbackDiv);
  });
}

// Load feedback on page load
window.onload = loadFeedback;

