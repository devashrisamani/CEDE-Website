// Function to handle option selection
function selectOption(element) {
  const name = element.name;
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.closest(".option").classList.remove("selected");
  });

  element.closest(".option").classList.add("selected");
  document.getElementById("submit-button").disabled = false;
  console.log(`Option selected: ${element.value}`);
}

// Function to go back
function goBack() {
  window.location.href = "collectdata.html";
}

// Function to get recommendation based on user responses
function getRecommendation(rules) {
  const userResponses = {
    muscle_comparison: document.querySelector('input[name="q1"]:checked')
      ?.value,
    session_comparison: document.querySelector('input[name="q2"]:checked')
      ?.value,
    group_comparison: document.querySelector('input[name="q3"]:checked')?.value,
    perform_mvc: document.querySelector('input[name="q3a"]:checked')?.value,
  };

  console.log("User responses:", userResponses);

  if (!rules) {
    console.error("Rules data is not defined");
    alert("Rules data is not available");
    return;
  }

  const rule = rules.find(
    (rule) =>
      rule.muscle_comparison === userResponses.muscle_comparison &&
      rule.session_comparison === userResponses.session_comparison &&
      rule.group_comparison === userResponses.group_comparison &&
      rule.perform_mvc === userResponses.perform_mvc
  );

  if (rule) {
    console.log("Recommendation found:", rule.recommendation);
    localStorage.setItem("recommendation", rule.recommendation);
    window.location.href = "recommendation.html";
  } else {
    console.log("No recommendation found for the given responses.");
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
    .then((rules) => {
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
        getRecommendation(rules);
      });

      console.log("Event listeners attached");
    })
    .catch((error) => {
      console.error("Error fetching rules.json:", error);
    });
});
