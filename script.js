const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttons = document.getElementById("buttons");

const formBox = document.getElementById("formBox");
const answerForm = document.getElementById("answerForm");
const status = document.getElementById("status");

let lastMove = 0;


/* =========================================
   TLAČÍTKO NE – MYŠ
========================================= */

buttons.addEventListener("mousemove", (event) => {

    const rect = noButton.getBoundingClientRect();

    const distanceX = event.clientX - (rect.left + rect.width / 2);
    const distanceY = event.clientY - (rect.top + rect.height / 2);

    const distance = Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
    );

    // Jakmile se kurzor přiblíží
    if (distance < 100) {
        moveNoButton();
    }

});


/* =========================================
   TLAČÍTKO NE – MOBIL
========================================= */

noButton.addEventListener("touchstart", (event) => {

    event.preventDefault();

    moveNoButton();

}, { passive: false });


/* =========================================
   KDYBY SE HO NĚKDO POKUSIL KLIKNOUT
========================================= */

noButton.addEventListener("click", (event) => {

    event.preventDefault();

    moveNoButton();

});


/* =========================================
   POHYB TLAČÍTKA
========================================= */

function moveNoButton() {

    const now = Date.now();

    // Zabrání příliš rychlému přeskakování
    if (now - lastMove < 180) {
        return;
    }

    lastMove = now;

    const area = buttons.getBoundingClientRect();
    const button = noButton.getBoundingClientRect();

    const maxX = Math.max(
        0,
        area.width - button.width
    );

    const maxY = Math.max(
        0,
        area.height - button.height
    );

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noButton.style.position = "absolute";

    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;

}


/* =========================================
   ANO
========================================= */

yesButton.addEventListener("click", () => {

    document.querySelector(".top").style.display = "none";
    buttons.style.display = "none";

    formBox.classList.remove("hidden");

    setTimeout(() => {

        formBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 50);

});


/* =========================================
   FORMSPREE
========================================= */

answerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const submitButton =
        answerForm.querySelector(".submit");

    submitButton.disabled = true;
    submitButton.textContent = "Odesílám...";

    try {

        const response = await fetch(
            answerForm.action,
            {
                method: "POST",
                body: new FormData(answerForm),
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error();
        }

        status.textContent =
            "Odpověď byla úspěšně odeslána ✓";

        answerForm.reset();

        submitButton.textContent = "Odesláno ✓";

    } catch {

        status.textContent =
            "Něco se pokazilo. Zkus to znovu.";

        submitButton.disabled = false;
        submitButton.textContent =
            "Odeslat odpověď →";

    }

});
