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
  const copy = {
    "en": {
      "greeting": "Hello.",
      "name": "I'm Ahmad.",
      "profession": "Statistician · Data scientist",
      "lead": "Finding structure in uncertainty.",
      "detail": "Curiosity, always.",
      "contact": "Connect on LinkedIn",
      "replay": "Replay introduction ↻",
      "title": "Ahmad · Statistician & data scientist",
      "portrait": "Pencil portrait of Ahmad",
      "language": "Choose language",
      "bayesLabel": "Bayes’ rule: posterior density is proportional to likelihood times prior density",
      "inferenceTitle": "Evidence & uncertainty",
      "prior": "Prior",
      "posterior": "Updated",
      "evidence": "Evidence",
      "inferenceHint": "Slide to explore · illustrative data",
      "observations": "observations",
      "observation": "observation",
      "plotDescription": "Illustrative Bayesian normal model. {n} {observations}; estimated mean {mean}; uncertainty, measured as posterior standard deviation, {sd}."
    },
    "fi": {
      "greeting": "Moi.",
      "name": "Mä oon Ahmad.",
      "profession": "Tilastotieteilijä · Datatieteilijä",
      "lead": "Epävarmuudesta ymmärrykseen.",
      "detail": "Aina utelias.",
      "contact": "Ota yhteyttä LinkedInissä",
      "replay": "Toista esittely ↻",
      "title": "Ahmad · Tilastotieteilijä & datatieteilijä",
      "portrait": "Lyijykynämuotokuva Ahmadista ylioppilaslakissa",
      "language": "Valitse kieli",
      "bayesLabel": "Bayesin kaava: posterioritiheys on verrannollinen uskottavuuden ja prioritiheyden tuloon",
      "inferenceTitle": "Havainnot ja epävarmuus",
      "prior": "Priori",
      "posterior": "Posteriori",
      "evidence": "Havaintoja",
      "inferenceHint": "Kokeile liukusäädintä · esimerkkiaineisto",
      "observations": "havaintoa",
      "observation": "havainto",
      "plotDescription": "Bayesilaisen normaalimallin havainnollistus. {n} {observations}; keskiarvon estimaatti {mean}; epävarmuus posteriorin keskihajontana {sd}."
    }
  };
  const screen = document.getElementById("warm");
  const replay = document.getElementById("replay");
  const quoteText = document.querySelector(".quote p");
  const quoteSource = document.querySelector(".quote a");
  const languagePicker = document.querySelector(".language");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  const inference = document.querySelector(".inference");
  const evidence = document.getElementById("evidence");
  const evidenceCount = document.getElementById("evidence-count");
  const posteriorCurve = document.querySelector(".posterior-curve");
  const posteriorArea = document.querySelector(".posterior-area");
  const plotDescription = document.getElementById("inference-description");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // Normal prior N(0, 1), known observation variance 1; illustrative observations.
  const observations = [0.7, 1.2, 0.9, 1.4, 1.1, 0.8, 1.3, 0.6, 1.0, 1.2, 0.8, 1.1];
  let plotted = { mean: 0, sd: 1 };
  let animationFrame = 0;
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

  function distribution() {
    const count = Number(evidence.value);
    const sum = observations.slice(0, count).reduce((total, value) => total + value, 0);
    return { mean: sum / (1 + count), sd: 1 / Math.sqrt(1 + count) };
  }

  function curve({ mean, sd }) {
    return Array.from({ length: 121 }, (_, index) => {
      const theta = -3 + index / 20;
      const density = Math.exp(-0.5 * ((theta - mean) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
      return `${index ? "L" : "M"}${(12 + index * 376 / 120).toFixed(2)} ${(84 - density * 70 / 1.5).toFixed(2)}`;
    }).join(" ");
  }

  function drawPosterior(value) {
    const path = curve(value);
    posteriorCurve.setAttribute("d", path);
    posteriorArea.setAttribute("d", path + " L388 84 L12 84 Z");
    plotted = value;
  }

  function updateInference(animate = false) {
    const target = distribution();
    const content = copy[document.documentElement.lang];
    const numbers = new Intl.NumberFormat(document.documentElement.lang, { maximumFractionDigits: 2 });
    const observationLabel = Number(evidence.value) === 1 ? content.observation : content.observations;
    evidenceCount.textContent = evidence.value;
    evidence.setAttribute("aria-valuetext", `${evidence.value} ${observationLabel}`);
    plotDescription.textContent = content.plotDescription
      .replace("{n}", evidence.value)
      .replace("{observations}", observationLabel)
      .replace("{mean}", numbers.format(target.mean))
      .replace("{sd}", numbers.format(target.sd));
    cancelAnimationFrame(animationFrame);
    if (!animate || reducedMotion.matches) {
      drawPosterior(target);
      return;
    }
    const start = plotted;
    const started = performance.now();
    function frame(now) {
      const progress = Math.min(1, (now - started) / 240);
      const eased = 1 - (1 - progress) ** 3;
      drawPosterior({
        mean: start.mean + (target.mean - start.mean) * eased,
        sd: start.sd + (target.sd - start.sd) * eased
      });
      if (progress < 1) animationFrame = requestAnimationFrame(frame);
    }
    animationFrame = requestAnimationFrame(frame);
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
    const portrait = document.querySelector(".sketch");
    portrait.alt = content.portrait;
    portrait.src = language === "fi" ? "portrait-vappu.png" : "portrait-sketch.png?v=watermarked";
    document.querySelector(".stat-note").setAttribute("aria-label", content.bayesLabel);
    document.querySelector(".nav").setAttribute("aria-label", content.detail);
    languagePicker.setAttribute("aria-label", content.language);
    languageButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    const quote = language === "fi" ? proverb : quotes[choice];
    quoteText.textContent = "“" + quote.text + "”";
    quoteSource.textContent = quote.by + " ↗";
    quoteSource.href = quote.url;
    updateInference();
  }

  document.querySelector(".prior-curve").setAttribute("d", curve({ mean: 0, sd: 1 }));
  evidence.addEventListener("input", () => updateInference(true));
  reducedMotion.addEventListener("change", () => updateInference());
  replay.addEventListener("click", () => {
    screen.classList.remove("motion");
    void screen.offsetWidth;
    screen.classList.add("motion");
  });
  render(new URLSearchParams(location.search).get("lang") === "fi" ? "fi" : "en");
  languagePicker.hidden = false;
  inference.hidden = false;
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
