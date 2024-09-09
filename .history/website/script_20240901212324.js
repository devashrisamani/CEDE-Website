let rules = []; // Ensure this is defined globally

// Mapping for user-selected values to JSON values
const valueMapping = {
  "Comparisons between muscles (e.g. vastus lateralis vs. vastus medialis during knee extension task)":
    "Between muscles",
  "Comparisons within a muscle (e.g. vastus lateralis pre and post intervention)":
    "Within muscle",
  Both: "Both",
  "Comparisons between sessions (e.g. repeated measures in different time points)":
    "Between sessions",
  "Comparisons within a session (e.g. comparisons of two tasks during a laboratory session)":
    "Within a session",
  "Comparisons between participant groups (e.g. pain condition vs. control group)":
    "Between-groups comparison",
  "Comparisons within a participant group (e.g. knee extension at 10% and 50% of MVC in healthy individuals)":
    "Within-group comparison",
  Yes: "Yes",
  "No (Change the color of #.1 and #.2 methods to grey and not allow them to click to it)":
    "No (Change the color of #.1 and #.2 methods to grey and not allow them to click to it)",
};

// Function to handle option selection
function selectOption(element) {
  const name = element.name;
  // Remove 'selected' class from all options of the same group
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.closest(".option").classList.remove("selected");
  });

  // Add 'selected' class to the clicked option
  element.closest(".option").classList.add("selected");

  // Check if all questions are answered to enable the submit button
  const allAnswered =
    document.querySelectorAll('input[type="radio"]:checked').length === 4;
  const submitButton = document.getElementById("submit-button");
  if (submitButton) {
    submitButton.disabled = !allAnswered;
  }
}

// Function to go back
function goBack() {
  window.location.href = "collectdata.html";
}

// Function to get recommendation based on user responses
function getRecommendation() {
  const q1Value = document
    .querySelector('input[name="q1"]:checked')
    ?.value.trim();
  const q2Value = document
    .querySelector('input[name="q2"]:checked')
    ?.value.trim();
  const q3Value = document
    .querySelector('input[name="q3"]:checked')
    ?.value.trim();
  const q3aValue = document
    .querySelector('input[name="q3a"]:checked')
    ?.value.trim();

  // Ensure the values are exactly as expected in the mapping
  const mappedQ1 = valueMapping[q1Value] || `Unmapped value: ${q1Value}`;
  const mappedQ2 = valueMapping[q2Value] || `Unmapped value: ${q2Value}`;
  const mappedQ3 = valueMapping[q3Value] || `Unmapped value: ${q3Value}`;
  const mappedQ3a = valueMapping[q3aValue] || `Unmapped value: ${q3aValue}`;

  // Map the longer user-selected values to the shorter JSON rule values
  const userResponses = {
    muscle_comparison: mappedQ1,
    session_comparison: mappedQ2,
    group_comparison: mappedQ3,
    perform_mvc: mappedQ3a,
  };

  const matchingRule = rules.find((rule) => {
    return (
      rule.muscle_comparison === userResponses.muscle_comparison &&
      rule.session_comparison === userResponses.session_comparison &&
      rule.group_comparison === userResponses.group_comparison &&
      rule.perform_mvc === userResponses.perform_mvc
    );
  });

  if (matchingRule) {
    localStorage.setItem("recommendation", matchingRule.recommendation);
    window.location.href = "recommendation.html";
  } else {
    console.log(
      "No recommendation found for the given responses:",
      userResponses
    );
  }
}

// Event listener for document load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");

  // Fetch the rules.json file
  fetch("rules.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((loadedRules) => {
      rules = loadedRules; // Assign the loaded rules to the global variable

      // Attach event listeners to form elements
      document.querySelectorAll('input[name="q1"]').forEach((input) => {
        input.addEventListener("change", () => selectOption(input));
      });

      document.querySelectorAll('input[name="q2"]').forEach((input) => {
        input.addEventListener("change", () => selectOption(input));
      });

      document.querySelectorAll('input[name="q3"]').forEach((input) => {
        input.addEventListener("change", () => selectOption(input));
      });

      document.querySelectorAll('input[name="q3a"]').forEach((input) => {
        input.addEventListener("change", () => selectOption(input));
      });
    })
    .catch((error) => {
      console.error("Error fetching rules.json:", error);
    });
});

// Function to display the recommendation on the recommendation.html page
function displayRecommendation() {
  const recommendationText = localStorage.getItem("recommendation");
  if (recommendationText) {
    document.getElementById("recommendation-text").textContent =
      recommendationText;
  } else {
    document.getElementById("recommendation-text").textContent =
      "No recommendation found.";
  }
}

// Ensure the function runs only on the recommendation page
if (window.location.pathname.includes("recommendation.html")) {
  document.addEventListener("DOMContentLoaded", displayRecommendation);
}
