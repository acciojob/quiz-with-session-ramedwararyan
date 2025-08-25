// Do not change code below this line
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

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");

// Restore answers from localStorage
function restoreAnswers() {
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  Object.entries(savedAnswers).forEach(([qIndex, choice]) => {
    const input = document.querySelector(
      `input[name="question-${qIndex}"][value="${choice}"]`
    );
    if (input) {
      input.checked = true;
    }
  });

  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}`;
  }
}

// Display quiz questions
function renderQuestions() {
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Save answer when clicked
      input.addEventListener("change", () => {
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
        savedAnswers[i] = input.value;
        localStorage.setItem("answers", JSON.stringify(savedAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Calculate score
function calculateScore() {
  let score = 0;

  questions.forEach((q, i) => {
    const selected = document.querySelector(
      `input[name="question-${i}"]:checked`
    );
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score); // ✅ store score in localStorage
}

document.getElementById("submit").addEventListener("click", calculateScore);

renderQuestions();
restoreAnswers();
