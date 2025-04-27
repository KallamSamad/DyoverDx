// Script for toggling the visibility of the banner on mobile when the hamburger is clicked
document.getElementById('banner-toggle').addEventListener('click', function() {
    const banner = document.getElementById('black-banner');
    // Toggle the display of the banner when the hamburger menu is clicked
    if (banner.style.display === 'none' || banner.style.display === '') {
        banner.style.display = 'flex';  // Show the banner
    } else {
        banner.style.display = 'none';  // Hide the banner
    }
});
