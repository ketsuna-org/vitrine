// Define global canvas cover drawing and fallback engine at the top-level scope.
// This guarantees they are registered immediately as the script parses, making them
// instantly accessible for any inline image onerror events before DOMContentLoaded fires.

window.drawPremiumBlogCover = function(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const title = canvas.getAttribute("data-title") || "Untitled Guide";
  const category = canvas.getAttribute("data-category") || "TUTORIEL";

  // Standard high-fidelity canvas base resolution (16:9)
  const baseWidth = 640;
  const baseHeight = 360;

  // Retina / high DPI scaling support
  const dpr = window.devicePixelRatio || 1;

  try {
    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;

    // Set display layout style
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    ctx.scale(dpr, dpr);

    // Custom rounded rectangles compatible with all older and modern browsers
    const roundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    // 1. Sleek Cyberpunk Deep Blue/Indigo background
    const bgGrad = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
    bgGrad.addColorStop(0, "#080d19");
    bgGrad.addColorStop(1, "#121b2d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // 2. High-fidelity neon mesh gradient radial glows
    // Glow 1: Top Right (Brilliant Lavender)
    const glow1 = ctx.createRadialGradient(baseWidth * 0.8, baseHeight * 0.25, 20, baseWidth * 0.8, baseHeight * 0.25, 180);
    glow1.addColorStop(0, "rgba(221, 183, 255, 0.22)");
    glow1.addColorStop(1, "rgba(221, 183, 255, 0)");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // Glow 2: Bottom Left (Tech Indigo/Blue)
    const glow2 = ctx.createRadialGradient(baseWidth * 0.2, baseHeight * 0.8, 10, baseWidth * 0.2, baseHeight * 0.8, 220);
    glow2.addColorStop(0, "rgba(49, 49, 192, 0.32)");
    glow2.addColorStop(1, "rgba(49, 49, 192, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // Glow 3: Center Mid (Luminous Sky Blue)
    const glow3 = ctx.createRadialGradient(baseWidth * 0.6, baseHeight * 0.6, 30, baseWidth * 0.6, baseHeight * 0.6, 140);
    glow3.addColorStop(0, "rgba(192, 193, 255, 0.16)");
    glow3.addColorStop(1, "rgba(192, 193, 255, 0)");
    ctx.fillStyle = glow3;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // 3. Technical Cyber Grid overlay
    ctx.strokeStyle = "rgba(152, 141, 159, 0.05)";
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < baseWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, baseHeight);
      ctx.stroke();
    }
    for (let y = 0; y < baseHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(baseWidth, y);
      ctx.stroke();
    }

    // 4. Subtle background decorative circuit/sine wave
    ctx.strokeStyle = "rgba(221, 183, 255, 0.08)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, baseHeight * 0.62);
    for (let x = 0; x <= baseWidth; x += 15) {
      const y = baseHeight * 0.62 + Math.sin(x * 0.015) * 12 + Math.cos(x * 0.035) * 4;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Graphic decorative corner HUD frames
    ctx.strokeStyle = "rgba(221, 183, 255, 0.15)";
    ctx.lineWidth = 2;
    const margin = 24;
    const bracketSize = 12;

    // Top-Left corner HUD
    ctx.beginPath();
    ctx.moveTo(margin + bracketSize, margin);
    ctx.lineTo(margin, margin);
    ctx.lineTo(margin, margin + bracketSize);
    ctx.stroke();

    // Bottom-Right corner HUD
    ctx.beginPath();
    ctx.moveTo(baseWidth - margin - bracketSize, baseHeight - margin);
    ctx.lineTo(baseWidth - margin, baseHeight - margin);
    ctx.lineTo(baseWidth - margin, baseHeight - margin - bracketSize);
    ctx.stroke();

    // 5. Stylized Vector Bot Icon in the bottom-right quadrant
    const botX = baseWidth - 100;
    const botY = baseHeight - 115;
    ctx.strokeStyle = "rgba(221, 183, 255, 0.12)";
    ctx.fillStyle = "rgba(221, 183, 255, 0.02)";
    ctx.lineWidth = 2;

    // Head (rounded rect using backward-compatible function)
    roundedRect(botX, botY + 15, 60, 48, 12);
    ctx.fill();
    ctx.stroke();

    // Antenna shaft
    ctx.beginPath();
    ctx.moveTo(botX + 30, botY + 15);
    ctx.lineTo(botX + 30, botY + 2);
    ctx.stroke();

    // Antenna beacon (glowing bulb)
    ctx.fillStyle = "rgba(221, 183, 255, 0.18)";
    ctx.strokeStyle = "rgba(221, 183, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(botX + 30, botY + 2, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Bot Ears/Side-connectors
    ctx.strokeStyle = "rgba(221, 183, 255, 0.1)";
    ctx.beginPath();
    ctx.rect(botX - 4, botY + 30, 4, 15);
    ctx.rect(botX + 60, botY + 30, 4, 15);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = "rgba(221, 183, 255, 0.25)";
    ctx.beginPath();
    ctx.arc(botX + 18, botY + 35, 5, 0, Math.PI * 2);
    ctx.arc(botX + 42, botY + 35, 5, 0, Math.PI * 2);
    ctx.fill();

    // 6. Title and Guides Watermark
    ctx.font = "bold 9px 'Space Grotesk', system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "rgba(221, 183, 255, 0.35)";
    ctx.fillText("BOT CREATOR // RUNNER", baseWidth - 150, margin + 6);

    // 7. Category badge
    const catText = category.toUpperCase();
    ctx.font = "bold 10px 'Space Grotesk', system-ui, -apple-system, sans-serif";
    const catWidth = ctx.measureText(catText).width;
    const padX = 10;
    const padY = 5;
    const badgeX = margin;
    const badgeY = margin;
    const badgeW = catWidth + padX * 2;
    const badgeH = 20;

    // Badge frame & fill (rounded rect using backward-compatible function)
    ctx.fillStyle = "rgba(221, 183, 255, 0.08)";
    ctx.strokeStyle = "rgba(221, 183, 255, 0.25)";
    ctx.lineWidth = 1;
    roundedRect(badgeX, badgeY, badgeW, badgeH, 6);
    ctx.fill();
    ctx.stroke();

    // Badge text drawing
    ctx.fillStyle = "#ddb7ff";
    ctx.shadowColor = "rgba(221, 183, 255, 0.3)";
    ctx.shadowBlur = 4;
    ctx.fillText(catText, badgeX + padX, badgeY + padY + 9);
    ctx.shadowBlur = 0; // reset shadow

    // 8. Wrapped Title Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 24px 'Space Grotesk', system-ui, -apple-system, sans-serif";
    ctx.shadowColor = "rgba(255, 255, 255, 0.15)";
    ctx.shadowBlur = 8;

    const maxWidth = baseWidth - margin * 2 - 40;
    const words = title.split(" ");
    const lines = [];
    let currentLine = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(currentLine.trim());
        currentLine = words[n] + " ";
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    // Vertically center/align lines in the left-middle half
    const lineGap = 32;
    const startY = baseHeight * 0.46;

    lines.forEach((line, index) => {
      ctx.fillText(line, margin, startY + index * lineGap);
    });

    ctx.shadowBlur = 0; // reset shadow
  } catch (e) {
    console.error("Canvas cover illustration drawing crashed:", e);
    ctx.fillStyle = "#0c1326";
    ctx.fillRect(0, 0, baseWidth, baseHeight);
    ctx.strokeStyle = "#ddb7ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, baseWidth - 20, baseHeight - 20);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Failed to load illustration", 30, 50);
    ctx.fillStyle = "rgba(221, 183, 255, 0.6)";
    ctx.font = "12px monospace";
    ctx.fillText(e.message, 30, 80);
  }
};

window.initCanvasFallback = function(canvas) {
  if (!canvas) return;
  canvas.style.display = "block";
  window.drawPremiumBlogCover(canvas);
};

// General client-side interaction scripts wrapped in safe state checker
const initSite = () => {
  // Make all markdown tables responsive by wrapping them in a gorgeous styled overflow wrapper
  document.querySelectorAll("article table, .prose table").forEach((table) => {
    if (table.parentElement.classList.contains("table-responsive-wrapper")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "table-responsive-wrapper";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // Parse GitHub-flavored markdown alerts (e.g. > [!NOTE], > [!TIP])
  document.querySelectorAll("blockquote").forEach((bq) => {
    const p = bq.querySelector("p") || bq;
    const text = p.innerHTML.trim();
    
    // Scan if the text starts with the [!TYPE] GFM format
    const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
    if (match) {
      const type = match[1].toUpperCase();
      
      // Clean out the raw [!TYPE] marker text
      const cleanHTML = text.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, "");
      p.innerHTML = cleanHTML;
      
      // Convert standard blockquote to premium custom glass alert
      bq.className = `gfm-alert gfm-alert-${type.toLowerCase()}`;
      
      // Map BDFD-harmonized Material symbol vector icons & headers
      let icon = "info";
      let titleText = "Note";
      if (type === "TIP") { icon = "lightbulb"; titleText = "Tip"; }
      else if (type === "IMPORTANT") { icon = "priority_high"; titleText = "Important"; }
      else if (type === "WARNING") { icon = "warning"; titleText = "Warning"; }
      else if (type === "CAUTION") { icon = "report"; titleText = "Caution"; }

      // Retrieve document language for localization
      const lang = document.documentElement.lang || "en";
      if (lang.startsWith("fr")) {
        if (type === "NOTE") titleText = "Note";
        else if (type === "TIP") titleText = "Conseil";
        else if (type === "IMPORTANT") titleText = "Important";
        else if (type === "WARNING") titleText = "Avertissement";
        else if (type === "CAUTION") titleText = "Attention";
      }

      // Prepend the icon header structure
      const header = document.createElement("div");
      header.className = "gfm-alert-header";
      header.innerHTML = `
        <span class="material-symbols-outlined text-lg">${icon}</span>
        <span class="gfm-alert-title">${titleText}</span>
      `;
      bq.insertBefore(header, bq.firstChild);
    }
  });

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

    console.log("initSite: Mobile navigation panel and modal controllers bound.");

    navToggle.addEventListener("click", () => {
      const isOpen = navShell.classList.contains("is-open");
      console.log("initSite: Hamburger toggle button clicked. Current isOpen =", isOpen);
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    const closeBtn = navPanel.querySelector("[data-menu-close-btn]");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        console.log("initSite: Modal inner close button clicked. Closing menu...");
        closeMenu();
      });
    }

    navPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        console.log("initSite: Modal link clicked. Closing menu...");
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

  /* Wrap markdown tables in scrollable containers for mobile */
  document.querySelectorAll(".markdown-body > table").forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll-wrapper";
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute("tabindex", "0");
    wrapper.style.position = "relative";
    table.replaceWith(wrapper);
    wrapper.appendChild(table);

    const checkScroll = () => {
      const isScrollable = wrapper.scrollWidth > wrapper.clientWidth;
      wrapper.classList.toggle("is-scrollable", isScrollable);
      wrapper.classList.toggle("scrolled-end", 
        isScrollable && wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 2);
    };

    wrapper.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    window.addEventListener("resize", checkScroll);
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

  // Trigger drawing on all visible canvas covers on page mount
  const drawAllCovers = () => {
    document.querySelectorAll("canvas.js-blog-cover").forEach((canvas) => {
      if (canvas.style.display !== "none") {
        window.drawPremiumBlogCover(canvas);
      }
    });
  };

  drawAllCovers();

  // If branding fonts load late, refresh all covers to prevent default system font offsets
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawAllCovers).catch(err => {
      console.error("Delayed font load hook failed", err);
    });
  }
};

// Bulletproof loader: Activate immediately if DOM is already parsed,
// otherwise bind to standard DOMContentLoaded.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}
