addEventListener("DOMContentLoaded", async function () {
    // Check which html is active in the iframe
    let previewcontent = document.getElementById("preview").src;
    if (previewcontent.includes("default.html")) {
        await logImagesInFolder("/");
        console.log("Found HTML files:", foundFiles);
        foundFiles.sort();
        createButtons();
        load();
    } else {
        console.log("phososhop");
        await logImagesInFolder("/photoshop", ".png");
        console.log("Found png files:", foundFiles);
        foundFiles.sort();
        createButtons();
        load();
    }
});
let checkedFolders = [];
let foundFiles = [];
const logImagesInFolder = async (folderPath, type = "index.html") => {
    try {
        const response = await fetch(folderPath);
        if (!response.ok)
            throw new Error(`Failed to fetch folder: ${folderPath}`);
        console.log(response);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const links = Array.from(doc.querySelectorAll("a"));

        const promises = links.map(async (link) => {
            const href = link.getAttribute("href");

            if (
                !href.includes("samlingssida") &&
                !href.includes(".")
            ) {
                if (checkedFolders.includes(href)) return; // Skip if already checked
                checkedFolders.push(href);
                await logImagesInFolder(href); // Recursively check subfolders
            } else if (href.endsWith(type) || href.endsWith("index.htm")) {
                foundFiles.push(href);
            }
        });

        await Promise.all(promises);

        // Log found files here if you want them to appear before "Found HTML files:"
    } catch (error) {
        console.error(`Error fetching folder: ${folderPath}`, error);
        console.error(`Error finding sites in folder: ${error.message}`);
    }
};
const createButtons = () => {
    for (let file of foundFiles) {
        // Add a link for each file found to nav_left div
        let button = document.createElement("button");
        // Set function to button
        button.onclick = function () {
            const iframe = document.getElementById("preview");
            iframe.src = file; // Set the iframe source to the clicked file
        };
        if(file.includes("photoshop")) {
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
    let offset = - 150 + 50; //- button start pos + top margin

    navMenu.addEventListener("mouseenter", () => {
        document.querySelector(":root").style.setProperty("--currentPosition", getMenuLocation() + "px");
        navMenu.style.animation = "showMenu 0.5s ease-out forwards";
        navMenu.style.overflowY = "auto";
        arrow.style.opacity = 0;
    });
    topbar.addEventListener("mouseenter", () => {
        document.querySelector(":root").style.setProperty("--currentPosition", getMenuLocation() + "px");
        navMenu.style.animation = "hideMenu 0.5s ease-out forwards";
        navMenu.style.overflowY = "hidden";
        arrow.style.opacity = 1;
    });
    
    

    navLinks.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          let rect = button.getBoundingClientRect();
            let top =
                rect.top - navMenu.getBoundingClientRect().top + topbar.clientHeight + offset; // Calculate top position 
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
                        topbar.clientHeight + offset; // Calculate top position
                    dot.style.transform = `translateY(${
                        top + rect.height / 2
                    }px)`;
                    dot.style.opacity = 1; // Show the dot on hover
                }
            });
        });
    });
}
