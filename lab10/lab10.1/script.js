function checkAnswer(buttonElement, isCorrect) {
  const resultText = buttonElement.parentElement.nextElementSibling;
  
  if (isCorrect) {
    resultText.textContent = 'Правильно! 👍';
    resultText.style.color = '#2e7d32';
  } else {
    resultText.textContent = 'Неверно, попробуйте ещё раз! ❌';
    resultText.style.color = '#c2185b';
  }
}

const regexRules = {
  fullname: /^[A-Za-zА-Яа-яЁё\s-]+$/,
  
  phone: /^\+?[0-9]{9,15}$/,
  
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};

function validateField(inputElement, regex, errorElement) {
  if (!inputElement) return false;
  
  const value = inputElement.value.trim();
  const isValid = regex.test(value);

  if (isValid) {
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
    if (errorElement) errorElement.style.display = 'none';
  } else {
    inputElement.classList.remove('valid');
    inputElement.classList.add('invalid');
    if (errorElement) errorElement.style.display = 'block';
  }

  return isValid;
}


document.addEventListener('DOMContentLoaded', () => {

  const toggleButtons = document.querySelectorAll('.toggle-btn');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const contents = document.querySelectorAll('.tab-content');
      contents.forEach(content => content.classList.remove('active'));

      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  const form = document.getElementById('contactForm');
  const fullnameInput = document.getElementById('fullname');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');

  const fullnameError = document.getElementById('fullnameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');

  if (form) {
    if (fullnameInput) {
      fullnameInput.addEventListener('input', () => {
        validateField(fullnameInput, regexRules.fullname, fullnameError);
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        validateField(phoneInput, regexRules.phone, phoneError);
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        validateField(emailInput, regexRules.email, emailError);
      });
    }

    form.addEventListener('submit', (e) => {
      const isFullnameValid = validateField(fullnameInput, regexRules.fullname, fullnameError);
      const isPhoneValid = validateField(phoneInput, regexRules.phone, phoneError);
      const isEmailValid = validateField(emailInput, regexRules.email, emailError);

      if (!isFullnameValid || !isPhoneValid || !isEmailValid) {
        e.preventDefault(); 
        alert('Пожалуйста, заполни корректно все поля!');
      }
    });
  }
});






document.addEventListener("mousemove", function(event) {

  let dot = document.createElement("div");

  dot.className = "dot";
  dot.style.left = event.clientX + "px";
  dot.style.top = event.clientY + "px";

  document.body.appendChild(dot);

  setTimeout(function() {
      dot.remove();
  }, 600);

});



let links = document.querySelectorAll("a");

links.forEach(function(link) {

  link.addEventListener("click", function() {

      if (link.href.includes(".html")) {
          sessionStorage.setItem("firework", "yes");
      }

  });

});



if (sessionStorage.getItem("firework") === "yes") {

  sessionStorage.removeItem("firework");

  for (let j = 0; j < 5; j++) {

      let centerX = Math.random() * window.innerWidth;
      let centerY = Math.random() * window.innerHeight / 2;

      for (let i = 0; i < 20; i++) {

          let spark = document.createElement("div");

          spark.className = "firework";

          spark.style.left = centerX + "px";
          spark.style.top = centerY + "px";

          let angle = Math.PI * 2 * i / 20;
          let distance = 60 + Math.random() * 60;

          spark.style.setProperty("--x",
              Math.cos(angle) * distance + "px");

          spark.style.setProperty("--y",
              Math.sin(angle) * distance + "px");

          let colors = ["red", "yellow", "blue", "purple", "pink"];

          spark.style.background =
              colors[Math.floor(Math.random() * colors.length)];

          document.body.appendChild(spark);

          setTimeout(function() {
              spark.remove();
          }, 1000);

      }
  }
}



let buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {

  button.addEventListener("click", function(event) {

      let x = event.clientX;
      let y = event.clientY;

      for (let i = 0; i < 15; i++) {

          let spark = document.createElement("div");

          spark.className = "spark";

          spark.style.left = x + "px";
          spark.style.top = y + "px";

          let angle = Math.PI * 2 * i / 15;
          let distance = 30 + Math.random() * 50;

          spark.style.setProperty("--x",
              Math.cos(angle) * distance + "px");

          spark.style.setProperty("--y",
              Math.sin(angle) * distance + "px");

          document.body.appendChild(spark);

          setTimeout(function() {
              spark.remove();
          }, 600);

      }

  });

});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    if (localStorage.getItem("siteTheme") === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.textContent = "☀️ Пастельная тема";
    }
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      themeToggle.textContent = isDark ? "☀️ Пастельная тема" : "🌙 Тёмная тема";
      localStorage.setItem("siteTheme", isDark ? "dark" : "light");
    });
  }

  const tenseCheckboxes = document.querySelectorAll(".tense-checkbox");
  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");
  const savedStudy = JSON.parse(localStorage.getItem("studiedTenses") || "{}");

  function refreshProgress() {
    if (!tenseCheckboxes.length) return;
    let count = 0;
    tenseCheckboxes.forEach((cb) => {
      const id = cb.dataset.id;
      const link = cb.nextElementSibling;
      if (cb.checked) {
        count++;
        savedStudy[id] = true;
        if (link) link.classList.add("studied");
      } else {
        delete savedStudy[id];
        if (link) link.classList.remove("studied");
      }
    });
    localStorage.setItem("studiedTenses", JSON.stringify(savedStudy));
    const pct = Math.round((count / tenseCheckboxes.length) * 100);
    if (progressText) progressText.textContent = `${count} из ${tenseCheckboxes.length} (${pct}%)`;
    if (progressFill) progressFill.style.width = `${pct}%`;
  }

  tenseCheckboxes.forEach((cb) => {
    if (savedStudy[cb.dataset.id]) cb.checked = true;
    cb.addEventListener("change", refreshProgress);
  });
  refreshProgress();

  const phrasesList = [
    {
      en: "She has been working here since 2021.",
      ru: "Она работает здесь с 2021 года.",
      tense: "Present Perfect Continuous",
      note: "Действие началось в прошлом и продолжается до сих пор (маркер: since)."
    },
    {
      en: "When I called him, he was watching a movie.",
      ru: "Когда я ему позвонил, он смотрел фильм.",
      tense: "Past Continuous",
      note: "Длительное действие в прошлом в момент другого действия."
    },
    {
      en: "By the time we arrived, the concert had already started.",
      ru: "К тому моменту, как мы приехали, концерт уже начался.",
      tense: "Past Perfect",
      note: "Действие завершилось раньше другого действия в прошлом."
    },
    {
      en: "This time next week I will be swimming in the sea.",
      ru: "В это же время на следующей неделе я буду плавать в море.",
      tense: "Future Continuous",
      note: "Процесс в конкретный момент в будущем (маркер: this time next week)."
    },
    {
      en: "The sun rises in the east.",
      ru: "Солнце встаёт на востоке.",
      tense: "Present Simple",
      note: "Постоянный факт и закон природы."
    }
  ];

  const newPhraseBtn = document.getElementById("newPhraseBtn");
  function renderRandomPhrase() {
    const p = phrasesList[Math.floor(Math.random() * phrasesList.length)];
    if (document.getElementById("phraseEn")) {
      document.getElementById("phraseEn").textContent = p.en;
      document.getElementById("phraseRu").textContent = p.ru;
      document.getElementById("phraseTense").textContent = p.tense;
      document.getElementById("phraseNote").textContent = p.note;
    }
  }
  renderRandomPhrase();
  if (newPhraseBtn) newPhraseBtn.addEventListener("click", renderRandomPhrase);

  const markerInput = document.getElementById("markerSearchInput");
  const searchStatus = document.getElementById("searchStatus");
  const tenseListItems = document.querySelectorAll(".home-links li");
  const filterCatBtns = document.querySelectorAll(".filter-cat-btn");
  const catCards = document.querySelectorAll(".category-card");

  if (markerInput) {
    markerInput.addEventListener("input", () => {
      const val = markerInput.value.trim().toLowerCase();
      let found = 0;

      tenseListItems.forEach((li) => {
        const markers = li.dataset.markers || "";
        const name = li.textContent.toLowerCase();
        if (val.length >= 2 && (markers.includes(val) || name.includes(val))) {
          li.classList.add("highlight-match");
          found++;
        } else {
          li.classList.remove("highlight-match");
        }
      });

      if (val.length < 2) {
        searchStatus.textContent = "";
      } else if (found > 0) {
        searchStatus.textContent = `Найдено времён: ${found} (подсвечены в карточках ниже).`;
      } else {
        searchStatus.textContent = "Ничего не найдено. Попробуйте: yesterday, already, now, tomorrow, since.";
      }
    });
  }

  filterCatBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterCatBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      catCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  const quizQuestions = [
    {
      q: "1. She ___ to the gym every Monday.",
      options: ["go", "goes", "is going"],
      correct: 1,
      explanation: "Present Simple: регулярное действие (маркер «every Monday»). Для местоимения she к глаголу добавляется окончание -es."
    },
    {
      q: "2. Look! It ___ outside right now.",
      options: ["rains", "rained", "is raining"],
      correct: 2,
      explanation: "Present Continuous: действие происходит прямо в момент речи (маркеры «Look!» и «right now»)."
    },
    {
      q: "3. We ___ this movie yesterday.",
      options: ["watched", "have watched", "watch"],
      correct: 0,
      explanation: "Past Simple: действие полностью завершилось в прошлом, указано точное время (маркер «yesterday»)."
    },
    {
      q: "4. I ___ my homework yet.",
      options: ["didn't finish", "haven't finished", "don't finish"],
      correct: 1,
      explanation: "Present Perfect: результат к настоящему моменту. Слово «yet» в отрицаниях указывает на Present Perfect."
    },
    {
      q: "5. Tomorrow at 5 PM I ___ a book.",
      options: ["will read", "will be reading", "read"],
      correct: 1,
      explanation: "Future Continuous: длительный процесс в конкретный момент в будущем (маркер «Tomorrow at 5 PM»)."
    }
  ];

  let qIndex = 0;
  let userAnswers = [];
  let elapsedSeconds = 0;
  let quizInterval = null;

  const startQuizBtn = document.getElementById("startQuizBtn");
  const restartQuizBtn = document.getElementById("restartQuizBtn");
  const quizTimerEl = document.getElementById("quizTimer");
  const quizStartBlock = document.getElementById("quizStartBlock");
  const quizActiveBlock = document.getElementById("quizActiveBlock");
  const quizResultBlock = document.getElementById("quizResultBlock");

  function formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    if (mins > 0) {
      return `${mins} мин. ${secs} сек.`;
    }
    return `${secs} сек.`;
  }

  function startTimedQuiz() {
    qIndex = 0;
    userAnswers = [];
    elapsedSeconds = 0;
    quizTimerEl.textContent = `Время: 0 сек.`;

    quizStartBlock.style.display = "none";
    quizResultBlock.style.display = "none";
    quizActiveBlock.style.display = "block";

    clearInterval(quizInterval);
    quizInterval = setInterval(() => {
      elapsedSeconds++;
      quizTimerEl.textContent = `Время: ${formatTime(elapsedSeconds)}`;
    }, 1000);

    showQuizQuestion();
  }

  function showQuizQuestion() {
    const current = quizQuestions[qIndex];
    document.getElementById("quizQuestionText").textContent = current.q;
    const optionsList = document.getElementById("quizOptionsList");
    optionsList.innerHTML = "";

    current.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        userAnswers[qIndex] = i;
        qIndex++;
        if (qIndex < quizQuestions.length) {
          showQuizQuestion();
        } else {
          finishTimedQuiz();
        }
      });
      optionsList.appendChild(btn);
    });
  }

  function finishTimedQuiz() {
    clearInterval(quizInterval);
    quizActiveBlock.style.display = "none";
    quizResultBlock.style.display = "block";

    let score = 0;
    const reviewList = document.getElementById("quizReviewList");
    reviewList.innerHTML = "";

    quizQuestions.forEach((item, idx) => {
      const chosen = userAnswers[idx];
      const isCorrect = chosen === item.correct;
      if (isCorrect) score++;

      const div = document.createElement("div");
      div.className = `review-item ${isCorrect ? "correct" : "wrong"}`;

      const chosenText = chosen !== undefined ? item.options[chosen] : "Нет ответа";
      const rightText = item.options[item.correct];

      div.innerHTML = isCorrect
        ? `<strong>${item.q}</strong><br>
           Ваш ответ: <b>${chosenText}</b> ✅<br>
           <span style="display:block; margin-top:6px; font-size:0.9rem;">💡 <i>Объяснение:</i> ${item.explanation}</span>`
        : `<strong>${item.q}</strong><br>
           Ваш ответ: <b>${chosenText}</b> ❌ (Правильно: <b>${rightText}</b>)<br>
           <span style="display:block; margin-top:6px; font-size:0.9rem;">💡 <i>Объяснение:</i> ${item.explanation}</span>`;

      reviewList.appendChild(div);
    });

    document.getElementById("quizFinalScore").textContent =
      `Тест пройден за ${formatTime(elapsedSeconds)}! Правильных ответов: ${score} из ${quizQuestions.length}`;
  }

  if (startQuizBtn) startQuizBtn.addEventListener("click", startTimedQuiz);
  if (restartQuizBtn) restartQuizBtn.addEventListener("click", startTimedQuiz);
});