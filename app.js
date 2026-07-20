// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// To change the answer: run this in your browser console to get a new hash:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('your answer'))
//     .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
//
// Current answer: "scouting"  (change ANSWER_HASH to update it)
const ANSWER_HASH = "137950e5d95a9e5187eda457ded686dee2d913dd38fef84570457a538d009641";

// Where to send the user after a correct answer
const SUCCESS_URL = "secret.html";
// ──────────────────────────────────────────────────────────────────────────────

async function sha256(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text.trim().toLowerCase())
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkAnswer(event) {
  event.preventDefault();
  const input = document.getElementById("answer-input");
  const msg = document.getElementById("message");

  const hash = await sha256(input.value);

  if (hash === ANSWER_HASH) {
    msg.textContent = "Correct! Redirecting...";
    msg.className = "message success";
    setTimeout(() => (window.location.href = SUCCESS_URL), 800);
  } else {
    msg.textContent = "Wrong answer, try again.";
    msg.className = "message error";
    input.value = "";
    input.focus();
  }
}

// Attach handler when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("answer-form");
  if (form) form.addEventListener("submit", checkAnswer);
});
