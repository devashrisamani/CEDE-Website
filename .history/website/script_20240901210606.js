document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded");
  const recommendation = localStorage.getItem("recommendation");

  console.log("Fetched recommendation from localStorage:", recommendation);

  const methodsData = {
    "Experimental context 3: Amplitude comparison between muscles during the same task (same muscle in different participants; or different muscles in the same participant).":
      {
        high: [
          {
            title:
              "Normalization to the maximum voluntary contraction (MVC) in the same task/context as the task of interest (with matched contraction type*, muscle length/joint angle, and/or velocity) *isometric; concentric; eccentric.",
            content:
              "Normalization to the maximum voluntary contraction (MVC) provides a relative value that can be related to the maximal activation of each muscle, and therefore allows for comparison between muscles (within a person) or within a muscle (between participants). This method is valid also for between-session comparisons, as long as the MVC amplitude does not vary between sessions.",
          },
          {
            title:
              "Normalization to a standardized isometric maximum voluntary contraction (MVC) when it is not possible to match all aspects of the task of interest (e.g., multiple tasks or muscles investigated, complex task).",
            content:
              "Normalization to a standardized isometric maximum voluntary contraction (MVC) provides a relative value useful to compare the EMG amplitude of different muscles within a person or the same muscle between participants. This method is less ideal than 'normalization to the MVC in the same task/context as the task of interest' because it DOES NOT control for physiological and anatomical issues (e.g., contraction type, muscle architecture, electrode placement, etc.).",
          },
        ],
        caution: [
          {
            title: "Normalized to the maximal M-wave amplitude.",
            content:
              "Generally, normalization to the maximal M-wave amplitude is only used for normalization of evoked potentials (i.e., motor evoked potentials (MEP) or Hoffman reflex (H-reflex)).",
          },
        ],
        low: [
          {
            title:
              "Normalization to peak or mean of a standardized submaximal task (isometric/ dynamic) that has similar characteristics to the task of interest.",
            content:
              "Normalization to a standardized submaximal task should not be used to compare the amplitude of the EMG signal between muscles or participants. The contribution of each muscle to a submaximal task is unlikely to be equivalent between muscles (e.g., deltoid vs supraspinatus during shoulder abduction) or groups (e.g., deltoid muscle between healthy pain-free individuals and participants with shoulder replacement; or males vs females with different relative weights of their arms), thus the reference value for each muscle will not be standardized, and therefore, it is not possible to accurately interpret the comparison.",
          },
          {
            title:
              "Normalization to the peak or mean EMG amplitude during the task investigated.",
            content:
              "Normalization to the peak or mean EMG amplitude during the task is not a valid method to compare between muscles or participants, because differences in EMG amplitude between muscles are intentionally removed by the normalization method. It is not valid for between-session comparisons.",
          },
          {
            title: "Non-normalized EMG amplitude.",
            content:
              "Non-normalized EMG amplitude should not be used to compare the amplitude of the EMG signal between muscles or participants, because electrode and anatomical issues cannot be perfectly matched or controlled. For example, orientation relative to the muscle fibers, anatomical differences (such as the thickness of subcutaneous tissue) or muscle architectural characteristics (such as fiber types, or fiber cross-sectional area) might lead to systematic biases when comparing muscle amplitude between muscles. This method should only be considered to increase the confidence of the interpretation of another method.",
          },
        ],
      },
    // Additional contexts can be added here
  };

  if (recommendation && methodsData[recommendation]) {
    console.log("Applying normal recommendation handling.");
    document.getElementById("recommendation-text").innerText = recommendation;
    updateMethods(methodsData[recommendation].high, "high-probability-methods");
    updateMethods(methodsData[recommendation].caution, "caution-methods");
    updateMethods(methodsData[recommendation].low, "low-probability-methods");
  } else if (recommendation.includes("No")) {
    console.log("Handling for 'No' scenario.");
    document.querySelector(".header-title").style.display = "none";

    const newBox = document.createElement("div");
    newBox.classList.add("new-box");
    newBox.innerHTML = `
        <div style="border: 1px solid black; padding: 20px;">
            Because maximal voluntary contraction (MVC) is not feasible for your participant group(s) due to pain or inability to produce maximum force, we recommend using two normalisation methods that would generally result in a “No” recommendation: non-normalised EMG and standardised submaximal contraction. This approach ensures that the researcher has at least considered the congruence of outcome measures when applying two normalisation methods. If results are consistent across these methods, it would provide greater confidence that the observed differences are physiologically plausible. However, researchers should carefully consider and discuss the limitations of these methods.

            Alternatively, evaluating other outcome measures, such as patterns of activation or temporal features, may offer a more reliable solution if you are uncertain about the findings. Additionally, consider incorporating the data into a biomechanical model to address some issues with amplitude normalisation.

            The recommendations provided are based on the experimental context of Amplitude comparison between muscles during the same task (e.g., comparing the same muscle in different participants or different muscles in the same participant), sourced from the paper Besomi et al., 2020.
        </div>`;
    document.querySelector(".container.mt-5.px-5").prepend(newBox);

    const yesBox = document.querySelector(
      ".recommendation-section.high-probability"
    );
    yesBox.style.backgroundColor = "#e0e0e0";
    yesBox
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = true));
  } else {
    console.log(
      "No matching recommendation found or no methods data for recommendation."
    );
    document.getElementById("recommendation-text").innerText =
      "No recommendation found.";
  }
});

function updateMethods(methods, elementId) {
  const element = document.getElementById(elementId);
  element.innerHTML = methods
    .map(
      (method, index) => `
        <div class="accordion-item">
          <h2 class="accordion-header" id="${elementId}Heading${index}">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#${elementId}Collapse${index}"
              aria-expanded="false"
              aria-controls="${elementId}Collapse${index}"
            >
              ${method.title}
            </button>
          </h2>
          <div
            id="${elementId}Collapse${index}"
            class="accordion-collapse collapse"
            aria-labelledby="${elementId}Heading${index}"
            data-bs-parent="#${elementId}"
          >
            <div class="accordion-body">
              <ul>
                <li>${method.content}</li>
              </ul>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}
