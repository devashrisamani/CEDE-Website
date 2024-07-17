function selectOption(option) {
  console.log("Option selected:", option);
}

function selectOption(option) {
  console.log("Option selected:", option);
}

function goBack() {
  window.history.back();
}

// Decision tree functions

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
