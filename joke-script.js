// Joke Generator with External API

const getJokeBtn = document.getElementById('getJokeBtn');
const jokeContent = document.getElementById('jokeContent');
const copyBtn = document.getElementById('copyBtn');
const jokeTypeSelect = document.getElementById('jokeType');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('errorMsg');
const errorText = document.getElementById('errorText');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

let currentJoke = '';
let jokeHistory = JSON.parse(localStorage.getItem('jokeHistory')) || [];

// Initialize history on page load
displayHistory();

// Get Joke Button Event Listener
getJokeBtn.addEventListener('click', fetchJoke);

// Copy Button Event Listener
copyBtn.addEventListener('click', copyJokeToClipboard);

// Clear History Button Event Listener
clearHistoryBtn.addEventListener('click', clearHistory);

// Joke Type Change
jokeTypeSelect.addEventListener('change', fetchJoke);

// Main function to fetch joke from API
async function fetchJoke() {
    const jokeType = jokeTypeSelect.value;
    const apiUrl = getApiUrl(jokeType);

    // Show loading state
    loading.style.display = 'block';
    errorMsg.style.display = 'none';
    jokeContent.innerHTML = '';
    copyBtn.disabled = true;
    getJokeBtn.disabled = true;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();
        displayJoke(data, jokeType);
        addToHistory(currentJoke);
        copyBtn.disabled = false;

    } catch (error) {
        console.error('Error fetching joke:', error);
        showError('Oops! Could not fetch a joke. Please try again.');
    } finally {
        loading.style.display = 'none';
        getJokeBtn.disabled = false;
    }
}

// Get API URL based on joke type
function getApiUrl(jokeType) {
    switch (jokeType) {
        case 'general':
            return 'https://official-joke-api.appspot.com/random_joke';
        case 'programming':
            return 'https://official-joke-api.appspot.com/jokes/programming/random';
        case 'knock-knock':
            return 'https://official-joke-api.appspot.com/jokes/knock-knock/random';
        default:
            return 'https://api.jokes.one/jod?format=json';
    }
}

// Display joke based on API response format
function displayJoke(data, jokeType) {
    let jokeHTML = '';

    if (jokeType === 'any') {
        // jokes.one API format
        const jokeData = data.contents.jokes[0];
        currentJoke = jokeData.joke;
        jokeHTML = `<p>${jokeData.joke}</p>`;
    } else if (data.type === 'twopart') {
        // Two-part joke format (general, programming, knock-knock)
        const setup = data.setup;
        const punchline = data.delivery;
        currentJoke = `${setup}\n${punchline}`;
        jokeHTML = `
            <div class="joke-setup">${setup}</div>
            <div class="joke-punchline">${punchline}</div>
        `;
    } else {
        // Single part joke
        currentJoke = data.joke;
        jokeHTML = `<p>${data.joke}</p>`;
    }

    jokeContent.innerHTML = jokeHTML;
}

// Show error message
function showError(message) {
    errorMsg.style.display = 'block';
    errorText.textContent = message;
}

// Copy joke to clipboard
function copyJokeToClipboard() {
    if (!currentJoke) return;

    navigator.clipboard.writeText(currentJoke).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#51cf66';

        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(() => {
        showError('Failed to copy joke to clipboard');
    });
}

// Add joke to history
function addToHistory(joke) {
    if (!joke) return;

    const truncatedJoke = joke.length > 50 ? joke.substring(0, 50) + '...' : joke;
    jokeHistory.unshift({
        text: joke,
        display: truncatedJoke,
        timestamp: new Date().toLocaleTimeString()
    });

    // Keep only last 10 jokes
    if (jokeHistory.length > 10) {
        jokeHistory.pop();
    }

    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
    displayHistory();
}

// Display history
function displayHistory() {
    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<li class="placeholder">No jokes yet. Get your first joke!</li>';
        clearHistoryBtn.style.display = 'none';
        return;
    }

    historyList.innerHTML = jokeHistory.map((joke, index) => `
        <li data-index="${index}" title="${joke.text}">
            <strong>Joke ${jokeHistory.length - index}:</strong> ${joke.display}
        </li>
    `).join('');

    clearHistoryBtn.style.display = 'block';

    // Add click listeners to history items
    document.querySelectorAll('#historyList li:not(.placeholder)').forEach(item => {
        item.addEventListener('click', () => {
            const index = item.dataset.index;
            currentJoke = jokeHistory[index].text;
            jokeContent.innerHTML = `<p>${currentJoke}</p>`;
            copyBtn.disabled = false;
        });
    });
}

// Clear history
function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        jokeHistory = [];
        localStorage.removeItem('jokeHistory');
        displayHistory();
    }
}

// Console message
console.log('%c🎭 Welcome to the Joke Generator! 🎭', 'font-size: 20px; color: #001a4d; font-weight: bold;');
console.log('%cMade with ❤️ using the Official Joke API', 'font-size: 14px; color: #003d99;');