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
      "signalTitle": "From noise to pattern",
      "signalTag": "Illustration",
      "signalHint": "Scattered dots settle into connected layers and a wave, then drift apart.",
      "signalDescription": "An illustration of scattered dots forming connected layers and a wave.",
      "pauseMotion": "Pause motion",
      "resumeMotion": "Resume motion"
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
      "signalTitle": "Kohinasta kuvioksi",
      "signalTag": "Havainnollistus",
      "signalHint": "Hajallaan olevat pisteet muodostavat kerroksia ja aallon, sitten ne hajaantuvat jälleen.",
      "signalDescription": "Havainnollistus pisteistä, jotka muodostavat yhdistettyjä kerroksia ja aallon.",
      "pauseMotion": "Pysäytä liike",
      "resumeMotion": "Jatka liikettä"
    }
  };
  const screen = document.getElementById("warm");
  const replay = document.getElementById("replay");
  const quoteText = document.querySelector(".quote p");
  const quoteSource = document.querySelector(".quote a");
  const languagePicker = document.querySelector(".language");
  const languageButtons = [...document.querySelectorAll("[data-language]")];
  const signalStudy = document.querySelector(".signal-study");
  const signalDescription = document.getElementById("signal-description");
  const signalPoints = document.querySelector(".signal-points");
  const signalLinks = document.querySelector(".signal-links");
  const signalWave = document.querySelector(".signal-wave");
  const portraitStage = document.querySelector(".portrait-stage");
  const contourOffset = document.querySelector(".contour-offset");
  const motionToggle = document.getElementById("motion-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionPaused = false;
  let pointerFrame = 0;
  let signalFrame = 0;
  let lastSignalTime = null;
  let signalElapsed = 0;
  let signalAmount = 0;

  // A fresh visual composition per page load; no visitor identifier or tracking.
  // This is a visual metaphor, not a fitted statistical model or trained network.
  const layers = [
    Array.from({ length: 6 }, (_, i) => ({ x: 24, y: 18 + i * 14 })),
    Array.from({ length: 4 }, (_, i) => ({ x: 112, y: 26 + i * 18 })),
    Array.from({ length: 4 }, (_, i) => ({ x: 200, y: 26 + i * 18 }))
  ];
  const phase = (Math.random() - .5) * .5;
  const amplitude = 17 + Math.random() * 3;
  const wave = Array.from({ length: 25 }, (_, i) => ({
    x: 264 + i * 5.8,
    y: 53 - Math.sin(i / 24 * Math.PI * 2 + phase) * amplitude
  }));
  const points = [...layers.flat(), ...wave].map((target, i) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    element.setAttribute("r", i < 14 ? "2.6" : "1.6");
    element.setAttribute("class", i < 14 ? "layer-node" : "wave-node");
    signalPoints.append(element);
    return { target, origin: { x: 12 + Math.random() * 396, y: 10 + Math.random() * 86 }, element };
  });
  const links = [];
  function link(from, to) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    signalLinks.append(element);
    links.push({ from, to, element });
  }
  // Sparse connections keep the small illustration readable.
  for (let i = 0; i < 6; i++) {
    link(i, 6 + i % 4);
    link(i, 6 + (i + 1) % 4);
  }
  for (let i = 0; i < 4; i++) {
    link(6 + i, 10 + i);
    link(6 + i, 10 + (i + 1) % 4);
    link(10 + i, 14);
  }
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

  function renderSignal(amount = signalAmount) {
    signalAmount = amount;
    const positions = points.map(({ target, origin, element }) => {
      const x = origin.x + (target.x - origin.x) * amount;
      const y = origin.y + (target.y - origin.y) * amount;
      element.setAttribute("cx", x.toFixed(2));
      element.setAttribute("cy", y.toFixed(2));
      return { x, y };
    });
    signalLinks.setAttribute("opacity", String(Math.max(0, (amount - .25) / .75) * .32));
    links.forEach(({ from, to, element }) => {
      element.setAttribute("x1", positions[from].x.toFixed(2));
      element.setAttribute("y1", positions[from].y.toFixed(2));
      element.setAttribute("x2", positions[to].x.toFixed(2));
      element.setAttribute("y2", positions[to].y.toFixed(2));
    });
    signalWave.setAttribute("opacity", String(Math.max(0, (amount - .55) / .45)));
    signalWave.setAttribute("d", positions.slice(14).map(({ x, y }, i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join(" "));
  }

  // An 18-second loop: scatter, gather, rest, disperse. Ease both ends.
  function patternAmount(elapsed) {
    const seconds = (elapsed % 18000) / 1000;
    const ease = value => value * value * (3 - 2 * value);
    if (seconds < 2) return 0;
    if (seconds < 7) return ease((seconds - 2) / 5);
    if (seconds < 10) return 1;
    if (seconds < 15) return 1 - ease((seconds - 10) / 5);
    return 0;
  }

  function animateSignal(time) {
    signalFrame = 0;
    if (lastSignalTime === null) lastSignalTime = time;
    const delta = time - lastSignalTime;
    if (delta >= 1000 / 30) {
      signalElapsed += Math.min(delta, 100);
      lastSignalTime = time;
      renderSignal(patternAmount(signalElapsed));
    }
    signalFrame = requestAnimationFrame(animateSignal);
  }

  function updateSignalMotion() {
    cancelAnimationFrame(signalFrame);
    signalFrame = 0;
    lastSignalTime = null;
    if (reducedMotion.matches) {
      renderSignal(1);
    } else if (!motionPaused && !document.hidden) {
      signalFrame = requestAnimationFrame(animateSignal);
    }
  }

  function resetContours() {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    contourOffset.removeAttribute("transform");
  }

  function renderMotion() {
    screen.classList.toggle("ambient-paused", motionPaused);
    motionToggle.textContent = copy[document.documentElement.lang][motionPaused ? "resumeMotion" : "pauseMotion"];
    motionToggle.hidden = reducedMotion.matches;
    if (reducedMotion.matches || motionPaused) resetContours();
    updateSignalMotion();
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
    document.querySelector(".nav").setAttribute("aria-label", content.detail);
    languagePicker.setAttribute("aria-label", content.language);
    languageButtons.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === language));
    });
    const quote = language === "fi" ? proverb : quotes[choice];
    quoteText.textContent = "“" + quote.text + "”";
    quoteSource.textContent = quote.by + " ↗";
    quoteSource.href = quote.url;
    signalDescription.textContent = content.signalDescription;
    renderSignal();
    renderMotion();
  }

  document.addEventListener("visibilitychange", updateSignalMotion);
  motionToggle.addEventListener("click", () => {
    motionPaused = !motionPaused;
    if (motionPaused) screen.classList.remove("motion");
    renderMotion();
  });
  reducedMotion.addEventListener("change", renderMotion);
  portraitStage.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse" || reducedMotion.matches || motionPaused) return;
    cancelAnimationFrame(pointerFrame);
    const bounds = portraitStage.getBoundingClientRect();
    const x = Math.max(-6, Math.min(6, ((event.clientX - bounds.left) / bounds.width - .5) * 12));
    const y = Math.max(-6, Math.min(6, ((event.clientY - bounds.top) / bounds.height - .5) * 12));
    pointerFrame = requestAnimationFrame(() => {
      contourOffset.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
      pointerFrame = 0;
    });
  });
  portraitStage.addEventListener("pointerleave", resetContours);
  replay.addEventListener("click", () => {
    motionPaused = false;
    renderMotion();
    screen.classList.remove("motion");
    void screen.offsetWidth;
    screen.classList.add("motion");
  });
  render(new URLSearchParams(location.search).get("lang") === "fi" ? "fi" : "en");
  languagePicker.hidden = false;
  signalStudy.hidden = false;
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
