// Function to get recommendation based on user responses
function getRecommendation() {
  const userResponses = {
    muscle_comparison:
      responseMapping[
        document.querySelector('input[name="q1"]:checked')?.value
      ],
    session_comparison:
      responseMapping[
        document.querySelector('input[name="q2"]:checked')?.value
      ],
    group_comparison:
      responseMapping[
        document.querySelector('input[name="q3"]:checked')?.value
      ],
    perform_mvc:
      responseMapping[
        document.querySelector('input[name="q3a"]:checked')?.value
      ],
  };

  console.log("User responses:", userResponses);
  console.log("Rules available:", rules);

  const matchingRule = rules.find((rule) => {
    console.log("Checking rule:", rule);
    console.log("Comparing:", {
      rule_muscle: rule.muscle_comparison,
      user_muscle: userResponses.muscle_comparison,
      rule_session: rule.session_comparison,
      user_session: userResponses.session_comparison,
      rule_group: rule.group_comparison,
      user_group: userResponses.group_comparison,
      rule_mvc: rule.perform_mvc,
      user_mvc: userResponses.perform_mvc,
    });
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
