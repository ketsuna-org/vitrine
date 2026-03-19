document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-menu-toggle]");
  const navShell = navToggle?.closest(".nav-shell");
  const navPanel = document.querySelector("[data-menu-panel]");

  if (navToggle && navShell && navPanel) {
    navToggle.addEventListener("click", () => {
      const isOpen = navShell.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navShell.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-copy");
      const defaultLabel = button.getAttribute("data-copy-label") || button.textContent.trim();
      const copiedLabel = button.getAttribute("data-copy-success") || "Copied";

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = copiedLabel;
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.textContent = defaultLabel;
          button.classList.remove("is-copied");
        }, 1800);
      } catch (_error) {
        button.textContent = text;
      }
    });
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (revealItems.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  }

  const progress = document.querySelector("[data-reading-progress] span");
  if (progress) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      progress.style.width = `${ratio * 100}%`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }
});
