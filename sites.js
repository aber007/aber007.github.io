function init() {
  // Check which html is active in the iframe
  let previewcontent = document.getElementById("preview").src;
  console.log("Found files:", foundFiles);
  if (previewcontent.includes("default.html")) {
    createButtons("index.htm");
    // Get the control buttons and iframe
    const viewHtmlButton = document.getElementById("view_html");
    const viewCssButton = document.getElementById("view_css");
    const openTabButton = document.getElementById("open_tab");
    const iframe = document.getElementById("preview");

    // Track current state
    let viewingHtml = false;
    let viewingCss = false;
    let originalSrc = "";

    // View HTML button functionality
    viewHtmlButton.addEventListener("click", function () {
      if (viewingHtml) {
        // Switch back to normal view
        iframe.src = originalSrc;
        viewingHtml = false;
        viewHtmlButton.textContent = "View HTML";
      } else {
        // Store original src if not already stored
        if (!viewingCss) {
          originalSrc = iframe.src;
        }

        // Navigate to the HTML viewer page with the source URL as a parameter
        iframe.src = `/Arbete/samlingssida/html/viewHtml.html?source=${encodeURIComponent(
          originalSrc
        )}`;

        viewingHtml = true;
        viewingCss = false;
        viewHtmlButton.textContent = "Back to Site";
        viewCssButton.textContent = "View CSS";
      }
    });

    // View CSS button functionality
    viewCssButton.addEventListener("click", function () {
      if (viewingCss) {
        // Switch back to normal view
        iframe.src = originalSrc;
        viewingCss = false;
        viewCssButton.textContent = "View CSS";
      } else {
        // Store original src if not already stored
        if (!viewingHtml) {
          originalSrc = iframe.src;
        }

        // Determine CSS path from HTML path
        let cssPath = "";
        if (originalSrc.includes("/html/")) {
          // For files in the html folder, look for CSS in the css folder
          cssPath = originalSrc
            .replace("/html/", "/css/")
            .replace(".html", ".css");
        } else {
          // For other paths, try to navigate to CSS folder relative to the HTML file
          const basePath = originalSrc.substring(
            0,
            originalSrc.lastIndexOf("/")
          );
          cssPath = `${basePath}/css/style.css`;
        }

        // Navigate to the CSS viewer page with the CSS path as a parameter
        iframe.src = cssPath;

        viewingCss = true;
        viewingHtml = false;
        viewCssButton.textContent = "Back to Site";
        viewHtmlButton.textContent = "View HTML";
      }
    });

    // Open in new tab button functionality
    openTabButton.addEventListener("click", function () {
      // If we're viewing code, open the original page
      const currentSrc = viewingHtml || viewingCss ? originalSrc : iframe.src;
      window.open(currentSrc, "_blank");
    });
  } else {
    console.log("photoshop");
    createButtons(".png");
    // Get only the open tab button
    const openTabButton = document.getElementById("open_tab");
    // Open in new tab button functionality
    openTabButton.addEventListener("click", function () {
      // If we're viewing code, open the original page
      const currentSrc = previewcontent;
      window.open(currentSrc, "_blank");
    });
  }
  load();
};

// Static array of files instead of dynamic folder traversal
const foundFiles = [
  // HTML files
  "/Arbete/01a/index.htm",
  "/Arbete/01a/htm/bjorn.htm",
  "/Arbete/01a/htm/camping.htm",
  "/Arbete/01a/htm/klitt.htm",
  "/Arbete/01a/htm/vasa.htm",
  "/Arbete/01a/htm/zorn.htm",
  "/Arbete/01b/index.htm",
  "/Arbete/01b/htm/about.htm",
  "/Arbete/01b/htm/blog.htm",
  "/Arbete/01b/htm/investment.htm",
  "/Arbete/01b/htm/projects.htm",
  "/Arbete/02a/index.htm",
  "/Arbete/02b/index.htm",
  "/Arbete/03a/index.htm",
  "/Arbete/04a/index.htm",
  "/Arbete/05a/index.htm",
  "/Arbete/05a/htm/house.htm",
  "/Arbete/05a/htm/road.htm",
  "/Arbete/06a/index.htm",
  "/Arbete/06a/htm/layout2.htm",
  "/Arbete/06a/htm/layout3.htm",
  "/Arbete/06a/htm/layout4.htm",
  "/Arbete/06a/htm/layout5.htm",
  "/Arbete/07a/index.htm",
  "/Arbete/07b-layout/index.htm",
  "/Arbete/08a/index.html",
  "/Arbete/09a/index.html",
  "/Arbete/10c/index.htm",
  "/Arbete/10c/htm/about.htm",
  "/Arbete/10c/htm/blog.htm",
  "/Arbete/10c/htm/investment.htm",
  "/Arbete/10c/htm/projects.htm",
  "/Arbete/10e/index.htm",
  "/Arbete/10e/htm/about.htm",
  "/Arbete/10e/htm/blog.htm",
  "/Arbete/10e/htm/investment.htm",
  "/Arbete/10e/htm/projects.htm",
  "/Arbete/grundsidan/index.htm",
  "/Arbete/layoututmaning-1/index.html",
  "/Arbete/layoututmaning-2/index.html",
  "/Arbete/mol_12/index.htm",
  "/Arbete/mol_12/html/delmol.htm",
  "/Arbete/mol_12/html/kontakt.htm",
  "/Arbete/mol_12/html/sverige.htm",
  "/Arbete/prov_test/index.html",
  "/Arbete/uppgift_1/index.htm",
  "/Arbete/uppgift_1/htm/delmol.htm",
  "/Arbete/uppgift_1/htm/kontakt.htm",
  "/Arbete/uppgift_1/htm/sverige.htm",

  // Photoshop PSD and PNG files
  "/Arbete/mol_12/Main.psd",
  "/Arbete/photoshop/Artboard-1.png",
  "/Arbete/photoshop/Hors.png",
  "/Arbete/photoshop/Iceclimbersmain.png",
  "/Arbete/photoshop/Iceclimbersmain2.png",
  "/Arbete/photoshop/Iceclimbersmain3.png",
  "/Arbete/photoshop/svt_exempel.png",
  "/Arbete/photoshop/TE23D_classroom.png",
  "/Arbete/photoshop/TM-Design-Website.png",
];

const createButtons = (type) => {
  for (let file of foundFiles) {
    console.log(file);
    if (!file.includes(type)) continue;
    // Add a link for each file found to nav_left div
    let button = document.createElement("button");
    // Set function to button
    button.onclick = function () {
      const iframe = document.getElementById("preview");
      iframe.src = file; // Set the iframe source to the clicked file
    };
    if (file.includes("photoshop")) {
      button.innerText = file.split("/")[3].split(".")[0]; // Extract the name from the path
    } else {
      button.innerText = file.split("/")[2]; // Extract the name from the path
    }
    button.className = "nav_button";

    // Add the link to the nav_left div
    let navLeft = document.getElementById("nav_left");
    if (navLeft) {
      navLeft.appendChild(button);
    } else {
      console.error("nav_left element not found.");
    }
  }
};

function getMenuLocation() {
  // Get the margin-left value of the nav_left element
  const navLeft = document.getElementById("nav_left");
  const style = window.getComputedStyle(navLeft);
  const marginLeft = parseInt(style.marginLeft);
  return marginLeft;
}

function load() {
  let navMenu = document.getElementById("nav_left");
  let navLinks = navMenu.querySelectorAll("button");
  let topbar = document.getElementById("top");
  let dot = navMenu.querySelector(".dot");
  let arrow = navMenu.querySelector(".arrow");
  let offset = -150 + 50; //- button start pos + top margin
  let search = document.getElementById("search");
  let searchbox = document.getElementById("searches");

  navMenu.addEventListener("mouseenter", () => {
    document
      .querySelector(":root")
      .style.setProperty("--currentPosition", getMenuLocation() + "px");
    navMenu.style.animation = "showMenu 0.5s ease-out forwards";
    navMenu.style.overflowY = "auto";
    arrow.style.opacity = 0;
  });
  topbar.addEventListener("mouseenter", () => {
    document
      .querySelector(":root")
      .style.setProperty("--currentPosition", getMenuLocation() + "px");
    navMenu.style.animation = "hideMenu 0.5s ease-out forwards";
    navMenu.style.overflowY = "hidden";
    arrow.style.opacity = 1;
  });
  // Create the searches field
  addEventListener("resize", () => {
    const x = search.offsetLeft - 1;
    const y = search.offsetTop + search.offsetHeight / 2;
    console.log("x: " + x + " y: " + y);
    searchbox.style.left = x + "px";
    searchbox.style.top = y + "px";
  });
  const x = search.offsetLeft - 1;
  const y = search.offsetTop + search.offsetHeight / 2;
  searchbox.style.left = x + "px";
  searchbox.style.top = y + "px";

  navLinks.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      let rect = button.getBoundingClientRect();
      let top =
        rect.top -
        navMenu.getBoundingClientRect().top +
        topbar.clientHeight +
        offset; // Calculate top position
      // Set the dot position and opacity
      dot.style.transform = `translateY(${top + rect.height / 2}px)`;
      dot.style.opacity = 1; // Show the dot on hover
    });
    button.addEventListener("mouseleave", () => {
      // Find which button has the same src as the iframe
      let previewcontent = document.getElementById("preview").src;
      dot.style.opacity = 0; // Hide the dot when none active
      navLinks.forEach((btn) => {
        if (previewcontent.includes(btn.innerText)) {
          // Set the dot position and opacity
          let rect = btn.getBoundingClientRect();
          let top =
            rect.top -
            navMenu.getBoundingClientRect().top +
            topbar.clientHeight +
            offset; // Calculate top position
          dot.style.transform = `translateY(${top + rect.height / 2}px)`;
          dot.style.opacity = 1; // Show the dot on hover
        }
      });
    });
  });
}

// JavaScript function to populate the first 10 search results in the `div.searches` as "a" elements
function populateSearchResults(results) {
  const searchesDiv = document.querySelector("div.searches");
  searchesDiv.innerHTML = ""; // Clear previous results

  results.slice(0, 5).forEach((result) => {
    const link = document.createElement("a");
    link.href = result.url; // Assuming each result has a `url` property
    link.target = "_blank"; // Open the URL in another tab
    link.textContent = result.title; // Assuming each result has a `title` property
    searchesDiv.appendChild(link);
  });
}

// Modify the search input to filter results from the foundFiles variable
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  if (query.length < 1) {
    populateSearchResults([]); // Clear results if query is too short
    return;
  }
  const results = foundFiles.filter((file) =>
    file.toLowerCase().includes(query)
  );

  // Populate the search results
  populateSearchResults(
    results.map((file) => ({
      url: file,
      title: file.split("/").slice(-2).join("/"), // Extract the file name as the title
    }))
  );
});

// Add event listener to the search input to show/hide the search results
searchInput.addEventListener("focus", () => {
  const searchesDiv = document.querySelector("div.searches");
  searchesDiv.style.display = "block"; // Show the search results
});
searchInput.addEventListener("blur", () => {
  const searchesDiv = document.querySelector("div.searches");
  setTimeout(() => {
    searchesDiv.style.display = "none"; // Hide the search results after a delay
  }, 200); // Delay to allow link clicks to register
});
