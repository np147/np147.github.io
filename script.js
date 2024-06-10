document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const originalUrl = document.getElementById('originalUrl').value.trim();
    if (originalUrl) {
        const shortCode = generateShortCode();
        saveUrl(shortCode, originalUrl);
        displayShortenedUrls();
        document.getElementById('urlForm').reset();
    }
});

function generateShortCode() {
    return Math.random().toString(36).substring(2, 8);
}

function saveUrl(shortCode, originalUrl) {
    let urls = JSON.parse(localStorage.getItem('urls')) || {};
    urls[shortCode] = originalUrl;
    localStorage.setItem('urls', JSON.stringify(urls));
}

function displayShortenedUrls() {
    const urls = JSON.parse(localStorage.getItem('urls')) || {};
    const container = document.getElementById('shortenedUrls');
    container.innerHTML = '';
    for (const [shortCode, originalUrl] of Object.entries(urls)) {
        const shortUrl = `${window.location.href}${shortCode}`;
        container.innerHTML += `
            <div class="short-url">
                <a href="${originalUrl}" target="_blank">${shortUrl}</a> - ${originalUrl}
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', displayShortenedUrls);
