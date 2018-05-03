let urlParams = new URLSearchParams(window.location.search);
    let venue = urlParams.get("venue");

console.log(venue)

document.querySelector(".header-text2").textContent=venue;
document.querySelector(".venue-text").textContent=venue + " EVENTS";

