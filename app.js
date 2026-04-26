(function () {
  const STORAGE_KEY = "ecoFoscoloFontScale";

  const MIN_SCALE = 0.82;
  const MAX_SCALE = 1.32;
  const STEP = 0.06;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getSavedScale() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = parseFloat(saved);

    if (Number.isFinite(parsed)) {
      return clamp(parsed, MIN_SCALE, MAX_SCALE);
    }

    return 1;
  }

  function applyScale(scale) {
    const safeScale = clamp(scale, MIN_SCALE, MAX_SCALE);
    document.documentElement.style.setProperty("--font-scale", safeScale);
    localStorage.setItem(STORAGE_KEY, String(safeScale));
  }

  function setupFontControls() {
    const minusButtons = document.querySelectorAll("[data-font-minus]");
    const plusButtons = document.querySelectorAll("[data-font-plus]");

    minusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const current = getSavedScale();
        applyScale(current - STEP);
      });
    });

    plusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const current = getSavedScale();
        applyScale(current + STEP);
      });
    });
  }

  function setupIndexMenus() {
    const menus = document.querySelectorAll("[data-index]");

    menus.forEach((menu) => {
      menu.addEventListener("change", () => {
        const target = menu.value;

        if (target) {
          window.location.href = target;
        }
      });
    });
  }

  function setupActiveIndexOption() {
    const menus = document.querySelectorAll("[data-index]");
    const currentPath = window.location.pathname.replace(/^\/+/, "");

    menus.forEach((menu) => {
      Array.from(menu.options).forEach((option) => {
        if (!option.value) return;

        const normalizedValue = option.value.replace(/^\/+/, "");

        if (
          currentPath.endsWith(normalizedValue) ||
          currentPath.endsWith(normalizedValue.replace("../", ""))
        ) {
          option.selected = true;
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyScale(getSavedScale());
    setupFontControls();
    setupIndexMenus();
    setupActiveIndexOption();
  });
})();
