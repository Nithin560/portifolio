/**
 * NITHIN VANDANA - PORTFOLIO INTERACTION ENGINE
 * Modular, dependency-free vanilla JavaScript.
 */

(function () {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;

  // DOM Elements
  const themeToggleBtn = document.getElementById("theme-toggle");
  const commandTriggerBtn = document.getElementById("command-trigger");
  const paletteBackdrop = document.getElementById("palette-backdrop");
  const paletteInput = document.getElementById("palette-input");
  const paletteList = document.getElementById("palette-list");
  const archModalBackdrop = document.getElementById("arch-modal-backdrop");
  const archModalTitle = document.getElementById("arch-modal-title");
  const archModalTabs = document.getElementById("arch-modal-tabs");
  const archModalBody = document.getElementById("arch-modal-body");
  const archModalClose = document.getElementById("arch-modal-close");
  const toastContainer = document.getElementById("toast-container");
  const terminalInput = document.getElementById("terminal-input");
  const terminalHistory = document.getElementById("terminal-history");

  let currentArchProject = null;
  let currentArchTab = "diagram";
  let paletteSelectedIndex = 0;

  // ==========================================================================
  // 1. Theme Engine
  // ==========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem("nithin-theme") || "dark";
    setTheme(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = activeTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        showToast(`Switched to ${newTheme} mode`, "🌓");
      });
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nithin-theme", theme);
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      themeIcon.innerHTML = theme === "dark" 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // ==========================================================================
  // 2. Toast Notifications
  // ==========================================================================
  function showToast(message, icon = "✓") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 200ms ease";
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  // ==========================================================================
  // 3. Clipboard & Quick Actions
  // ==========================================================================
  function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label} to clipboard!`, "📋");
      }).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    showToast(`Copied ${label} to clipboard!`, "📋");
  }

  // Attach click listeners to data-copy elements
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-copy]");
    if (target) {
      e.preventDefault();
      const val = target.getAttribute("data-copy");
      const label = target.getAttribute("data-label") || val;
      copyToClipboard(val, label);
    }
  });

  // ==========================================================================
  // 4. Command Palette (Ctrl + K)
  // ==========================================================================
  const COMMANDS = [
    { id: "email", group: "Actions", label: "Copy Email (nithinvandana26@gmail.com)", icon: "✉️", action: () => copyToClipboard(DATA.profile.email, "email") },
    { id: "phone", group: "Actions", label: "Copy Phone (+91 9347388372)", icon: "📞", action: () => copyToClipboard(DATA.profile.phone, "phone number") },
    { id: "resume", group: "Actions", label: "Open & Print Clean Resume", icon: "📄", action: () => window.open("resume.html", "_blank") },
    { id: "theme", group: "Preferences", label: "Toggle Dark / Light Mode", icon: "🌓", action: () => themeToggleBtn && themeToggleBtn.click() },
    { id: "github", group: "Links", label: "Open GitHub Profile (Nithin560)", icon: "🐙", action: () => window.open(DATA.profile.github, "_blank") },
    { id: "linkedin", group: "Links", label: "Open LinkedIn Profile", icon: "💼", action: () => window.open(DATA.profile.linkedin, "_blank") },
    { id: "jobnexa", group: "Architecture Deep Dive", label: "Inspect JobNexa (Async ATS Crawler)", icon: "⚡", action: () => openArchModal("jobnexa") },
    { id: "intellica", group: "Architecture Deep Dive", label: "Inspect Intellica (College Research Portal)", icon: "🏛️", action: () => openArchModal("intellica") },
    { id: "smartdiet", group: "Architecture Deep Dive", label: "Inspect Smart Diet (Gemini AI Fitness)", icon: "🥗", action: () => openArchModal("smart-diet") },
    { id: "sec-projects", group: "Navigation", label: "Jump to Projects", icon: "🚀", action: () => scrollToSection("projects") },
    { id: "sec-terminal", group: "Navigation", label: "Jump to Developer Terminal", icon: "💻", action: () => scrollToSection("terminal") },
    { id: "sec-skills", group: "Navigation", label: "Jump to Technical Arsenal", icon: "🛠️", action: () => scrollToSection("skills") },
    { id: "sec-experience", group: "Navigation", label: "Jump to Experience & Awards", icon: "🏆", action: () => scrollToSection("experience") },
    { id: "sec-contact", group: "Navigation", label: "Jump to Contact", icon: "📬", action: () => scrollToSection("contact") }
  ];

  function openPalette() {
    if (!paletteBackdrop) return;
    paletteBackdrop.classList.add("active");
    if (paletteInput) {
      paletteInput.value = "";
      paletteInput.focus();
    }
    renderPaletteItems(COMMANDS);
  }

  function closePalette() {
    if (!paletteBackdrop) return;
    paletteBackdrop.classList.remove("active");
  }

  function renderPaletteItems(items) {
    if (!paletteList) return;
    paletteList.innerHTML = "";

    if (items.length === 0) {
      paletteList.innerHTML = `<li style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.875rem;">No matching commands found.</li>`;
      return;
    }

    let currentGroup = "";
    items.forEach((item, index) => {
      if (item.group !== currentGroup) {
        currentGroup = item.group;
        const groupEl = document.createElement("li");
        groupEl.className = "palette-group-title";
        groupEl.textContent = currentGroup;
        paletteList.appendChild(groupEl);
      }

      const li = document.createElement("li");
      li.className = `palette-item ${index === paletteSelectedIndex ? "selected" : ""}`;
      li.innerHTML = `
        <div class="palette-item-left">
          <span>${item.icon}</span>
          <span>${item.label}</span>
        </div>
        <span style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--text-muted);">↵</span>
      `;

      li.addEventListener("click", () => {
        closePalette();
        item.action();
      });

      paletteList.appendChild(li);
    });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (paletteBackdrop && paletteBackdrop.classList.contains("active")) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === "Escape") {
      closePalette();
      closeArchModal();
    }
  });

  if (commandTriggerBtn) {
    commandTriggerBtn.addEventListener("click", openPalette);
  }

  if (paletteBackdrop) {
    paletteBackdrop.addEventListener("click", (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });
  }

  if (paletteInput) {
    paletteInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = COMMANDS.filter(cmd => 
        cmd.label.toLowerCase().includes(q) || cmd.group.toLowerCase().includes(q)
      );
      paletteSelectedIndex = 0;
      renderPaletteItems(filtered);
    });

    paletteInput.addEventListener("keydown", (e) => {
      const items = paletteList ? paletteList.querySelectorAll(".palette-item") : [];
      if (items.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        paletteSelectedIndex = (paletteSelectedIndex + 1) % items.length;
        updatePaletteSelection(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        paletteSelectedIndex = (paletteSelectedIndex - 1 + items.length) % items.length;
        updatePaletteSelection(items);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const active = items[paletteSelectedIndex];
        if (active) active.click();
      }
    });
  }

  function updatePaletteSelection(items) {
    items.forEach((item, idx) => {
      if (idx === paletteSelectedIndex) {
        item.classList.add("selected");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("selected");
      }
    });
  }

  // ==========================================================================
  // 5. System Architecture Deep-Dive Modal
  // ==========================================================================
  function openArchModal(projectId) {
    const proj = DATA.projects.find(p => p.id === projectId);
    if (!proj || !archModalBackdrop) return;

    currentArchProject = proj;
    currentArchTab = "diagram";

    if (archModalTitle) {
      archModalTitle.textContent = `${proj.title} — System Architecture & Telemetry`;
    }

    renderArchModalTabs();
    renderArchModalContent();
    archModalBackdrop.classList.add("active");
  }

  function closeArchModal() {
    if (!archModalBackdrop) return;
    archModalBackdrop.classList.remove("active");
  }

  function renderArchModalTabs() {
    if (!archModalTabs) return;
    archModalTabs.innerHTML = `
      <button class="modal-tab-btn ${currentArchTab === 'diagram' ? 'active' : ''}" data-tab="diagram">Architecture Flow</button>
      <button class="modal-tab-btn ${currentArchTab === 'overview' ? 'active' : ''}" data-tab="overview">Problem & Solution</button>
      <button class="modal-tab-btn ${currentArchTab === 'metrics' ? 'active' : ''}" data-tab="metrics">Telemetry & Metrics</button>
      <button class="modal-tab-btn ${currentArchTab === 'stack' ? 'active' : ''}" data-tab="stack">Stack Justification</button>
    `;

    archModalTabs.querySelectorAll(".modal-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentArchTab = btn.getAttribute("data-tab");
        renderArchModalTabs();
        renderArchModalContent();
      });
    });
  }

  function renderArchModalContent() {
    if (!archModalBody || !currentArchProject) return;
    const p = currentArchProject;

    if (currentArchTab === "diagram") {
      archModalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--text-primary);">Data Ingestion & Concurrency Flow</h4>
          <p style="color: var(--text-secondary); font-size: 0.875rem;">End-to-end telemetry pipeline representation demonstrating client boundaries, asynchronous processing, and persistence layers.</p>
        </div>
        <div class="arch-ascii-box">${p.architectureDiagram}</div>
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${p.links.github}" target="_blank" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8125rem;">View Repository on GitHub ↗</a>
          <button class="btn btn-secondary" onclick="navigator.clipboard.writeText(\`${p.architectureDiagram}\`); window.showToast('Copied Architecture ASCII!', '📐');" style="padding: 0.5rem 1rem; font-size: 0.8125rem;">Copy Diagram</button>
        </div>
      `;
    } else if (currentArchTab === "overview") {
      archModalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="color: var(--accent-rose); font-size: 1rem; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>⚠️</span> The Architectural Challenge
            </h4>
            <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">${p.problem}</p>
          </div>
          <div>
            <h4 style="color: var(--accent-emerald); font-size: 1rem; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>✅</span> The Engineered Solution
            </h4>
            <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">${p.solution}</p>
          </div>
          <div>
            <h4 style="color: var(--accent-cyan); font-size: 1rem; margin-bottom: 0.6rem;">Key Engineering Accomplishments</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
              ${p.highlights.map(h => `<li style="font-size: 0.875rem; color: var(--text-secondary);"><span style="color: var(--accent-indigo); margin-right: 0.5rem;">▸</span>${h}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    } else if (currentArchTab === "metrics") {
      archModalBody.innerHTML = `
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 1rem; color: var(--text-primary);">Validated Production Benchmarks</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            ${p.metrics.map(m => `
              <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); padding: 1.25rem 1rem; border-radius: var(--radius-md); text-align: center;">
                <div style="font-family: var(--font-mono); font-size: 1.75rem; font-weight: 800; color: var(--accent-cyan);">${m.value}</div>
                <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); margin-top: 0.25rem;">${m.label}</div>
              </div>
            `).join("")}
          </div>
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-md); padding: 1rem; font-size: 0.875rem; color: #a7f3d0;">
            <strong>Telemetry Verification:</strong> All metrics reflect actual live deployments and stress tests executed during local and institutional server operations.
          </div>
        </div>
      `;
    } else if (currentArchTab === "stack") {
      archModalBody.innerHTML = `
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.75rem; color: var(--text-primary);">Technology Stack & Rationale</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            ${p.tags.map(t => `<span class="tech-tag" style="font-size: 0.8125rem; padding: 0.35rem 0.75rem;">${t}</span>`).join("")}
          </div>
          <p style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.6;">
            Every component in <strong>${p.title}</strong> was chosen with precision. No unnecessary bloat, no fragile ORM magic. Concurrency was delegated to native asynchronous runtimes, schema boundaries were locked down with Pydantic, and deployment was standardized with multi-stage Docker builds.
          </p>
        </div>
      `;
    }
  }

  if (archModalClose) archModalClose.addEventListener("click", closeArchModal);
  if (archModalBackdrop) {
    archModalBackdrop.addEventListener("click", (e) => {
      if (e.target === archModalBackdrop) closeArchModal();
    });
  }

  // Attach architecture modal openers
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-arch]");
    if (trigger) {
      e.preventDefault();
      const projId = trigger.getAttribute("data-open-arch");
      openArchModal(projId);
    }
  });

  // ==========================================================================
  // 6. Interactive Developer Terminal Emulator
  // ==========================================================================
  const CLI_COMMANDS = {
    help: () => [
      "Available commands:",
      "  whoami       - Display developer summary and core focus",
      "  projects     - List flagship production platforms",
      "  skills       - Display full technical matrix breakdown",
      "  stats        - Show verified engineering metrics",
      "  contact      - Display contact channels and email/phone",
      "  architecture - Inspect high-throughput system flows",
      "  resume       - View ATS-compliant printable resume link",
      "  clear        - Clear terminal screen",
      "  sudo hire    - Fast-track recruiter onboarding action"
    ].join("\n"),

    whoami: () => [
      `Name:     ${DATA.profile.name}`,
      `Title:    ${DATA.profile.title}`,
      `Location: ${DATA.profile.location}`,
      `Status:   ${DATA.profile.status}`,
      `Education: B.Tech CSE (2022-2026) @ DVR & Dr. HS MIC College of Technology | CGPA: 8.2/10`,
      `Focus:    AsyncIO, Python/FastAPI, Distributed Ingestion, LLM Systems, React/TS`
    ].join("\n"),

    projects: () => DATA.projects.map(p => `• [${p.id.toUpperCase()}] ${p.title}\n  ${p.tagline}\n  Stack: ${p.tags.slice(0, 6).join(", ")}`).join("\n\n"),

    skills: () => Object.entries(DATA.skills).map(([cat, list]) => `${cat.toUpperCase()}:\n  ${list.map(s => s.name).join(" • ")}`).join("\n\n"),

    stats: () => DATA.stats.map(s => `• ${s.label.padEnd(24)}: ${s.value} (${s.detail})`).join("\n"),

    contact: () => [
      `Email:    ${DATA.profile.email}`,
      `Phone:    ${DATA.profile.phone}`,
      `GitHub:   ${DATA.profile.github}`,
      `LinkedIn: ${DATA.profile.linkedin}`
    ].join("\n"),

    architecture: () => {
      openArchModal("jobnexa");
      return "Launching JobNexa high-throughput system architecture view...";
    },

    resume: () => {
      window.open("resume.html", "_blank");
      return "Opening printable 1-page resume in a new tab...";
    },

    clear: () => {
      if (terminalHistory) terminalHistory.innerHTML = "";
      return "";
    },

    "sudo hire": () => {
      showToast("Offer accepted! Let's build great software together.", "🚀");
      return [
        "===========================================================",
        " ACCESS GRANTED: Candidate ready for SDE & AI Systems roles",
        " Location: Bangalore, Karnataka, India / Remote",
        " Email:    nithinvandana26@gmail.com | +91 9347388372",
        "==========================================================="
      ].join("\n");
    }
  };

  function executeTerminalCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Append to terminal history
    if (terminalHistory) {
      const entry = document.createElement("div");
      entry.className = "terminal-entry";

      let output = "";
      if (CLI_COMMANDS[cmd]) {
        output = CLI_COMMANDS[cmd]();
      } else {
        output = `command not found: "${cmd}". Type 'help' for a list of available commands.`;
      }

      if (cmd !== "clear") {
        entry.innerHTML = `
          <div class="terminal-prompt-line">
            <span class="prompt-user">nithin</span><span class="prompt-host">@bengaluru:~$</span>
            <span>${rawCmd}</span>
          </div>
          <div class="terminal-output">${output}</div>
        `;
        terminalHistory.appendChild(entry);
      }
    }

    if (terminalInput) {
      terminalInput.value = "";
      const body = terminalInput.closest(".terminal-body");
      if (body) body.scrollTop = body.scrollHeight;
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        executeTerminalCommand(terminalInput.value);
      }
    });
  }

  // Quick command buttons on terminal header
  document.querySelectorAll("[data-quick-cmd]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-quick-cmd");
      executeTerminalCommand(cmd);
      if (terminalInput) terminalInput.focus();
    });
  });

  // ==========================================================================
  // 7. Skills Matrix Interactive Filter
  // ==========================================================================
  function initSkillsMatrix() {
    const filterContainer = document.getElementById("skills-filter-container");
    const gridContainer = document.getElementById("skills-grid-container");
    if (!filterContainer || !gridContainer) return;

    const categories = ["All", ...Object.keys(DATA.skills)];

    // Render filter buttons
    filterContainer.innerHTML = categories.map((cat, idx) => `
      <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat}">${cat}</button>
    `).join("");

    renderSkillsGrid("All");

    filterContainer.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderSkillsGrid(btn.getAttribute("data-cat"));
      });
    });
  }

  function renderSkillsGrid(selectedCategory) {
    const gridContainer = document.getElementById("skills-grid-container");
    if (!gridContainer) return;

    const entries = selectedCategory === "All"
      ? Object.entries(DATA.skills)
      : Object.entries(DATA.skills).filter(([cat]) => cat === selectedCategory);

    gridContainer.innerHTML = entries.map(([category, items]) => `
      <div class="skill-category-card">
        <div class="skill-cat-title">
          <span>${category}</span>
          <span class="skill-cat-count">${items.length} tools</span>
        </div>
        <div class="skills-item-list">
          ${items.map(item => `
            <div class="skill-item">
              <div class="skill-head">
                <span class="skill-name">${item.name}</span>
                <span class="skill-lvl-badge">${item.level}</span>
              </div>
              <div class="skill-desc">${item.desc}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  // ==========================================================================
  // 8. Contact Form Quick Message Dialog
  // ==========================================================================
  function initContactActions() {
    const composeBtn = document.getElementById("open-message-composer");
    if (!composeBtn) return;

    composeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const subject = encodeURIComponent("SDE / AI Engineering Opportunity at [Company]");
      const body = encodeURIComponent(
        `Hi Nithin,\n\nWe came across your portfolio and your work on JobNexa and Intellica. We'd love to chat about an engineering opportunity at our team.\n\nBest regards,\n[Your Name]`
      );
      window.location.href = `mailto:${DATA.profile.email}?subject=${subject}&body=${body}`;
    });
  }

  // ==========================================================================
  // 9. Profile Image Fallback Verification
  // ==========================================================================
  function initProfilePhoto() {
    const imgEl = document.getElementById("nithin-avatar");
    if (!imgEl) return;

    // If local file fails, or if window.PROFILE_PHOTO is present, verify
    imgEl.onerror = () => {
      if (window.PROFILE_PHOTO) {
        imgEl.src = window.PROFILE_PHOTO;
      }
    };
  }

  // Expose global helper for copy toast
  window.showToast = showToast;
  window.openArchModal = openArchModal;

  // DOM Content Loaded Execution
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initSkillsMatrix();
    initContactActions();
    initProfilePhoto();

    // Set initial welcome entry in terminal
    if (terminalHistory && terminalHistory.children.length === 0) {
      const welcome = document.createElement("div");
      welcome.className = "terminal-entry";
      welcome.innerHTML = `
        <div class="terminal-output" style="color: var(--accent-cyan);">
// NITHIN VANDANA - SYSTEM ENVIRONMENT v2.4 (Bangalore Node)
// Type 'help' or click quick buttons above to explore architecture, telemetry, and skills.
        </div>
      `;
      terminalHistory.appendChild(welcome);
    }
  });

})();
