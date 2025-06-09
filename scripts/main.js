document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const allowedPages = ["index.html", "", "login.html"];

  // Get current page filename
  const currentPage = window.location.pathname.split("/").pop();

  // Only run this on public pages like index or login
  if (allowedPages.includes(currentPage)) {
    document.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // Ignore:
        // - Anchor links
        // - Empty links
        // - Public allowed pages
        if (!href || href.startsWith("#") || allowedPages.includes(href)) {
          return;
        }

        // If not logged in, block access and redirect to login
        if (!isLoggedIn) {
          e.preventDefault();
          localStorage.setItem("redirectAfterLogin", href);
          window.location.href = "login.html";
        }
      });
    });
  }
});
