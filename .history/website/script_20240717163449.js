// Load the JSON data
fetch('rules.json')
  .then(response => response.json())
  .then(data => {
    const rules = data;

    // Function to handle option selection
    function selectOption(element) {
      const name = element.name;
      document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
        input.closest(".option").classList.remove("selected");
      });

      element.closest(".option").classList.add("selected");
      document.getElementById("submit-button").disabled = false;
    }
// function selectOption(option) {
//   console.log("Option selected:", option);
// }

// function selectOption(option) {
//   console.log("Option selected:", option);
// }

// function goBack() {
//   window.history.back();
// }

// Decision tree functions

function selectOption(element) {
  const name = element.name;
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.closest(".option").classList.remove("selected");
  });

  element.closest(".option").classList.add("selected");
  document.getElementById("submit-button").disabled = false;
}

function goBack() {
  window.location.href = "collectdata.html";
}

const rules = [
  {
    conditions: [
      { question: "q1", answer: "Within muscle" },
      { question: "q2", answer: "Within session" },
      { question: "q3", answer: "Within group" },
      { question: "q3a", answer: "Yes" },
    ],
    recommendation:
      "Experimental context 1: Amplitude comparison within a person and muscle, between conditions/tasks (within a session). *Without removing electrodes (1.1 - 1.6)",
  },
  {
    conditions: [
      { question: "q1", answer: "Within muscle" },
      { question: "q2", answer: "Within session" },
      { question: "q3", answer: "Within group" },
      { question: "q3a", answer: "No" },
    ],
    recommendation: "Disable methods #1 and #2",
  },
  // Add more rules here
];

function getRecommendation() {
  const userResponses = [
    {
      question: "q1",
      answer: document.querySelector('input[name="q1"]:checked')?.value,
    },
    {
      question: "q2",
      answer: document.querySelector('input[name="q2"]:checked')?.value,
    },
    {
      question: "q3",
      answer: document.querySelector('input[name="q3"]:checked')?.value,
    },
    {
      question: "q3a",
      answer: document.querySelector('input[name="q3a"]:checked')?.value,
    },
  ];

  for (let rule of rules) {
    if (
      rule.conditions.every((condition) =>
        userResponses.some(
          (response) =>
            response.question === condition.question &&
            response.answer === condition.answer
        )
      )
    ) {
      localStorage.setItem("recommendation", rule.recommendation);
      window.location.href = "recommendation.html";
      return;
    }
  }

  alert("No recommendation found for the given responses.");
}

// CEDE Collaborations section

function showSection(sectionId) {
  const sections = document.querySelectorAll(".team-section");
  const buttons = document.querySelectorAll(".btn-toggle");
  sections.forEach((section) => {
    section.classList.add("d-none");
  });
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(sectionId).classList.remove("d-none");
  document
    .querySelector(`button[onclick="showSection('${sectionId}')"]`)
    .classList.add("active");
}

function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector(".faq-icon");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    icon.textContent = "+";
  } else {
    answer.style.display = "block";
    icon.textContent = "-";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("faq-search");
  const searchButton = document.getElementById("search-button");

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {
      const questionText = item
        .querySelector(".faq-question span")
        .innerText.toLowerCase();
      const answerText = item
        .querySelector(".faq-answer p")
        .innerText.toLowerCase();

      if (
        questionText.includes(searchTerm) ||
        answerText.includes(searchTerm)
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", performSearch);
  searchButton.addEventListener("click", performSearch);
});
