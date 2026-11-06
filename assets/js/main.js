// Get the elements
const topButton = document.getElementById("backToTopBtn");
const navBar = document.querySelector(".toc-nav");

// Listen for scrolling
window.onscroll = function () {
    const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;

    // 1. Navigation pop-out logic (shows after scrolling down 150px)
    if (scrollPosition > 150) {
        navBar.classList.add("show-nav");
    } else {
        navBar.classList.remove("show-nav");
    }

    // 2. Back to top button logic (shows after scrolling down 300px)
    if (scrollPosition > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

// When the user clicks the back to top button, scroll to the top
topButton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
// Function to scroll the highlights carousel left and right
function scrollCarousel(direction) {
    const carousel = document.getElementById("highlightsCarousel");
    const left = carousel.scrollLeft;
    const maxLeft = carousel.scrollWidth - carousel.clientWidth;

    // Scroll position of each item, so items of different widths line up exactly
    const offsets = Array.from(carousel.children).map((item) =>
        Math.min(item.getBoundingClientRect().left - carousel.getBoundingClientRect().left + left, maxLeft)
    );

    let target;
    if (direction > 0) {
        target = offsets.find((o) => o > left + 5);
        // Wrap back to the first item after the last one
        if (target === undefined || left >= maxLeft - 5) target = 0;
    } else {
        target = offsets.filter((o) => o < left - 5).pop();
        // Wrap to the end before the first one
        if (target === undefined) target = maxLeft;
    }

    carousel.scrollTo({
        left: target,
        behavior: 'smooth' // Ensures it glides smoothly rather than jumping
    });
}

// Auto-advance the highlights carousel every 4 seconds, pausing while hovered or touched
const highlightsWrapper = document.querySelector(".carousel-wrapper");
let highlightsPaused = false;

highlightsWrapper.addEventListener("mouseenter", () => (highlightsPaused = true));
highlightsWrapper.addEventListener("mouseleave", () => (highlightsPaused = false));
highlightsWrapper.addEventListener("touchstart", () => (highlightsPaused = true), { passive: true });
highlightsWrapper.addEventListener("touchend", () => setTimeout(() => (highlightsPaused = false), 4000), { passive: true });

setInterval(() => {
    if (!highlightsPaused && !document.hidden) scrollCarousel(1);
}, 4000);
// Collapse long abstracts and add a "Read more" toggle
document.querySelectorAll(".abstract").forEach(function (abstract) {
    abstract.classList.add("collapsed");

    // Skip abstracts that already fit within the collapsed height
    if (abstract.scrollHeight <= abstract.clientHeight) {
        abstract.classList.remove("collapsed");
        return;
    }

    const button = document.createElement("button");
    button.className = "read-more-btn";
    button.textContent = "Read more ▾";
    button.setAttribute("aria-expanded", "false");

    button.onclick = function () {
        const collapsed = abstract.classList.toggle("collapsed");
        button.textContent = collapsed ? "Read more ▾" : "Show less ▴";
        button.setAttribute("aria-expanded", String(!collapsed));
    };

    abstract.after(button);
});
