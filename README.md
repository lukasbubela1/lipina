# Lipina – sobotní pozvánka

## Soubory
- `index.html` – obsah stránky
- `style.css` – vzhled
- `script.js` – chování tlačítka a formuláře
- `images/lipina.jpg` – hlavní fotka

## Uložení odpovědí
Stránka je vhodná pro GitHub Pages, ale GitHub Pages samo o sobě neumí serverově ukládat formuláře. Použij Formspree:

1. Vytvoř si účet na Formspree.
2. Vytvoř nový form.
3. Zkopíruj jeho endpoint ve tvaru `https://formspree.io/f/xxxxx`.
4. V `index.html` nahraď `YOUR_FORM_ID` za část ID.
5. Nahraj soubory na GitHub.
6. V repozitáři otevři Settings → Pages a nastav publikování z větve `main` a složky `/ (root)`.

Odpovědi pak uvidíš v dashboardu Formspree.
