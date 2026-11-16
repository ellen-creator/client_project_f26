document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.querySelector("#current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const tocLinks = document.querySelectorAll(".on-this-page a[href^='#']");
  const sections = Array.from(tocLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (tocLinks.length > 0 && sections.length > 0) {
    const updateActiveToc = () => {
      const scrollPos = window.scrollY + 140;
      let currentId = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          currentId = section.id;
        }
      }

      tocLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active-toc", isMatch);
        if (isMatch) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    window.addEventListener("scroll", updateActiveToc, { passive: true });
    updateActiveToc();
  }
});