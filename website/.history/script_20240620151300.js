function selectOption(option) {
  console.log("Option selected:", option);
  // Add logic to handle the selected option, such as updating the page content
}

// page 2

function selectOption(option) {
  console.log("Option selected:", option);
  // Here, you can redirect to another page or load new content based on the option
}

function goBack() {
  window.history.back(); // This will take you to the previous page in the history stack
}

// Decision tree functions
const questions = [
  "Does your experiment involve comparisons between muscles or within muscles?",
  "Does your experiment involve comparisons between sessions or within a session?",
  "Does your experiment involve within-group comparisons or between-groups comparisons?",
  "Can your participants perform MVC?",
];

const responses = [
  ["Between muscles", "Within muscle"],
  ["Between sessions", "Within a session"],
  ["Within-group comparison", "Between-groups comparison"],
  ["Yes", "No"],
];

const decisionTree = {
  "Within muscle": {
    "Within a session": {
      "Within-group comparison": {
        Yes: "Experimental context 1: Amplitude comparison within a person and muscle, between conditions/tasks (within a session). *Without removing electrodes (1.1 - 1.6)",
      },
    },
  },
};

function getRecommendation(responses) {
  let node = decisionTree;
  for (let response of responses) {
    if (node[response]) {
      node = node[response];
    } else {
      return "No recommendation found for the given responses.";
    }
  }
  return node;
}

document.getElementById("get-recommendation").addEventListener("click", () => {
  const userResponses = [
    document.getElementById("q1-select").value,
    document.getElementById("q2-select").value,
    document.getElementById("q3-select").value,
    document.getElementById("q4-select").value,
  ];
  const recommendation = getRecommendation(userResponses);
  document.getElementById("recommendation").innerText = recommendation;
});

// disabled submit button

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("question-form");
  const submitButton = document.getElementById("submit-button");
  const options = form.querySelectorAll(".option");

  options.forEach((option) => {
    option.addEventListener("click", function () {
      option.classList.toggle("selected");
      checkIfAllQuestionsAnswered();
    });
  });

  function checkIfAllQuestionsAnswered() {
    const allAnswered = document.querySelectorAll(".selected").length >= 3;
    submitButton.disabled = !allAnswered;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle form submission logic here
    document.getElementById("recommendation").innerText =
      "Your recommendation text here";
  });
});

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
