//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
// Your JS code here

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Retrieve progress from sessionStorage (if any)
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Retrieve last score from localStorage (if any)
let lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreElement.innerText = `Your score is ${lastScore} out of ${questions.length}.`;
}

// Render questions and persist checked answers
function renderQuestions() {
  questionsElement.innerHTML = ""; // reset

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Add question text
    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionElement.appendChild(questionText);

    // Create choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore checked answers from session storage
     if (userAnswers[i] === choice) {
  choiceElement.checked = true;
  choiceElement.setAttribute("checked", "true"); // ✅ ensures Cypress sees it
}

choiceElement.addEventListener("change", (e) => {
  userAnswers[i] = choice;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));

  // Clear previous checked attributes for this question
  document.querySelectorAll(`input[name="question-${i}"]`)
    .forEach((el) => el.removeAttribute("checked"));

  // Add checked attribute to the newly selected radio
  e.target.setAttribute("checked", "true");
});


      const choiceLabel = document.createElement("label");
      choiceLabel.innerText = choice;

      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Calculate and store score
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;

  // Store score in localStorage
  localStorage.setItem("score", score);
});

// Initial render
renderQuestions();
