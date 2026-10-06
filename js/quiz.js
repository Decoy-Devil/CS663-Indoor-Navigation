(() => {
  const form = document.getElementById("quizForm");
  if (!form) return;

  const result = document.getElementById("quizResult");
  const submit = form.querySelector('[type="submit"]');
  const reveal = document.getElementById("revealAnswers");
  const explanations = [
    "Satellite positioning is unreliable inside buildings, so vision, inertial or radio sensing must estimate where the user is.",
    "Four 2D image corners paired with four surveyed 3D corners give the 2D–3D correspondences that P3P/PnP needs.",
    "PDR predicts motion step by step; whenever a QR code is seen, the Kalman update pulls the estimate back toward the accurate fix.",
    "UNav is coarse-to-fine: a global NetVLAD descriptor shortlists K candidates, and SuperGlue matches local SuperPoint features to verify them and weight the position estimate.",
    "P = Σ ωⱼPⱼ with ωⱼ proportional to the match count mⱼ; weak candidates are excluded, with fallbacks at more than 30 matches.",
    "A→C (2) + C→D (3) + D→E (2) = 7, which beats A→B→D→E = 4 + 2 + 2 = 8.",
    "Gait speed (0.75 vs 0.80 m/s, p = 0.121) showed no significant difference; seven of the other metrics improved significantly.",
    "Marker-free VPR avoids installed infrastructure, but its guidance depends on connectivity (3.62 s average round trip) and on a reference map that matches the current building."
];
  let submitted = false;
  let revealed = false;
  let scoreSummary = "";

  const questions = [...form.querySelectorAll(".question")].map((element, index) => {
    const heading = element.querySelector("p");
    heading.id = `quiz-question-${index + 1}`;
    element.setAttribute("role", "group");
    element.setAttribute("aria-labelledby", heading.id);
    const inputs = [...element.querySelectorAll("input")];
    const correct = inputs.find(input => input.value === element.dataset.answer);
    const answerText = correct.closest("label").textContent.trim();
    const feedback = document.createElement("p");
    feedback.id = `quiz-feedback-${index + 1}`;
    feedback.className = "question-feedback";
    feedback.hidden = true;
    element.append(feedback);
    inputs.forEach(input => input.setAttribute("aria-describedby", feedback.id));
    return { element, inputs, correct, answerText, feedback };
  });

  function clearFeedback() {
    questions.forEach(({ element, feedback }) => {
      element.querySelectorAll("label").forEach(label => {
        label.classList.remove("answer-correct", "answer-incorrect");
        label.querySelector(".answer-status")?.remove();
      });
      feedback.textContent = "";
      feedback.className = "question-feedback";
      feedback.hidden = true;
    });
  }

  function markAnswer(input, correct, text) {
    const label = input.closest("label");
    label.classList.add(correct ? "answer-correct" : "answer-incorrect");
    const badge = document.createElement("span");
    badge.className = "answer-status";
    badge.textContent = text;
    label.append(badge);
  }

  function showFeedback(showAnswers) {
    clearFeedback();
    questions.forEach(({ element, correct, answerText, feedback }, index) => {
      const chosen = element.querySelector("input:checked");
      const isCorrect = chosen === correct;
      feedback.hidden = false;
      if (chosen) {
        markAnswer(chosen, isCorrect, isCorrect ? "Your answer · Correct" : "Incorrect");
      }
      if (showAnswers) {
        if (!isCorrect) markAnswer(correct, true, "Correct answer");
        feedback.textContent = `${chosen ? "" : "Not answered. "}Correct answer: ${answerText}. ${explanations[index]}`;
      } else {
        feedback.textContent = chosen
          ? (isCorrect ? "Correct — your selected answer is right." : "")
          : "Not answered — select an answer, then submit again.";
        feedback.hidden = !feedback.textContent;
      }
      if (chosen) feedback.classList.add(isCorrect ? "feedback-correct" : "feedback-incorrect");
    });
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (revealed) return;
    const answered = questions.filter(({ element }) => element.querySelector("input:checked")).length;
    const score = questions.filter(({ element, correct }) => element.querySelector("input:checked") === correct).length;
    submitted = true;
    scoreSummary = `Score: ${score}/${questions.length}.`;
    showFeedback(false);
    const remaining = questions.length - answered;
    result.textContent = `${scoreSummary} ${remaining ? `${remaining} ${remaining === 1 ? "question" : "questions"} unanswered. ` : ""}${score === questions.length ? "Excellent — all answers are correct." : "See the feedback under each question. Reveal answers to see the correct choices and explanations."}`;
  });

  reveal.addEventListener("click", () => {
    if (revealed) return;
    revealed = true;
    showFeedback(true);
    questions.forEach(({ inputs }) => inputs.forEach(input => { input.disabled = true; }));
    submit.disabled = true;
    reveal.disabled = true;
    result.textContent = `${submitted ? `${scoreSummary} ` : ""}Answers revealed for study. Correct choices are green; wrong selections are red. Select Reset to try again.`;
  });

  form.addEventListener("change", event => {
    if (!event.target.matches('input[type="radio"]') || !submitted || revealed) return;
    clearFeedback();
    submitted = false;
    scoreSummary = "";
    result.textContent = "Answers changed. Select Submit to check your updated answers.";
  });

  form.addEventListener("reset", () => {
    submitted = false;
    revealed = false;
    scoreSummary = "";
    clearFeedback();
    questions.forEach(({ inputs }) => inputs.forEach(input => { input.disabled = false; }));
    submit.disabled = false;
    reveal.disabled = false;
    result.textContent = "";
  });
})();
