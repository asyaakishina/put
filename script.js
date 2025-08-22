const phrases = [
  { 
    english: "put away", 
    russian: "убирать, отложить, прятать", 
    image: "put away.png" 
  },
  { 
    english: "put down", 
    russian: "положить, отпустить", 
    image: "put down.png" 
  },
  { 
    english: "put forward", 
    russian: "предлагать, выставлять", 
    image: "put forward.png" 
  },
  { 
    english: "put off", 
    russian: "откладывать", 
    image: "put off.png" 
  },
  { 
    english: "put on", 
    russian: "надевать, одевать", 
    image: "put on.png" 
  },
  { 
    english: "put out", 
    russian: "тушить, гасить", 
    image: "put out.png" 
  },
  { 
    english: "put through", 
    russian: "соединить (кого-л) по телефону (с кем-л)", 
    image: "put through1.png" 
  },
  { 
    english: "put up", 
    russian: "устанавливать (палатку)", 
    image: "put up.png" 
  },
  { 
    english: "put up with sth", 
    russian: "смириться, примириться с чем-л.", 
    image: "put up with sth(1).png" 
  }
];


let currentStage = 1; // 1, 2, 3
let currentRound = 0;
let correct = 0;
let total = 0;

const titleEl = document.getElementById("title");
const roundInfoEl = document.getElementById("current-stage");
const imageEl = document.getElementById("phrase-image");
const englishEl = document.getElementById("english-phrase");
const inputEl = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const feedbackEl = document.getElementById("feedback");
const correctEl = document.getElementById("correct-count");
const totalEl = document.getElementById("total-count");

function startStage(stage) {
  currentStage = stage;
  currentRound = 0;
  correct = 0;
  total = 0;
  roundInfoEl.textContent = stage;
  correctEl.textContent = correct;
  totalEl.textContent = total;
  nextRound();
}

function nextRound() {
  if (currentRound >= phrases.length) {
    alert(`Этап ${currentStage} завершён! Правильно: ${correct} из ${phrases.length}`);
    if (currentStage < 3) {
      if (confirm(`Перейти к этапу ${currentStage + 1}?`)) {
        startStage(currentStage + 1);
      }
    } else {
      alert(`🎉 Поздравляю! Ты прошёл все этапы! Всего правильно: ${correct} из ${phrases.length * 3}`);
    }
    return;
  }

  const item = phrases[currentRound];
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  inputEl.value = "";
  inputEl.focus();

  // Этап 1: картинка + английский → вводи русский
  if (currentStage === 1) {
    imageEl.src = item.image;
    imageEl.style.display = "block";
    englishEl.textContent = item.english;
    englishEl.style.display = "block";
  }
  // Этап 2: только картинка → вводи английский
  else if (currentStage === 2) {
    imageEl.src = item.image;
    imageEl.style.display = "block";
    englishEl.style.display = "none";
  }
  // Этап 3: только английский → вводи русский
  else if (currentStage === 3) {
    imageEl.style.display = "none";
    englishEl.textContent = item.english;
    englishEl.style.display = "block";
  }
}

submitBtn.addEventListener("click", checkAnswer);

function checkAnswer() {
  const item = phrases[currentRound];
  const userAnswer = inputEl.value.trim().toLowerCase();
  let isCorrect = false;

  if (currentStage === 1 || currentStage === 3) {
    // Проверяем перевод (русский)
    isCorrect = userAnswer === item.russian.toLowerCase();
  } else if (currentStage === 2) {
    // Проверяем английский
    isCorrect = userAnswer === item.english.toLowerCase();
  }

  if (isCorrect) {
    feedbackEl.textContent = "✅ Правильно!";
    feedbackEl.className = "correct";
    correct++;
  } else {
    feedbackEl.textContent = `❌ Неверно. Правильно: ${currentStage === 2 ? item.english : item.russian}`;
    feedbackEl.className = "wrong";
  }

  correctEl.textContent = correct;
  totalEl.textContent = ++total;
  currentRound++;

  setTimeout(nextRound, 1500);
}

// Запуск игры
startStage(1);