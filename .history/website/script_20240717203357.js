let rules = []; // Ensure this is defined globally

// Mapping object
const responseMapping = {
  "Comparisons between muscles (e.g. vastus lateralis vs. vastus medialis during knee extension task)":
    "Between muscles",
  "Comparisons within a muscle (e.g. vastus lateralis pre and post intervention)":
    "Within muscle",
  Both: "Both",
  "Comparisons between sessions (e.g. repeated measures in different time points)":
    "Between sessions",
  "Comparisons within a session (e.g. comparisons of two tasks during a laboratory session)":
    "Within session",
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
  const q1Value = document.querySelector('input[name="q1"]:checked')?.value;
  const q2Value = document.querySelector('input[name="q2"]:checked')?.value;
  const q3Value = document.querySelector('input[name="q3"]:checked')?.value;
  const q3aValue = document.querySelector('input[name="q3a"]:checked')?.value;

  console.log("q1 value:", q1Value);
  console.log("q2 value:", q2Value);
  console.log("q3 value:", q3Value);
  console.log("q3a value:", q3aValue);

  // Log the responseMapping to ensure it is correct
  console.log("responseMapping:", responseMapping);

  // Check if the values exist in the responseMapping
  console.log("Mapped q1 value:", responseMapping[q1Value]);
  console.log("Mapped q2 value:", responseMapping[q2Value]);
  console.log("Mapped q3 value:", responseMapping[q3Value]);
  console.log("Mapped q3a value:", responseMapping[q3aValue]);

  const userResponses = {
    muscle_comparison: responseMapping[q1Value],
    session_comparison: responseMapping[q2Value],
    group_comparison: responseMapping[q3Value],
    perform_mvc: responseMapping[q3aValue],
  };

  console.log("User responses:", userResponses);
  console.log("Rules available:", rules);

  const matchingRule = rules.find((rule) => {
    console.log("Checking rule:", rule);
    return (
      rule.muscle_comparison === userResponses.muscle_comparison &&
      rule.session_comparison === userResponses.session_comparison &&
      rule.group_comparison === userResponses.group_comparison &&
      rule.perform_mvc === userResponses.perform_mvc
    );
  });

  console.log("Matching rule:", matchingRule);

  if (matchingRule) {
    localStorage.setItem("recommendation", matchingRule.recommendation);
    window.location.href = "recommendation.html";
  } else {
    console.log(
      "No recommendation found for the given responses:",
      userResponses
    );
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
    .then((loadedRules) => {
      console.log("Rules data loaded:", loadedRules);
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

      document.getElementById("submit-button").addEventListener("click", () => {
        getRecommendation();
      });

      console.log("Event listeners attached");
    })
    .catch((error) => {
      console.error("Error fetching rules.json:", error);
    });
});
