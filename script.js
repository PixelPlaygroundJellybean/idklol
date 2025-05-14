// script.js

// --- Get References to HTML Elements ---

// Pages
const landingPage = document.getElementById('landing-page'); // *** NEW ***
const welcomePage = document.getElementById('welcome-page');
const quotesPage = document.getElementById('quotes-page');
const cakePage = document.getElementById('cake-page');
// const videoPage = document.getElementById('video-page'); // REMOVED
const finalPage = document.getElementById('final-page');
// *** UPDATED allPages Array ***
const allPages = [landingPage, welcomePage, quotesPage, cakePage, finalPage];

// Buttons
const enterButton = document.getElementById('enter-button'); // *** NEW ***
const startButton = document.getElementById('start-button');
const quotesBack = document.getElementById('quotes-back');
const quotesNext = document.getElementById('quotes-next');
const cakeBack = document.getElementById('cake-back');
// const videoBack = document.getElementById('video-back'); // REMOVED
// const videoNext = document.getElementById('video-next'); // REMOVED
const finalBack = document.getElementById('final-back');

// Content Elements
// const cakeVideo = document.getElementById('cakeVideo'); // REMOVED
const finalVideo = document.getElementById('finalVideo'); // Keep final video ref
const quoteTextElem = document.getElementById('quoteText');
const cakeOptions = document.querySelectorAll('.cake-option');
// const cakeSpecificAnimationContainer = document.getElementById('cake-specific-animation'); // REMOVED

// --- Data ---
const quotes = [
  "Wishing you a day filled with happiness and a year filled with joy! Happy Birthday!",
  "May your birthday be filled with sunshine, smiles, laughter, love, and cheer!",
  "Happy Birthday! Here's to another year of wonderful adventures and accomplishments.",
  "Sending you the warmest wishes on your special day. Hope it's fantastic!",
  "Cheers to you for another trip around the sun! Happy Birthday!"
];

// --- Core Functions ---

// Function to switch visible pages
function showPage(pageToShow) {
  // Hide all pages first
  allPages.forEach(page => {
    if (page) {
      page.classList.remove('active');
    } else {
      console.error("A page element defined in allPages array is missing in the HTML!");
    }
  });

   // REMOVED: Clear cake-specific animations block

  // Show the target page
  if (pageToShow) {
    pageToShow.classList.add('active');

    // --- Page Specific Actions ---
    if (pageToShow === quotesPage) {
      revealQuote();
    }
    // Autoplay handled by video attribute

  } else {
    console.error("Attempted to show a page that doesn't exist or is null!");
  }
}

// Quote text reveal animation
function revealQuote() {
    if (!quoteTextElem) return;
    quotesNext.disabled = true;
    quoteTextElem.textContent = '';
    let currentQuote = quoteTextElem.dataset.currentQuote || "";
    let newQuote;
    do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (quotes.length > 1 && newQuote === currentQuote);
    quoteTextElem.dataset.currentQuote = newQuote;
    let i = 0;
    function typeLetter() {
        if (i < newQuote.length) {
            quoteTextElem.textContent += newQuote.charAt(i);
            i++;
            setTimeout(typeLetter, 40);
        } else {
            quotesNext.disabled = false;
        }
    }
    typeLetter();
}


// --- Event Listeners ---

// Check if elements exist before adding listeners

// *** NEW Listener for Landing Page Button ***
if (enterButton) {
    enterButton.addEventListener('click', () => {
        showPage(welcomePage); // Go from Landing to Welcome
    });
} else { console.error("Cannot find #enter-button"); }

if (startButton) {
    startButton.addEventListener('click', () => {
        showPage(quotesPage); // Go from Welcome to Quotes
    });
} else { console.error("Cannot find #start-button"); }

if (quotesBack) {
    quotesBack.addEventListener('click', () => {
        showPage(welcomePage); // Back from Quotes goes to Welcome
    });
} else { console.error("Cannot find #quotes-back"); }

if (quotesNext) {
    quotesNext.addEventListener('click', () => {
        if (!quotesNext.disabled) {
             showPage(cakePage); // Quotes Next goes to Cake
        }
    });
} else { console.error("Cannot find #quotes-next"); }

if (cakeBack) {
    cakeBack.addEventListener('click', () => {
        showPage(quotesPage); // Cake Back goes to Quotes
    });
} else { console.error("Cannot find #cake-back"); }


// *** Cake selection listeners - MODIFIED ***
if (cakeOptions.length > 0) { // Removed checks for removed elements
    cakeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const cakeId = option.getAttribute('data-cake'); // Still useful maybe for future logic
            if (cakeId) {
                // REMOVED: Set cake video source logic
                // REMOVED: Set Cake-Specific Animation logic

                // *** MODIFIED: Navigate directly to the FINAL page ***
                showPage(finalPage);

                // Optional: Ensure final video plays if autoplay fails
                if(finalVideo && finalVideo.paused) {
                    finalVideo.play().catch(e => console.error("Final video play failed:", e));
                }

            } else { console.error("Cake option missing data-cake:", option); }
        });
    });
} else { /* Error checks */ }


// REMOVED: Event listeners for videoBack and videoNext


// *** MODIFIED: Final Back button listener ***
if (finalBack) {
    finalBack.addEventListener('click', () => {
         if (finalVideo) finalVideo.pause(); // Pause video on back
         showPage(cakePage); // Go back to Cake Selection Page
    });
} else { console.error("Cannot find #final-back"); }


// --- Initial Setup ---
// Set final video source (remains the same, uses finalAnimation.mp4)
if (finalVideo) {
    finalVideo.src = "videos/finalAnimation.mp4"; // Ensure this path is correct
    finalVideo.autoplay = true; // Autoplay video
    finalVideo.load();
} else {
     console.error("Could not find 'finalVideo' element");
}

// Initial page is now set by 'active' class on #landing-page in HTML

console.log("Birthday script loaded with Landing page, Video page removed.");