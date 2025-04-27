// Toggle the visibility of the black banner when the hamburger menu is clicked
const bannerToggle = document.getElementById('banner-toggle');
const blackBanner = document.getElementById('black-banner');

bannerToggle.addEventListener('click', () => {
    // Toggle the display of the banner
    if (blackBanner.style.display === 'none' || blackBanner.style.display === '') {
        blackBanner.style.display = 'flex'; // Show the banner
    } else {
        blackBanner.style.display = 'none'; // Hide the banner
    }
});
