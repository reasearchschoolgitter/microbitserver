function fetchRssFeed() {
    fetch('https://www.google.com/appsstatus/dashboard/en-CA/feed.atom')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        const items = data.querySelectorAll('item');
        const feedContainer = document.getElementById('rss-feed');
        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const description = item.querySelector('description').textContent;
            const rssItem = document.createElement('div');
            rssItem.classList.add('rss-item');
            rssItem.innerHTML = `
                <div class="rss-title">${title}</div>
                <div class="rss-description">${description}</div>
            `;
            feedContainer.appendChild(rssItem);
        });
    })
    .catch(error => console.error('Error fetching RSS feed:', error));
}

document.addEventListener('DOMContentLoaded', fetchRssFeed);
