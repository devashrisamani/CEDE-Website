let rules = [];

// Function to handle option selection
function selectOption(element) {
  const name = element.name;
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.closest(".option").classList.remove("selected");
  });

  element.closest(".option").classList.add("selected");

  // Check if all questions are answered to enable the submit button
  const allAnswered =
    document.querySelectorAll('input[type="radio"]:checked').length === 4;
  document.getElementById("submit-button").disabled = !allAnswered;
}

// Function to go back
function goBack() {
  window.location.href = "collectdata.html";
}

// Function to get recommendation based on user responses
function getRecommendation() {
  const userResponses = {
    muscle_comparison: document.querySelector('input[name="q1"]:checked')
      ?.value,
    session_comparison: document.querySelector('input[name="q2"]:checked')
      ?.value,
    group_comparison: document.querySelector('input[name="q3"]:checked')?.value,
    perform_mvc: document.querySelector('input[name="q3a"]:checked')?.value,
  };

  console.log("User responses:", userResponses);

  // Trim the responses to remove any extra whitespace and standardize case
  for (let key in userResponses) {
    if (userResponses[key]) {
      userResponses[key] = userResponses[key].trim();
    }
  }

  let matchingRule = undefined;

  for (const rule of rules) {
    console.log("Checking rule:", rule);
    if (
      rule.muscle_comparison.trim() === userResponses.muscle_comparison &&
      rule.session_comparison.trim() === userResponses.session_comparison &&
      rule.group_comparison.trim() === userResponses.group_comparison &&
      rule.perform_mvc.trim() === userResponses.perform_mvc
    ) {
      matchingRule = rule;
      break;
    }
  }

  console.log("Matching rule:", matchingRule);

  if (matchingRule) {
    localStorage.setItem("recommendation", matchingRule.recommendation);
    window.location.href = "recommendation.html";
  } else {
    alert("No recommendation found for the given responses.");
  }
}

// Event listener for document load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");
  fetch("rules.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Fetching rules.json successful");
      return response.json();
    })
    .then((data) => {
      rules = data;
      console.log("Rules data loaded:", rules);
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

      document.getElementById("submit-button").addEventListener("click", () => {
        getRecommendation();
      });

      console.log("Event listeners attached");
    })
    .catch((error) => {
      console.error("Error fetching rules.json:", error);
    });
});