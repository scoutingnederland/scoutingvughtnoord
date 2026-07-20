// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Each entry maps a SHA-256 hash of an answer to the page it unlocks.
// To add a new answer, compute its hash in the browser console:
//   crypto.subtle.digest('SHA-256', new TextEncoder().encode('your answer'))
//     .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
const ANSWERS = [
  { hash: "137950e5d95a9e5187eda457ded686dee2d913dd38fef84570457a538d009641", url: "secret.html" },
  { hash: "59b79e5deed02791a9e50feef550a8d80ef3fc105c277c8e519346abd75029ac", url: "blauw.html" },
  { hash: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d", url: "terrein.html" },
];
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

  try {
    const hash = await sha256(input.value);
    const match = ANSWERS.find((a) => a.hash === hash);

    if (match) {
      msg.textContent = "Correct! Redirecting...";
      msg.className = "message success";
      setTimeout(() => (window.location.href = match.url), 800);
    } else {
      msg.textContent = "Fout antwoord, probeer opnieuw.";
      msg.className = "message error";
      input.value = "";
      input.focus();
    }
  } catch (err) {
    // crypto.subtle only works on HTTPS or localhost, not file://
    msg.textContent = "Fout: open de site via HTTPS (GitHub Pages) of via localhost.";
    msg.className = "message error";
    console.error("Crypto error:", err);
  }
}

// Attach handler when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("answer-form");
  if (form) form.addEventListener("submit", checkAnswer);
});
