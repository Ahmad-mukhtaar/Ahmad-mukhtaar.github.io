"use strict";

(() => {
  const quotes = [
  {
    "text": "Knowledge without action is madness and action without knowledge is void.",
    "by": "Al-Ghazali · Letter to a Disciple",
    "url": "https://www.emaanlibrary.com/wp-content/uploads/2019/10/letter-to-a-disciple-english.pdf"
  },
  {
    "text": "The thirst for knowledge was innate in me from an early age.",
    "by": "Al-Ghazali · Deliverance from Error",
    "url": "https://www.ghazali.org/books/md/gz101.htm"
  },
  {
    "text": "Knowledge of self is the key to the knowledge of God.",
    "by": "Al-Ghazali · The Alchemy of Happiness",
    "url": "https://data.nur.nu/Kutub/English/Ghazali_Alchemy-of-Happiness.pdf#page=8"
  },
  {
    "text": "Imperfections are the mirror for the quality of perfection.",
    "by": "Rumi · Masnavi, I.3210",
    "url": "https://www.dar-al-masnavi.org/n-I-3157.html"
  },
  {
    "text": "Don’t stir it up, so that the water may become clear…",
    "by": "Rumi · Masnavi, IV.2481",
    "url": "https://www.dar-al-masnavi.org/n-IV-2460.html"
  },
  {
    "text": "Look within; within is the fountain of all good.",
    "by": "Marcus Aurelius · Meditations",
    "url": "https://www.gutenberg.org/files/2680/2680-h/2680-h.htm"
  },
  {
    "text": "Learning without thought is naught; thought without learning is dangerous.",
    "by": "Confucius · Analects, II.15",
    "url": "https://www.gutenberg.org/files/24055/24055-h/24055-h.htm"
  },
  {
    "text": "All men by nature desire to know.",
    "by": "Aristotle · Metaphysics, I.1",
    "url": "https://classics.mit.edu/Aristotle/metaphysics.1.i.html"
  },
  {
    "text": "The journey of a thousand li commenced with a single step.",
    "by": "Laozi · Tao Te Ching, 64",
    "url": "https://www.gutenberg.org/files/216/216-h/216-h.htm"
  },
  {
    "text": "While we are postponing, life speeds by.",
    "by": "Seneca · Letters, 1.2",
    "url": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_1"
  }
];
  const proverb = {
    text: "Ei oppi ojaan kaada.",
    by: "Suomalainen sananlasku",
    url: "https://conlexis-23.it.helsinki.fi/kaataa/"
  };
  const copy = {en:{greeting:"Hello.",name:"I'm Ahmad.",lead:"Always curious. Open to conversation.",detail:"A personal introduction",contact:"Connect on LinkedIn",replay:"Replay introduction ↻",title:"Ahmad · A personal introduction",portrait:"Pencil portrait of Ahmad",language:"Choose language"},fi:{greeting:"Moi.",name:"Mä oon Ahmad.",lead:"Aina utelias. Jutellaan.",detail:"Lyhyesti minusta",contact:"Ota yhteyttä LinkedInissä",replay:"Toista esittely ↻",title:"Ahmad · Lyhyesti minusta",portrait:"Lyijykynämuotokuva Ahmadista",language:"Valitse kieli"}};
  const screen = document.getElementById("warm");
  const replay = document.getElementById("replay");
  const quoteText = document.querySelector(".quote p");
  const quoteSource = document.querySelector(".quote a");
  const languagePicker = document.querySelector(".language");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  let choice = Math.floor(Math.random() * quotes.length);

  // Store only the last quote number; no visitor or contact information.
  try {
    const saved = sessionStorage.getItem("portrait-quote");
    const previous = Number(saved);
    if (saved !== null && Number.isInteger(previous) && previous >= 0 && previous < quotes.length) {
      const offset = 1 + Math.floor(Math.random() * (quotes.length - 1));
      choice = (previous + offset) % quotes.length;
    }
    sessionStorage.setItem("portrait-quote", String(choice));
  } catch {
    // The page also works when browser storage is disabled.
  }

  function render(language) {
    const content = copy[language];
    document.documentElement.lang = language;
    document.title = content.title;
    document.querySelector('meta[name="description"]').content = content.title + ". " + content.lead;
    document.querySelectorAll("[data-copy]").forEach(element => {
      element.textContent = content[element.dataset.copy];
    });
    replay.textContent = content.replay;
    document.querySelector(".sketch").alt = content.portrait;
    document.querySelector(".nav").setAttribute("aria-label", content.detail);
    languagePicker.setAttribute("aria-label", content.language);
    languageButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    const quote = language === "fi" ? proverb : quotes[choice];
    quoteText.textContent = "“" + quote.text + "”";
    quoteSource.textContent = quote.by + " ↗";
    quoteSource.href = quote.url;
  }

  replay.addEventListener("click", () => {
    screen.classList.remove("motion");
    void screen.offsetWidth;
    screen.classList.add("motion");
  });
  render(new URLSearchParams(location.search).get("lang") === "fi" ? "fi" : "en");
  languagePicker.hidden = false;
  languageButtons.forEach(button => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      render(language);
      const url = new URL(location.href);
      url.searchParams.set("lang", language);
      history.replaceState(null, "", url);
    });
  });
})();
