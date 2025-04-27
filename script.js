// JavaScript for toggling the banner visibility
document.getElementById('banner-toggle').addEventListener('click', function() {
    var banner = document.getElementById('black-banner');
    // Toggle the display property between 'none' and 'flex'
    if (banner.style.display === 'none' || banner.style.display === '') {
        banner.style.display = 'flex';  // Show the banner
    } else {
        banner.style.display = 'none';  // Hide the banner
    }
});
