(function () {
  "use strict";

  function initMobileMenu() {
    var menuBtn = document.getElementById("menu-btn");
    var mobileMenu = document.querySelector(".mobile-menu");

    if (!menuBtn) {
      console.error("Mobile menu button (#menu-btn) not found in DOM.");
      return;
    }

    if (!mobileMenu) {
      console.error("Mobile menu (.mobile-menu) not found in DOM.");
      return;
    }

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      mobileMenu.classList.add("is-open");
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.textContent = "\u2715";
    }

    function closeMenu() {
      isOpen = false;
      mobileMenu.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "\u2630";
    }

    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener("click", function (e) {
      if (isOpen && !mobileMenu.contains(e.target) && e.target !== menuBtn) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  function initImageErrorHandling() {
    var img = document.getElementById("image");
    var errorPlaceholder = document.getElementById("image-error");

    if (!img) {
      console.error("Hero image (#image) not found in DOM.");
      return;
    }

    function showError() {
      img.style.display = "none";
      if (errorPlaceholder) {
        errorPlaceholder.hidden = false;
      }
      console.warn("Hero image failed to load: " + img.src);
    }

    img.addEventListener("error", showError);

    if (img.complete && img.naturalWidth === 0) {
      showError();
    }
  }

  function initGlobalErrorHandling() {
    window.addEventListener("error", function (e) {
      if (e.target && e.target.tagName === "LINK" && e.target.rel === "stylesheet") {
        console.error("Stylesheet failed to load: " + e.target.href);
      }
    }, true);
  }

  function init() {
    initMobileMenu();
    initImageErrorHandling();
    initGlobalErrorHandling();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
