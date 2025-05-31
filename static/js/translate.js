import { elTranslations } from "../lang/el.js";
import { enTranslations } from "../lang/en.js"

const languages = {
    el: elTranslations,
    en: enTranslations
}

function setUpPage() {
    const languagesSelector = document.getElementById("languages");
    languagesSelector.addEventListener("change", (event) => {
        changeLanguage(event.target.value);
    })
    changeLanguage("en");
}

function changeLanguage(currentLanguage) {
    const elements = document.querySelectorAll('[translate]');


    elements.forEach((element) => {
        const label = element.getAttribute("translate");
        element.innerText = languages[currentLanguage][label];
    })
}


setUpPage();