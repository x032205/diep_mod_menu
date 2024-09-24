// ==UserScript==
// @name         Diep.io Mod Menu
// @namespace    http://tampermonkey.net/
// @version      2.0
// @homepage     https://github.com/x032205/diep_mod_menu
// @description  Loop upgrade custom builds, render aim line, render factory guide circle.
// @author       https://github.com/x032205
// @match        https://diep.io/
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  const backdrop = document.createElement("div");
  backdrop.id = "backdrop";

  const toggle_text = document.createElement("code");
  toggle_text.classList.add("watermark");
  toggle_text.textContent = "Diep Mod Menu | Press [R] to toggle";

  backdrop.appendChild(toggle_text);

  const panel = document.createElement("div");
  panel.id = "panel";

  const side_panel = document.createElement("nav");
  panel.appendChild(side_panel);

  const separator = document.createElement("div");
  separator.classList.add("separator");
  panel.appendChild(separator);

  const display_panel = document.createElement("div");
  display_panel.classList.add("inner_panel");
  panel.appendChild(display_panel);

  const view_line = document.createElement("div");
  view_line.classList.add("view-option");

  const view_line_text = document.createElement("span");
  view_line_text.textContent = "Aim line";

  const view_line_label = document.createElement("label");
  view_line_label.classList.add("switch");

  const view_line_toggle = document.createElement("input");
  view_line_toggle.setAttribute("type", "checkbox");
  view_line_label.appendChild(view_line_toggle);

  const view_line_div = document.createElement("div");
  view_line_label.appendChild(view_line_div);
  view_line.appendChild(view_line_label);
  view_line.appendChild(view_line_text);

  const view_circle = document.createElement("div");
  view_circle.classList.add("view-option");

  const view_circle_text = document.createElement("span");
  view_circle_text.textContent = "Factory circle";

  const view_circle_label = document.createElement("label");
  view_circle_label.classList.add("switch");

  const view_circle_toggle = document.createElement("input");
  view_circle_toggle.setAttribute("type", "checkbox");
  view_circle_label.appendChild(view_circle_toggle);

  const view_circle_div = document.createElement("div");
  view_circle_label.appendChild(view_circle_div);
  view_circle.appendChild(view_circle_label);
  view_circle.appendChild(view_circle_text);

  // Visual Tab
  const visual_tab = document.createElement("button");
  visual_tab.classList.add("tab_button", "active");
  side_panel.appendChild(visual_tab);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "32");
  svg.setAttribute("height", "32");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "#BBBBBB");
  svg.setAttribute("stroke-width", "2.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  svg.innerHTML =
    '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>';

  visual_tab.appendChild(svg);

  visual_tab.onclick = function () {
    display_panel.innerHTML = ``;
    display_panel.appendChild(view_line);
    display_panel.appendChild(view_circle);
    setActiveTab(visual_tab);
  };

  const au_label = document.createElement("span");
  au_label.classList.add("subheading");
  au_label.textContent = "Custom Build";

  const au_input = document.createElement("input");
  au_input.ariaReadOnly = "true";
  au_input.setAttribute("type", "text");
  au_input.classList.add("custom-input");
  au_input.placeholder = "000000000000000000000000000000000";
  au_input.maxLength = 33;

  const au_autoset = document.createElement("div");
  au_autoset.classList.add("view-option");

  const au_autoset_text = document.createElement("span");
  au_autoset_text.textContent = "Auto-build enabled";

  const au_autoset_label = document.createElement("label");
  au_autoset_label.classList.add("switch");

  const au_autoset_toggle = document.createElement("input");
  au_autoset_toggle.setAttribute("type", "checkbox");
  au_autoset_label.appendChild(au_autoset_toggle);

  const au_autoset_div = document.createElement("div");
  au_autoset_label.appendChild(au_autoset_div);
  au_autoset.appendChild(au_autoset_label);
  au_autoset.appendChild(au_autoset_text);

  // Auto Upgrade Tab
  const auto_upgrades_tab = document.createElement("button");
  auto_upgrades_tab.classList.add("tab_button");
  side_panel.appendChild(auto_upgrades_tab);

  const au_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  au_svg.setAttribute("width", "32");
  au_svg.setAttribute("height", "32");
  au_svg.setAttribute("viewBox", "0 0 24 24");
  au_svg.setAttribute("fill", "none");
  au_svg.setAttribute("stroke", "#BBBBBB");
  au_svg.setAttribute("stroke-width", "2.5");
  au_svg.setAttribute("stroke-linecap", "round");
  au_svg.setAttribute("stroke-linejoin", "round");

  au_svg.innerHTML =
    '<path d="M12 2a10 10 0 0 1 7.38 16.75"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/><path d="M2.5 8.875a10 10 0 0 0-.5 3"/><path d="M2.83 16a10 10 0 0 0 2.43 3.4"/><path d="M4.636 5.235a10 10 0 0 1 .891-.857"/><path d="M8.644 21.42a10 10 0 0 0 7.631-.38"/>';

  auto_upgrades_tab.appendChild(au_svg);

  auto_upgrades_tab.onclick = function () {
    display_panel.innerHTML = ``;
    display_panel.appendChild(au_label);
    display_panel.appendChild(au_input);
    display_panel.appendChild(au_autoset);
    setActiveTab(auto_upgrades_tab);
  };

  const credits_tab = document.createElement("button");
  credits_tab.classList.add("tab_button");
  side_panel.appendChild(credits_tab);

  const credit_svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  credit_svg.setAttribute("width", "32");
  credit_svg.setAttribute("height", "32");
  credit_svg.setAttribute("viewBox", "0 0 24 24");
  credit_svg.setAttribute("fill", "none");
  credit_svg.setAttribute("stroke", "#BBBBBB");
  credit_svg.setAttribute("stroke-width", "2.5");
  credit_svg.setAttribute("stroke-linecap", "round");
  credit_svg.setAttribute("stroke-linejoin", "round");

  credit_svg.innerHTML =
    '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>';

  credits_tab.appendChild(credit_svg);

  credits_tab.onclick = function () {
    display_panel.innerHTML = `<span><span class="text-muted">Discord:</span> <code>@someplace</code></span>
<span><span class="text-muted">Github:</span> <code>@x032205</code></span>`;
    setActiveTab(credits_tab);
  };

  const style = document.createElement("style");
  style.textContent = `
    * {
      font-family: 'Inter', sans-serif;
      color: #EEEEEE;
      font-size: 16px;
    }

    code { font-family: monospace; }

    #panel {
      display: flex;
      flex-direction: row;
      max-width: 600px;
      max-height: 400px;
      width: 100%;
      height: 100%;
      padding: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      gap: 6px;
      background: hsla(0, 0%, 10%, 0.7);
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px);
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      border-radius: 8px;
      z-index: 10;
    }

    .separator {
      width: 1px;
      height: 100%;
      background-color: hsla(0, 0%, 100%, 0.1);
    }

    .switch {
      display: inline-block;
      font-size: 20px;
      height: 1em;
      width: 2em;
      background: rgb(50, 50, 50);
      border-radius: 1em;
      margin-right: 10px;
      cursor: pointer;
    }

    .switch input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .switch div {
      font-size: 20px;
      height: 1em;
      width: 1em;
      border-radius: 1em;
      background: rgb(100, 100, 100);
      transition: all 100ms;
      cursor: pointer;
    }

    .switch input:checked + div {
      transform: translate3d(100%, 0, 0);
      background: #EEEEEE;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .inner_panel {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 4px;
      width: 100%;
      margin-left: 4px;
    }

    .tab_button {
      display: flex;
      width: 48px;
      height: 48px;
      justify-content: center;
      align-items: center;
      background: hsla(0, 0%, 20%, 0.5);
      border-radius: 4px;
      border: none;
      transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .tab_button:hover,
    .tab_button.active {
      background: hsla(0, 0%, 40%, 0.5);
    }

    #backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }

    .watermark {
      position: fixed;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
    }

    .subheading { font-weight: 600; }

    .view-option {
      text-align: left;
      align-items: center;
      height: 28px;
      display: flex;
    }

    .custom-input {
      background: hsla(0, 0%, 10%, 0.7);
      border: 1px solid hsla(0, 0%, 100%, 0.1);
      border-radius: 4px;
      padding: 6px;
      outline: none;
    }

    .text-muted { color: #BBBBBB; }
  `;

  backdrop.appendChild(panel);
  document.body.appendChild(backdrop);
  document.head.appendChild(style);

  function toggleDisplay(elementId) {
    const element = document.getElementById(elementId);
    const backdrop = document.getElementById("backdrop");
    const isHidden = element.style.display === "none";
    element.style.display = isHidden ? "block" : "none";
    backdrop.style.display = isHidden ? "block" : "none";
  }

  function setActiveTab(activeTab) {
    [visual_tab, auto_upgrades_tab, credits_tab].forEach((tab) =>
      tab.classList.remove("active"),
    );
    activeTab.classList.add("active");
  }

  let X, Y, x, y;
  let Z = false;
  let radius = [];

  document.body.onkeyup = function (ctx) {
    if (ctx.keyCode === 82) {
      toggleDisplay("backdrop");
    } else if (document.activeElement === au_input) {
      const key = parseInt(ctx.key);
      if (key >= 1 && key <= 8) {
        au_input.value += ctx.key;
      } else if (ctx.keyCode === 8) {
        au_input.value = au_input.value.slice(0, -1);
      }
    }
  };

  document.onmousemove = (event) => {
    x = event.clientX;
    y = event.clientY;
  };
  document.onmousedown = (e) => {
    if (e.button === 2) Z = true;
  };
  document.onmouseup = (e) => {
    if (e.button === 2) Z = false;
  };

  const canvas = document.createElement("canvas");
  canvas.style.zIndex = "11";
  canvas.style.position = "absolute";
  canvas.style.top = "0px";
  canvas.style.left = "0px";
  canvas.style.pointerEvents = "none";

  function getRadius() {
    X = window.innerWidth / 2;
    Y = window.innerHeight / 2;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    radius = [
      window.innerWidth * 0.17681239669,
      window.innerWidth * 0.06545454545,
      window.innerWidth * 0.16751239669,
      window.innerWidth * 0.36,
    ];
  }

  getRadius();
  window.addEventListener("resize", getRadius);

  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (view_line_toggle.checked) {
      ctx.beginPath();
      ctx.moveTo(X, Y);
      ctx.lineTo(x, y);
      ctx.lineWidth = 50;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(X, Y);
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
      ctx.stroke();
    }

    if (view_circle_toggle.checked) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";

      ctx.beginPath();
      ctx.arc(X, Y, radius[3], 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius[1], 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, Z ? radius[0] : radius[2], 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (au_autoset_toggle.checked) {
      input.execute("game_stats_build " + au_input.value);
    }
    requestAnimationFrame(draw);
  }
  draw();

  visual_tab.click();
})();
