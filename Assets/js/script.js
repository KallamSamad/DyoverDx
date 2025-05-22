// Toggle mobile banner visibility
document.querySelector('.banner-toggle').addEventListener('click', function () {
    const banner = document.querySelector('.black-banner');
    banner.style.display = (banner.style.display === 'none' || banner.style.display === '') ? 'flex' : 'none';
});

// Toggle spoiler visibility
function toggleSpoiler() {
    const spoiler = document.getElementById('spoiler');
    spoiler.style.display = (spoiler.style.display === 'none' || spoiler.style.display === '') ? 'block' : 'none';
}
