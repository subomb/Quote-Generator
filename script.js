const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const categorySelect = document.getElementById('category-select');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function fetchNewQuote(category = '') {
    loading();
    const apiKey = 'SKaXVyRHa89HbrE5ys+EJw==5VquQ2fTVczD1WmU';
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const quotes = await response.json();
        if (!Array.isArray(quotes) || quotes.length === 0) {
            throw new Error('No quotes found');
        }
        const quote = quotes[0];
        displayQuote(quote);
    } catch (error) {
        console.error('Failed to fetch quotes', error);
        complete();
        quoteText.textContent = 'An error occurred while fetching quotes. Please try again later.';
        authorText.textContent = '';
    }
}

function displayQuote(quote) {
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.quote.length > 50) { 
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.quote; 
    complete();
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    fetchNewQuote(selectedCategory);
});

twitterBtn.addEventListener('click', tweetQuote);

categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    fetchNewQuote(selectedCategory);
});

fetchNewQuote();