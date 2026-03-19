document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-menu-toggle]");
  const navShell = navToggle?.closest(".nav-shell");
  const navPanel = document.querySelector("[data-menu-panel]");

  if (navToggle && navShell && navPanel) {
    const openLabel = navToggle.getAttribute("data-label-open") || navToggle.getAttribute("aria-label") || "Open navigation";
    const closeLabel = navToggle.getAttribute("data-label-close") || "Close navigation";

    const closeMenu = ({ restoreFocus = false } = {}) => {
      navShell.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", openLabel);

      if (restoreFocus) {
        navToggle.focus();
      }
    };

    const openMenu = () => {
      navShell.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", closeLabel);
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navShell.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (navShell.classList.contains("is-open") && !navShell.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navShell.classList.contains("is-open")) {
        closeMenu({ restoreFocus: true });
      }
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
  } else {
    revealItems.forEach((item) => {
      item.classList.add("reveal", "is-visible");
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
