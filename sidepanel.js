// sidepanel.js
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const searchEngines = [
    // SEARCH
    {
        category: 'SEARCH',
        name: 'Brave',
        url: 'https://search.brave.com/search?q={query}'
    },
    {
        category: 'SEARCH',
        name: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/{query}'
    },
    {
        category: 'SEARCH',
        name: 'Youtube',
        url: 'https://www.youtube.com/results?search_query={query}'
    },
    
    // IMAGES
    {
        category: 'IMAGES',
        name: 'Pexels',
        url: 'https://www.pexels.com/search/{query}'
    },
    {
        category: 'IMAGES',
        name: 'Unsplash',
        url: 'https://unsplash.com/s/photos/{query}'
    },
    {
        category: 'IMAGES',
        name: 'Wikimedia',
        url: 'https://commons.wikimedia.org/w/index.php?search={query}'
    },
    
    // NEWS
    {
        category: 'NEWS',
        name: 'AP News',
        url: 'https://apnews.com/search?q={query}'
    },
    {
        category: 'NEWS',
        name: 'BBC',
        url: 'https://www.bbc.co.uk/search?q={query}'
    },
    {
        category: 'NEWS',
        name: 'NPR',
        url: 'https://www.npr.org/search/?query={query}'
    },
    
    // BOOKS
    {
        category: 'BOOKS',
        name: 'Amazon',
        url: 'https://www.amazon.com/s?k={query}&i=stripbooks'
    },
    {
        category: 'BOOKS',
        name: 'Goodreads',
        url: 'https://www.goodreads.com/search?q={query}'
    },
    {
        category: 'BOOKS',
        name: 'Open Library',
        url: 'https://openlibrary.org/search?q={query}'
    },
    
    // SOCIAL
    {
        category: 'SOCIAL',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/search/results/all/?keywords={query}'
    },
  {
        category: 'SOCIAL',
        name: 'Twitter',
        url: 'https://twitter.com/search?q={query}'
    },
    {
        category: 'SOCIAL',
        name: 'Reddit',
        url: 'https://www.reddit.com/search?q={query}'
    },
  
    // SHOP
    {
        category: 'SHOP',
        name: 'Amazon',
        url: 'https://www.amazon.com/s?k={query}'
    },
    {
        category: 'SHOP',
        name: 'eBay',
        url: 'https://www.ebay.com/sch/i.html?_nkw={query}'
    },
    {
        category: 'SHOP',
        name: 'Etsy',
        url: 'https://www.etsy.com/search?q={query}'
    },

    // CODING
    {
        category: 'CODING',
        name: 'GitHub',
        url: 'https://github.com/search?q={query}'
    },
    {
        category: 'CODING',
        name: 'SO',
        url: 'https://stackoverflow.com/search?q={query}'
    },
    {
        category: 'CODING',
        name: 'MDN',
        url: 'https://developer.mozilla.org/en-US/search?q={query}'
    },

    // DESIGN
    {
        category: 'DESIGN',
        name: 'Behance',
        url: 'https://www.behance.net/search?search={query}'
    },
    {
        category: 'DESIGN',
        name: 'Dribbble',
        url: 'https://dribbble.com/search/{query}'
    },
    {
        category: 'DESIGN',
        name: 'Pinterest',
        url: 'https://www.pinterest.com/search/pins/?q={query}'
    },

    // HEALTH
    {
        category: 'HEALTH',
        name: 'Mayo',
        url: 'https://www.mayoclinic.org/search/search-results?q={query}'
    },
    {
        category: 'HEALTH',
        name: 'PubMed',
        url: 'https://pubmed.ncbi.nlm.nih.gov/?term={query}'
    },
    {
        category: 'HEALTH',
        name: 'WebMD',
        url: 'https://www.webmd.com/search/search_results/default.aspx?query={query}'
    },

    // LEARNING
    {
        category: 'LEARNING',
        name: 'Coursera',
        url: 'https://www.coursera.org/search?query={query}'
    },
    {
        category: 'LEARNING',
        name: 'edX',
        url: 'https://www.edx.org/search?q={query}'
    },
    {
        category: 'LEARNING',
        name: 'Khan Acad.',
        url: 'https://www.khanacademy.org/search?page_search_query={query}'
    },

    // MOVIES
    {
        category: 'MOVIES',
        name: 'IMDb',
        url: 'https://www.imdb.com/find?q={query}'
    },
    {
        category: 'MOVIES',
        name: 'Rotten Tom',
        url: 'https://www.rottentomatoes.com/search?search={query}'
    },
    {
        category: 'MOVIES',
        name: 'Letterboxd',
        url: 'https://letterboxd.com/search/{query}'
    },

    // JOBS
    {
        category: 'JOBS',
        name: 'Indeed',
        url: 'https://www.indeed.com/jobs?q={query}'
    },
    {
        category: 'JOBS',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/jobs/search/?keywords={query}'
    },
    {
        category: 'JOBS',
        name: 'Glassdoor',
        url: 'https://www.glassdoor.com/Job/jobs.htm?sc.keyword={query}'
    },

    // ACADEMIA
    {
        "category": "ACADEMIA",
        "name": "Scholar",
        "url": "https://scholar.google.com/scholar?q={query}"
    },
    {
        "category": "ACADEMIA",
        "name": "ResearchGate",
        "url": "https://www.researchgate.net/search?q={query}"
    },
    {
        "category": "ACADEMIA",
        "name": "Semantic",
        "url": "https://www.semanticscholar.org/search?q={query}"
    },

    // MUSIC
    {
        "category": "MUSIC",
        "name": "Spotify",
        "url": "https://open.spotify.com/search/{query}"
    },
    {
        "category": "MUSIC",
        "name": "SoundCloud",
        "url": "https://soundcloud.com/search?q={query}"
    },
    {
        "category": "MUSIC",
        "name": "Bandcamp",
        "url": "https://bandcamp.com/search?q={query}"
    },

    // TRAVEL
    {
        "category": "TRAVEL",
        "name": "Tripadvisor",
        "url": "https://www.tripadvisor.com/Search?q={query}"
    },
    {
        "category": "TRAVEL",
        "name": "Atlas Obscura",
        "url": "https://www.atlasobscura.com/search?q={query}"
    },
    {
        "category": "TRAVEL",
        "name": "Lonely Planet",
        "url": "https://www.lonelyplanet.com/search?q=places%5Bquery%5D={query}"
    },

    // GOVERNMENT/LEGAL
    {
        "category": "GOV",
        "name": "GovInfo",
        "url": "https://www.govinfo.gov/app/search?query={query}"
    },
    {
        "category": "GOV",
        "name": "USA",
        "url": "https://search.usa.gov/search?affiliate=usagov_all_gov&query={query}"
    },
    {
        "category": "GOV",
        "name": "Archives",
        "url": "https://search.archives.gov/search?query={query}"
    },

    // TECHNOLOGY
    {
        "category": "TECH",
        "name": "TechCrunch",
        "url": "https://techcrunch.com/search/{query}"
    },
    {
        "category": "TECH",
        "name": "The Verge",
        "url": "https://www.theverge.com/search?q={query}"
    },
    {
        "category": "TECH",
        "name": "Hacker News",
        "url": "https://hn.algolia.com/?q={query}"
    },

    // FINANCE
    {
        "category": "FINANCE",
        "name": "Yahoo",
        "url": "https://finance.yahoo.com/lookup?s={query}"
    },
    {
        "category": "FINANCE",
        "name": "Morningstar",
        "url": "https://www.morningstar.com/search?query={query}"
    },
    {
        "category": "FINANCE",
        "name": "MarketWatch",
        "url": "https://www.marketwatch.com/search?q={query}"
    },

    // DIY & HOBBIES
    {
        "category": "DIY",
        "name": "Instructables",
        "url": "https://www.instructables.com/search/?q={query}"
    },
    {
        "category": "DIY",
        "name": "WikiHow",
        "url": "https://www.wikihow.com/wikiHowTo?search={query}"
    },
    {
        "category": "DIY",
        "name": "eHow",
        "url": "https://www.ehow.com/search.html?q={query}"
    },

    // LOCAL
    {
        "category": "LOCAL",
        "name": "Yelp",
        "url": "https://www.yelp.com/search?find_desc={query}"
    },
    {
        "category": "LOCAL",
        "name": "Google Maps",
        "url": "https://www.google.com/maps/search/{query}"
    },
    {
        "category": "LOCAL",
        "name": "Nextdoor",
        "url": "https://nextdoor.com/news_feed/?query={query}"
    },

    // FASHION
    {
        "category": "FASHION",
        "name": "ASOS",
        "url": "https://www.asos.com/search/?q={query}"
    },
    {
        "category": "FASHION",
        "name": "Farfetch",
        "url": "https://www.farfetch.com/search/items.aspx?q={query}"
    },
    {
        "category": "FASHION",
        "name": "Vogue",
        "url": "https://www.vogue.com/search?q={query}"
    },

    // FOOD
    {
        "category": "FOOD",
        "name": "Simply",
        "url": "https://www.simplyrecipes.com/search?q={query}"
    },
    {
        "category": "FOOD",
        "name": "Tasty",
        "url": "https://tasty.co/search?q={query}"
    },
    {
        "category": "FOOD",
        "name": "Serious Eats",
        "url": "https://www.seriouseats.com/search?q={query}"
    }
];


document.addEventListener('DOMContentLoaded', async () => {
    
    console.log('Side panel loaded');

    // Get query from storage
    const result = await chrome.storage.local.get('currentQuery');
    const query = result.currentQuery || '';
    console.log('Query from storage:', query);
    
    // Set up search input
    const searchInput = document.getElementById('search-input');
    searchInput.value = query;
    
    // Initial creation of links
    createSearchLinks(query);
    
    // Update links when input changes
    searchInput.addEventListener('input', debounce((e) => {
        createSearchLinks(e.target.value);
    }, 300));
});

function createSearchLinks(query = '') {
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    // Sort search engines by category and then by name
    const sortedEngines = [...searchEngines].sort((a, b) => {
        // First sort by category
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        // If same category, sort by name
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    
    sortedEngines.forEach(engine => {
        if (!document.querySelector(`[data-category="${engine.category}"]`)) {
            const header = document.createElement('div');
            header.className = 'category-header';
            header.textContent = engine.category;
            header.dataset.category = engine.category;
            container.appendChild(header);
        }
        
        const link = document.createElement('a');
        link.className = 'search-link';
        link.href = engine.url.replace('{query}', encodeURIComponent(query));
        link.textContent = engine.name;
        link.target = '_blank';
        container.appendChild(link);
    });
}