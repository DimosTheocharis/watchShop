import { elTranslations } from "../lang/el.js";
import { enTranslations } from "../lang/en.js"

const languages = {
    el: elTranslations,
    en: enTranslations
}

function setUpPage() {
    const languagesSelector =  document.getElementsByClassName("languages")[0];
    languagesSelector.addEventListener("change", (event) => {
        changeLanguage(event.target.value);
        localStorage.setItem("language", event.target.value);
    })
    let currentLanguage = localStorage.getItem("language");
    currentLanguage = currentLanguage ? currentLanguage : "en";
    changeLanguage(currentLanguage);
    languagesSelector.value = currentLanguage;
}

function changeLanguage(currentLanguage) {
    const elements = document.querySelectorAll('[translate]');


    elements.forEach((element) => {
        const label = element.getAttribute("translate");
        // Make sure that nested labels (such as WhyChooseUs.Header) will get translated correctly, by digging deeper 
        // into the languages[curerntLanguage] object
        const translation = label.split(".").reduce((obj, prop) => obj[prop], languages[currentLanguage]);
        
        if (element.tagName === "INPUT") {
            element.placeholder = translation;
        } else {
            element.innerText = translation; 
        }
    })
}


setUpPage();