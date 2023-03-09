const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

//hide loading
function complete() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get Quotes From API
let apiQuotes = [];
function newQuote() {
	loading();

	setTimeout(() => {
		const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

		if (!quote.author) {
			authorText.textContent = "Unknow";
		} else {
			authorText.textContent = quote.author;
		}
		if (quote.text.length > 150) {
			quoteText.classList.add("long-quote");
		} else {
			quoteText.classList.remove("long-quote");
		}

		quoteText.textContent = quote.text;

		complete();
	}, 500); // Opóźnienie w milisekundach, tutaj ustawione na 1 sekundę
}

async function getQuotes() {
	loading();
	const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
	try {
		const resnponse = await fetch(apiUrl);
		apiQuotes = await resnponse.json();
		newQuote();
	} catch (error) {
		getQuotes();
	}
}

//Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
