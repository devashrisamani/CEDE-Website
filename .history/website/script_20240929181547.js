// Function for the collaborator toggle on the index page
function showSection(sectionId) {
  // Hide all sections
  document.getElementById("leads").classList.add("d-none");
  document.getElementById("members").classList.add("d-none");
  document.getElementById("collaborators").classList.add("d-none");

  // Show the selected section
  document.getElementById(sectionId).classList.remove("d-none");

  // Remove 'active' class from all buttons
  var buttons = document.querySelectorAll(".btn-toggle");
  buttons.forEach(function (button) {
    button.classList.remove("active");
  });

  // Add 'active' class to the clicked button
  event.target.classList.add("active");
}

// import "constants.js";
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
// function selectOption(element) {
//   const name = element.name;
//   document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
//     input.closest(".option").classList.remove("selected");
//   });

//   element.closest(".option").classList.add("selected");

//   // Check if all questions are answered to enable the submit button
//   const allAnswered =
//     document.querySelectorAll('input[type="radio"]:checked').length === 4;
//   document.getElementById("submit-button").disabled = !allAnswered;
// }

// function selectOption(element) {
//   const inputElement = element.querySelector('input[type="radio"]');

//   if (inputElement) {
//     inputElement.checked = true; // Check the radio button
//     const name = inputElement.name;

//     // Remove 'selected' class from all options with the same name
//     document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
//       input.closest(".option").classList.remove("selected");
//     });

//     // Add 'selected' class to the clicked option
//     element.classList.add("selected");

//     // Check if the selected option is "Synergies" and redirect to the recommendation page
//     if (inputElement.value === "synergies") {
//       localStorage.setItem(
//         "recommendation",
//         "Experimental context 4. Identification of muscle synergies (also called motor modules/ primitives) using methods such as non-negative matrix factorization"
//       );
//       window.location.href = "recommendation.html"; // Redirect to the recommendation page
//     }

//   }
// }

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

  console.log("q1 value:", q1Value);
  console.log("q2 value:", q2Value);
  console.log("q3 value:", q3Value);
  console.log("q3a value:", q3aValue);

  // Ensure the values are exactly as expected in the mapping
  const mappedQ1 = valueMapping[q1Value] || `Unmapped value: ${q1Value}`;
  const mappedQ2 = valueMapping[q2Value] || `Unmapped value: ${q2Value}`;
  const mappedQ3 = valueMapping[q3Value] || `Unmapped value: ${q3Value}`;
  const mappedQ3a = valueMapping[q3aValue] || `Unmapped value: ${q3aValue}`;

  console.log("Mapped q1 value:", mappedQ1);
  console.log("Mapped q2 value:", mappedQ2);
  console.log("Mapped q3 value:", mappedQ3);
  console.log("Mapped q3a value:", mappedQ3a);

  // Map the longer user-selected values to the shorter JSON rule values
  const userResponses = {
    muscle_comparison: mappedQ1,
    session_comparison: mappedQ2,
    group_comparison: mappedQ3,
    perform_mvc: mappedQ3a,
  };

  // const userResponses = {
  //   muscle_comparison: "Between muscles",
  //   session_comparison: "Between sessions",
  //   group_comparison: "Between-groups comparison",
  //   perform_mvc:
  //     "No (Change the color of #.1 and #.2 methods to grey and not allow them to click to it)",
  // };

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
    //alert("No recommendation found for the given responses.");
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
