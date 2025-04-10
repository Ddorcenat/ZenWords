const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

async function fetchQuote() {
  quoteText.textContent = "Loading...";
  authorText.textContent = "";

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    console.log(response)
    const data = await response.json();
    console.log(data)

    quoteText.textContent = `"${data.quote}"`;
    authorText.textContent = `– ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Could not fetch a quote 🥲";
    authorText.textContent = "";
  }
}


fetchQuote();


newQuoteBtn.addEventListener("click", fetchQuote);



// Additional elements for journal feature
const noteInput = document.getElementById("note");
const saveNoteBtn = document.getElementById("save-note");
const journalContainer = document.getElementById("journal-entries");

// Save journal entry to localStorage
function saveJournalEntry(quote, author, note) {
  if (!note.trim()) return;

  const entry = {
    quote,
    author,
    note,
    date: new Date().toLocaleString()
  };

  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.unshift(entry); // Add newest to top
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  noteInput.value = "";
  displayJournalEntries();
}


function displayJournalEntries() {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  journalContainer.innerHTML = "";

  entries.forEach(entry => {
    const div = document.createElement("div");
    div.classList.add("journal-entry");
    div.innerHTML = `
      <p><strong>"${entry.quote}"</strong><br><em>${entry.author}</em></p>
      <p><strong>My thoughts:</strong></p>
      <p>${entry.note}</p>
      <small>${entry.date}</small>
    `;
    journalContainer.appendChild(div);
  });
}

// Event: Save button
saveNoteBtn.addEventListener("click", () => {
  saveJournalEntry(quoteText.textContent, authorText.textContent, noteInput.value);
});

// Load existing entries on page load
displayJournalEntries();
