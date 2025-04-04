function load() {
    // Get elements in navMenu
    var navMenu = document.querySelector(".navMenu");
    var navLinks = navMenu.querySelectorAll("a");
    for (var i = 1; i < navLinks.length + 1; i++) {
        // Get right and left x values of navLinks
        var rect = navLinks[i - 1].getBoundingClientRect();
        var left = rect.left - navMenu.getBoundingClientRect().left; // Corrected calculation
        var right = navLinks[i - 1].clientWidth;

        document.documentElement.style.setProperty(
            `--pos${i}`,
            `${left + right / 2}px`
        );
        var style = document.createElement("style");
        style.innerHTML = `
            .navMenu a:nth-child(${i}):hover ~ .dot {
                -webkit-transform: translateX(var(--pos${i}));
                transform: translateX(var(--pos${i}));
            }
        `;
        document.head.appendChild(style);
    }
}
