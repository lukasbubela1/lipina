const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttons = document.getElementById("buttons");
const questionCard = document.getElementById("questionCard");
const formCard = document.getElementById("formCard");
const form = document.getElementById("answerForm");
const statusEl = document.getElementById("formStatus");

let noEscapes = 0;
let lastEscape = 0;

function moveNoButton() {
  const now = Date.now();
  if (now - lastEscape < 180) return;
  lastEscape = now;
  noEscapes++;

  const box = buttons.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const pad = 4;

  // On phones keep it within the button area and avoid the screen edges.
  const maxX = Math.max(0, box.width - btn.width - pad * 2);
  const maxY = Math.max(0, box.height - btn.height - pad * 2);

  const x = pad + Math.random() * maxX;
  const y = pad + Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.zIndex = "10";
}

["pointerenter", "pointerdown", "touchstart"].forEach(evt => {
  noBtn.addEventListener(evt, e => {
    if (evt !== "pointerdown" || e.pointerType !== "touch") {
      e.preventDefault();
      moveNoButton();
    }
  }, {passive:false});
});

// If somebody manages to activate it with keyboard, it still doesn't submit "No".
noBtn.addEventListener("click", e => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  questionCard.classList.add("hidden");
  formCard.classList.remove("hidden");
  formCard.scrollIntoView({behavior:"smooth", block:"center"});
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submit = form.querySelector(".submit-btn");
  const endpoint = form.getAttribute("action");

  if (endpoint.includes("YOUR_FORM_ID")) {
    statusEl.textContent = "Nejdřív nastav Formspree ID v index.html.";
    return;
  }

  submit.disabled = true;
  submit.textContent = "Odesílám…";
  statusEl.textContent = "";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: {Accept: "application/json"}
    });

    if (!response.ok) throw new Error("send failed");

    form.reset();
    statusEl.textContent = "Hotovo — odpověď byla odeslána. ✓";
    submit.textContent = "Odesláno ✓";
  } catch {
    statusEl.textContent = "Odeslání se nepovedlo. Zkus to prosím znovu.";
    submit.disabled = false;
    submit.innerHTML = 'Odeslat odpověď <span>→</span>';
  }
});
