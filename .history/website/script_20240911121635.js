<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Temporal Features - CEDE</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
    <link rel="stylesheet" href="features.css" />
    <style>
      #wrapper {
        width: 100%;
        text-align: center;
      }
      .question-container {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
      }
      .question h3 {
        margin-top: 0;
      }
      .question label {
        display: block;
        margin-bottom: 10px;
      }
      .option {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        margin-bottom: 10px;
        padding: 10px;
        cursor: pointer;
        background-color: white;
        color: #5f5f5f;
      }
      .option:hover {
        background-color: #f0f0f0;
      }
      .option input[type="radio"] {
        display: none;
      }
      .option.selected {
        background-color: #d4edda;
        border-color: #c3e6cb;
      }

      .label {
        font-size: 1.1em;
        font-weight: bold;
        color: #4a4a4a;
      }

      button {
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 30px;
        border: 2px solid #007bff;
        background-color: white;
        color: #007bff;
        text-transform: uppercase;
      }
      button:disabled {
        background-color: #e9ecef;
        color: #6c757d;
        border: 2px solid #6c757d;
      }
      #back-button {
        background-color: white;
        color: #007bff;
        border: 2px solid #007bff;
      }
      #back-button:hover {
        background-color: #007bff;
        color: white;
      }
      #submit-button {
        background-color: #007bff;
        color: white;
        border: 2px solid #007bff;
      }
      #submit-button:disabled {
        background-color: #e9ecef;
        color: #6c757d;
        border: 2px solid #6c757d;
      }
      .text-center {
        text-align: center;
        margin-bottom: 96px;
      }
    </style>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">CEDE</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div class="navbar-nav">
            <a class="nav-link active" href="index.html">Home</a>
            <div class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="matrixSelectionDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Matrix Selection
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="matrixSelectionDropdown"
              >
                <li>
                  <a class="dropdown-item" href="amplitude.html"
                    >Amplitude Normalization</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#">Electrode Selection</a>
                </li>
                <li><a class="dropdown-item" href="#">Terminology</a></li>
                <li>
                  <a class="dropdown-item" href="#"
                    >High-density surface electromyograph</a
                  >
                </li>
                <li><a class="dropdown-item" href="#">Single Motor Unit</a></li>
              </ul>
            </div>
            <a class="nav-link" href="faq.html">FAQs</a>
            <a class="nav-link" href="#">Glossary</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mt-5 px-5">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="index.html">Matrix Selection</a>
          </li>
          <li class="breadcrumb-item">
            <a href="amplitude.html">Amplitude Normalization</a>
          </li>
          <li class="breadcrumb-item">
            <a href="inttool.html">Interactive Tool</a>
          </li>
          <li class="breadcrumb-item">
            <a href="collectdata.html">Collect Data</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Temporal Features
          </li>
        </ol>
      </nav>
      <h2 class="mb-4">Temporal Features</h2>
      <form id="question-form">
        <!-- Question -->
        <div class="question-container">
          <div class="question">
            <label class="label">
              Does your experiment involve the identification of period of
              activity (onset-offset) or the identification of patterns of
              activation from averaged EMG traces from muscles/groups/trials?
            </label>
            <label class="option">
              <input
                type="radio"
                name="q1"
                id="q1-1"
                value="Identification of period of activity (onset-offset)"
                onchange="selectOption(this)"
              />
              Identification of period of activity (onset-offset)
            </label>
            <label class="option">
              <input
                type="radio"
                name="q1"
                id="q1-2"
                value="Identification of patterns of activation from averaged muscles/groups/trials"
                onchange="selectOption(this)"
              />
              Identification of patterns of activation from averaged
              muscles/groups/trials
            </label>
          </div>
        </div>

        <div class="text-center mt-4">
          <button type="button" class="btn" id="back-button" onclick="goBack()">
            Back
          </button>
          <button
            type="button"
            class="btn"
            id="submit-button"
            disabled
            onclick="getRecommendation()"
          >
            Submit
          </button>
        </div>
      </form>
    </div>

    <script>
      // This function will be called when user selects an option
      function selectOption(selectedOption) {
        const submitButton = document.getElementById("submit-button");
        submitButton.disabled = false; // Enable the submit button once an option is selected
      }

      // Function to get recommendation based on user selection
      function getRecommendation() {
        const selectedOption = document.querySelector(
          'input[name="q1"]:checked'
        ).value;

        if (
          selectedOption ===
          "Identification of period of activity (onset-offset)"
        ) {
          localStorage.setItem(
            "recommendation",
            "Experimental context 5: Identification of periods of activity and inactivity using thresholds based on signal amplitude for comparison between muscles/groups (5.1 - 5.6)."
          );
        } else if (
          selectedOption ===
          "Identification of patterns of activation from averaged muscles/groups/trials"
        ) {
          localStorage.setItem(
            "recommendation",
            "Experimental context 6: Identification of pattern* of activation from averaged data for comparison between muscles/groups/trials. *Pattern could relate to timing of events (e.g. time of peak/trough/onset) or relative amplitude of events or rate of increase/decrease of EMG amplitude, etc. (6.1 - 6.6)."
          );
        }

        // Redirect to recommendation page
        window.location.href = "recommendation.html";
      }

      function goBack() {
        window.history.back(); // Function to handle back button
      }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>