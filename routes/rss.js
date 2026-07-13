const router = require('express').Router();
const Parser = require('rss-parser');
const parser = new Parser({
    timeout: 10000,
    headers: {
        'User-Agent': 'Pastoral Familiar RSS Reader',
        'Accept': 'application/rss+xml, application/xml, text/xml'
    }
});

const RSS_FEEDS = {
    america: 'https://www.aciprensa.com/rss/news/america',
    vidaFamilia: 'https://www.aciprensa.com/rss/news/vida-y-familia',
    evangelio: 'https://www.aciprensa.com/rss/evangelio',
    santos: 'https://www.aciprensa.com/rss/saints',
    familias: 'https://www.aciprensa.com/tags/1001/familias/rss'
};

async function fetchFeed(url, limit = 6) {
    try {
        const feed = await parser.parseURL(url);
        return feed.items.slice(0, limit).map(item => ({
            title: item.title || 'Sin título',
            link: item.link || '#',
            description: item.contentSnippet || item.content || '',
            image: extractImage(item),
            date: item.pubDate || item.isoDate || ''
        }));
    } catch (error) {
        console.error(`Error fetching RSS from ${url}:`, error.message);
        return [];
    }
}

function extractImage(item) {
    if (item.enclosure && item.enclosure.url) return item.enclosure.url;
    if (item['media:thumbnail'] && item['media:thumbnail']['$']) return item['media:thumbnail']['$'].url;
    if (item['media:content'] && item['media:content']['$']) return item['media:content']['$'].url;
    const content = item.content || item.contentSnippet || '';
    const match = content.match(/<img[^>]+src="([^"]+)"/);
    return match ? match[1] : null;
}

router.get('/america', async (req, res) => {
    try {
        const items = await fetchFeed(RSS_FEEDS.america, 6);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar noticias', items: [] });
    }
});

router.get('/vida-familia', async (req, res) => {
    try {
        const items = await fetchFeed(RSS_FEEDS.vidaFamilia, 6);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar noticias', items: [] });
    }
});

router.get('/evangelio', async (req, res) => {
    try {
        const items = await fetchFeed(RSS_FEEDS.evangelio, 1);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar el evangelio', items: [] });
    }
});

router.get('/santos', async (req, res) => {
    try {
        const items = await fetchFeed(RSS_FEEDS.santos, 1);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar el santo del día', items: [] });
    }
});

router.get('/familias', async (req, res) => {
    try {
        const items = await fetchFeed(RSS_FEEDS.familias, 10);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar noticias de familias', items: [] });
    }
});

module.exports = router;