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

    // 1. Dark Bot Creator mobile theme background
    const bgGrad = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
    bgGrad.addColorStop(0, "#111111");
    bgGrad.addColorStop(1, "#1D1D1D");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // 2. Subtle gradient glows (Bot Creator Brand Purple)
    // Glow 1: Top Right (Brand Secondary tint)
    const glow1 = ctx.createRadialGradient(baseWidth * 0.8, baseHeight * 0.25, 20, baseWidth * 0.8, baseHeight * 0.25, 180);
    glow1.addColorStop(0, "rgba(155, 48, 255, 0.12)");
    glow1.addColorStop(1, "rgba(155, 48, 255, 0)");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // Glow 2: Bottom Left (Brand Primary tint)
    const glow2 = ctx.createRadialGradient(baseWidth * 0.2, baseHeight * 0.8, 10, baseWidth * 0.2, baseHeight * 0.8, 220);
    glow2.addColorStop(0, "rgba(106, 15, 162, 0.14)");
    glow2.addColorStop(1, "rgba(106, 15, 162, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // Glow 3: Center Mid (Soft purple highlight)
    const glow3 = ctx.createRadialGradient(baseWidth * 0.6, baseHeight * 0.6, 30, baseWidth * 0.6, baseHeight * 0.6, 140);
    glow3.addColorStop(0, "rgba(177, 157, 247, 0.08)");
    glow3.addColorStop(1, "rgba(177, 157, 247, 0)");
    ctx.fillStyle = glow3;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    // 3. Subtle grid overlay
    ctx.strokeStyle = "rgba(124, 138, 255, 0.03)";
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
    ctx.strokeStyle = "rgba(124, 138, 255, 0.05)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, baseHeight * 0.62);
    for (let x = 0; x <= baseWidth; x += 15) {
      const y = baseHeight * 0.62 + Math.sin(x * 0.015) * 12 + Math.cos(x * 0.035) * 4;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Graphic decorative corner HUD frames
    ctx.strokeStyle = "rgba(124, 138, 255, 0.08)";
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
    ctx.strokeStyle = "rgba(124, 138, 255, 0.06)";
    ctx.fillStyle = "rgba(124, 138, 255, 0.02)";
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
    ctx.fillStyle = "rgba(124, 138, 255, 0.1)";
    ctx.strokeStyle = "rgba(124, 138, 255, 0.25)";
    ctx.beginPath();
    ctx.arc(botX + 30, botY + 2, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Bot Ears/Side-connectors
    ctx.strokeStyle = "rgba(124, 138, 255, 0.05)";
    ctx.beginPath();
    ctx.rect(botX - 4, botY + 30, 4, 15);
    ctx.rect(botX + 60, botY + 30, 4, 15);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = "rgba(124, 138, 255, 0.15)";
    ctx.beginPath();
    ctx.arc(botX + 18, botY + 35, 5, 0, Math.PI * 2);
    ctx.arc(botX + 42, botY + 35, 5, 0, Math.PI * 2);
    ctx.fill();

    // 6. Title and Guides Watermark
    ctx.font = "bold 9px 'Space Grotesk', system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "rgba(124, 138, 255, 0.15)";
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
    ctx.fillStyle = "rgba(124, 138, 255, 0.08)";
    ctx.strokeStyle = "rgba(124, 138, 255, 0.18)";
    ctx.lineWidth = 1;
    roundedRect(badgeX, badgeY, badgeW, badgeH, 6);
    ctx.fill();
    ctx.stroke();

    // Badge text drawing
    ctx.fillStyle = "#7c8aff";
    ctx.shadowColor = "rgba(124, 138, 255, 0.15)";
    ctx.shadowBlur = 3;
    ctx.fillText(catText, badgeX + padX, badgeY + padY + 9);
    ctx.shadowBlur = 0; // reset shadow

    // 8. Wrapped Title Text
    ctx.fillStyle = "#c9d1d9";
    ctx.font = "900 24px 'Space Grotesk', system-ui, -apple-system, sans-serif";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 4;

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
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, baseWidth, baseHeight);
    ctx.strokeStyle = "#7c8aff";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, baseWidth - 20, baseHeight - 20);
    ctx.fillStyle = "#c9d1d9";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Failed to load illustration", 30, 50);
    ctx.fillStyle = "rgba(124, 138, 255, 0.5)";
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
  const tables = document.querySelectorAll("article table, .prose table");
  if (tables.length > 0) {
    const wrappers = [];
    tables.forEach((table) => {
      if (table.parentElement.classList.contains("table-responsive-wrapper")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-responsive-wrapper";
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("tabindex", "0");
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      wrappers.push(wrapper);
    });

    const updateWrapperScrollState = (wrapper) => {
      const isScrollable = wrapper.scrollWidth > wrapper.clientWidth;
      wrapper.classList.toggle("is-scrollable", isScrollable);
      wrapper.classList.toggle("scrolled-end",
        isScrollable && wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 2);
    };

    if (window.ResizeObserver) {
      const ro = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          updateWrapperScrollState(entry.target);
        });
      });
      wrappers.forEach((wrapper) => {
        ro.observe(wrapper);
        wrapper.addEventListener("scroll", () => updateWrapperScrollState(wrapper), { passive: true });
      });
    } else {
      window.requestAnimationFrame(() => {
        wrappers.forEach((wrapper) => {
          const checkScroll = () => updateWrapperScrollState(wrapper);
          wrapper.addEventListener("scroll", checkScroll, { passive: true });
          checkScroll();
          window.addEventListener("resize", checkScroll);
        });
      });
    }
  }

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
      
      // Map semantic Reicon sprite keys and alert headers
      let icon = "info";
      let titleText = "Note";
      if (type === "TIP") { icon = "lightbulb"; titleText = "Tip"; }
      else if (type === "IMPORTANT") { icon = "priority_high"; titleText = "Important"; }
      else if (type === "WARNING") { icon = "warning"; titleText = "Warning"; }
      else if (type === "CAUTION") { icon = "report"; titleText = "Caution"; }

      // Prepend the icon header structure
      const header = document.createElement("div");
      header.className = "gfm-alert-header";
      header.innerHTML = `
        <svg class="reicon text-lg" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#${icon}"></use></svg>
        <span class="gfm-alert-title">${titleText}</span>
      `;
      bq.insertBefore(header, bq.firstChild);
    }
  });

  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex="0"]';
  // Drawers share keyboard, focus, background inertness, and scroll handling.
  const bindDrawer = ({ panel, trigger, closeButton, breakpoint, openClass, onChange }) => {
    if (!panel || !trigger) return;
    let open = false;
    let previousFocus;
    let previousOverflow;
    let inertElements = [];
    const narrow = () => window.innerWidth < breakpoint;
    const setOpen = (next, restoreFocus = true) => {
      next = next && narrow();
      if (next === open) return;
      open = next;
      trigger.setAttribute('aria-expanded', String(open));
      panel.classList.toggle(openClass, open);
      onChange?.(open);
      if (open) {
        previousFocus = document.activeElement;
        previousOverflow = document.body.style.overflow;
        panel.hidden = false;
        panel.inert = false;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        let branch = panel;
        while (branch.parentElement && branch.parentElement !== document.documentElement) {
          for (const sibling of branch.parentElement.children) {
            if (sibling !== branch && !sibling.inert && !['SCRIPT', 'STYLE', 'LINK'].includes(sibling.tagName)) {
              sibling.inert = true;
              inertElements.push(sibling);
            }
          }
          branch = branch.parentElement;
        }
        document.body.style.overflow = 'hidden';
        (closeButton || panel.querySelector(focusableSelector))?.focus();
      } else {
        for (const element of inertElements) element.inert = false;
        inertElements = [];
        document.body.style.overflow = previousOverflow || '';
        panel.hidden = narrow();
        panel.inert = narrow();
        panel.removeAttribute('aria-modal');
        if (!narrow()) panel.removeAttribute('role');
        if (restoreFocus) (previousFocus?.isConnected ? previousFocus : trigger).focus();
      }
    };
    trigger.addEventListener('click', () => setOpen(!open));
    closeButton?.addEventListener('click', () => setOpen(false));
    panel.addEventListener('click', event => {
      if (event.target === panel) setOpen(false);
      if (event.target.closest('a[href]')) setOpen(false, false);
    });
    document.addEventListener('keydown', event => {
      if (!open) return;
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
      if (event.key === 'Tab') {
        const controls = [...panel.querySelectorAll(focusableSelector)].filter(element => element.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    });
    const sync = () => {
      if (!narrow() && open) setOpen(false, false);
      panel.hidden = narrow() && !open;
      panel.inert = narrow() && !open;
      if (!narrow()) { panel.removeAttribute('role'); panel.removeAttribute('aria-modal'); }
    };
    window.addEventListener('resize', sync);
    sync();
  };
  const navToggle = document.querySelector('[data-menu-toggle]');
  const navShell = document.querySelector('.nav-shell');
  const navPanel = document.querySelector('[data-menu-panel]');
  if (navPanel) document.body.appendChild(navPanel);
  bindDrawer({
    panel: navPanel, trigger: navToggle, closeButton: navPanel?.querySelector('[data-menu-close-btn]'),
    breakpoint: 768, openClass: 'is-open',
    onChange: open => { navShell?.classList.toggle('is-open', open); navToggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); }
  });
  // Site navigation must remain hidden on desktop even though the sections sidebar remains visible.
  if (navPanel && window.innerWidth >= 768) { navPanel.hidden = true; navPanel.inert = true; }
  window.addEventListener('resize', () => { if (navPanel && window.innerWidth >= 768) { navPanel.hidden = true; navPanel.inert = true; } });
  bindDrawer({
    panel: document.getElementById('docs-sidebar'), trigger: document.getElementById('sidebar-toggle-btn'),
    closeButton: document.getElementById('sidebar-close-btn'), breakpoint: 1024, openClass: 'is-active'
  });

  document.querySelectorAll('[data-docs-dropdown]').forEach(container => {
    const button = container.querySelector('[data-docs-trigger]');
    const menu = container.querySelector('[data-docs-menu]');
    const links = [...menu.querySelectorAll('a')];
    const setOpen = open => { menu.hidden = !open; button.setAttribute('aria-expanded', String(open)); };
    button.addEventListener('click', () => setOpen(menu.hidden));
    container.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); button.focus(); }
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault(); setOpen(true);
        const current = links.indexOf(document.activeElement);
        const index = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : event.key === 'ArrowDown' ? (current + 1) % links.length : (current <= 0 ? links.length - 1 : current - 1);
        links[index]?.focus();
      }
    });
    container.addEventListener('focusout', event => { if (!container.contains(event.relatedTarget)) setOpen(false); });
    document.addEventListener('click', event => { if (!container.contains(event.target)) setOpen(false); });
  });

  document.querySelectorAll('[data-document-article]').forEach(article => {
    const headings = [...article.querySelectorAll('h2[id], section[id] > h2')];
    const entries = [];
    headings.forEach((heading, index) => {
      const target = heading.id ? heading : heading.parentElement;
      if (!target.id) target.id = `document-section-${index + 1}`;
      if (!entries.some(entry => entry.id === target.id)) entries.push({ id: target.id, text: heading.textContent.trim() });
    });
    document.querySelectorAll('[data-document-toc]').forEach(nav => {
      if (!entries.length) return;
      nav.replaceChildren(...entries.map(entry => {
        const link = document.createElement('a');
        link.href = `#${entry.id}`; link.textContent = entry.text;
        link.className = 'text-on-surface-variant hover:text-primary transition-colors';
        return link;
      }));
    });
  });

  document.querySelectorAll('[data-copy]').forEach(button => {
    const label = button.querySelector('span') || button;
    const initialLabel = label.textContent.trim();
    let status;
    const report = (message, failed) => {
      if (!status) {
        status = document.createElement('p');
        status.className = 'copy-feedback text-xs text-on-surface-variant';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        button.after(status);
      }
      status.textContent = message;
      status.classList.toggle('text-error', failed);
    };
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        label.textContent = button.dataset.copySuccess || 'Copied!';
        report('Copied to clipboard.', false);
        window.setTimeout(() => { label.textContent = initialLabel; }, 1800);
      } catch {
        report('Could not copy. Select the command and copy it manually.', true);
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

  // Native buttons provide Enter/Space. Arrow keys select and focus a neighboring tab.
  document.querySelectorAll('.dual-view-tabs').forEach((container, groupIndex) => {
    const nav = container.querySelector('.dual-view-nav');
    if (!nav) return;
    const tabs = [...nav.querySelectorAll('.dual-tab-btn')];
    const panels = [...container.children].filter(child => child.classList.contains('dual-tab-panel'));
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', 'Example view');
    const select = index => {
      tabs.forEach((tab, tabIndex) => {
        const active = tabIndex === index;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (panels[tabIndex]) { panels[tabIndex].classList.toggle('active', active); panels[tabIndex].hidden = !active; }
      });
    };
    tabs.forEach((tab, index) => {
      tab.id = `example-${groupIndex}-tab-${index}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `example-${groupIndex}-panel-${index}`);
      if (panels[index]) {
        panels[index].id = `example-${groupIndex}-panel-${index}`;
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', tab.id);
        panels[index].tabIndex = 0;
      }
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        select(next); tabs[next].focus();
      });
    });
    select(Math.max(0, tabs.findIndex(tab => tab.classList.contains('active'))));
  });
};

// Bulletproof loader: Activate immediately if DOM is already parsed,
// otherwise bind to standard DOMContentLoaded.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}


