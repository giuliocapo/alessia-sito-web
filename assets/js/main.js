"use strict";

/*
 * =========================================================
 * DOTT.SSA ALESSIA SPADARO
 * JavaScript principale del sito
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeMobileMenu();
    updateCurrentYear();
});


/*
 * =========================================================
 * MENU DI NAVIGAZIONE MOBILE
 * =========================================================
 */

function initializeMobileMenu() {
    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".main-navigation");

    if (!header || !menuButton || !navigation) {
        return;
    }

    const navigationLinks = navigation.querySelectorAll("a");

    menuButton.addEventListener("click", () => {
        const isMenuOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (isMenuOpen) {
            closeMobileMenu(header, menuButton);
        } else {
            openMobileMenu(header, menuButton);
        }
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu(header, menuButton);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        const isMenuOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (isMenuOpen) {
            closeMobileMenu(header, menuButton);
            menuButton.focus();
        }
    });

    document.addEventListener("click", (event) => {
        const isMenuOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (!isMenuOpen) {
            return;
        }

        const clickedInsideHeader = header.contains(event.target);

        if (!clickedInsideHeader) {
            closeMobileMenu(header, menuButton);
        }
    });

    window.addEventListener("resize", () => {
        const desktopBreakpoint = 900;

        if (window.innerWidth > desktopBreakpoint) {
            closeMobileMenu(header, menuButton);
        }
    });
}


/*
 * Apre il menu mobile.
 */

function openMobileMenu(header, menuButton) {
    header.classList.add("is-menu-open");
    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Chiudi il menu");
}


/*
 * Chiude il menu mobile.
 */

function closeMobileMenu(header, menuButton) {
    header.classList.remove("is-menu-open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Apri il menu");
}


/*
 * =========================================================
 * ANNO AUTOMATICO NEL FOOTER
 * =========================================================
 */

function updateCurrentYear() {
    const yearElement = document.querySelector("#current-year");

    if (!yearElement) {
        return;
    }

    yearElement.textContent = new Date().getFullYear().toString();
}