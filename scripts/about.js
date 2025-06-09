document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".feature");
  features.forEach((feature, index) => {
    feature.style.animationDelay = `${index * 0.3 + 0.3}s`;
  });
});

