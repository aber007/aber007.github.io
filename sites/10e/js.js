function load() {
  var navMenu = document.querySelector(".navMenu");
  var navLinks = navMenu.querySelectorAll("a");
  for (var i = 1; i < navLinks.length + 1; i++) {
    var rect = navLinks[i - 1].getBoundingClientRect();
    var top = rect.top - navMenu.getBoundingClientRect().top; // Calculate top position

    document.documentElement.style.setProperty(
      `--pos${i}`,
      `${top + rect.height / 2}px`
    );
    var style = document.createElement("style");
    style.innerHTML = `
            .navMenu a:nth-child(${i}):hover ~ .dot {
                -webkit-transform: translateY(var(--pos${i}));
                transform: translateY(var(--pos${i}));
            }
        `;
    document.head.appendChild(style);
  }
}
