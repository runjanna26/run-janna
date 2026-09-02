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
    // 274 is roughly the width of one item (250px) plus the gap (1.5rem/24px)
    const scrollAmount = 274;

    carousel.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth' // Ensures it glides smoothly rather than jumping
    });
}
