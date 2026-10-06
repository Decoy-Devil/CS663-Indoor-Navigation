(() => {
  const form = document.getElementById("quizForm");
  if (!form) return;

  const result = document.getElementById("quizResult");
  const submit = form.querySelector('[type="submit"]');
  const reveal = document.getElementById("revealAnswers");
  const explanations = [
    "Localization estimates where the user is and which direction they face.",
    "A mapped QR control point provides a known reference that can anchor the position estimate.",
    "Visual place recognition (VPR) retrieves reference images that look similar to the current camera image.",
    "Dijkstra's algorithm finds a lowest-cost route through the mapped navigation graph.",
    "The UNav study reported improvements under its tested conditions; those findings do not establish perfect navigation in every building."
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
